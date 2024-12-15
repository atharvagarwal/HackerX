import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { connectDB } from "./db";
import Auth from "./schema/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB(); // Connect to the database

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Email validation: ensure it ends with .in, .com, or .org
        const emailRegex = /^[^\s@]+@[^\s@]+\.(in|com|org)$/i;
        if (!emailRegex.test(credentials.email)) {
          throw new Error(
            "Invalid email format. Email must end with .in, .com, or .org."
          );
        }

        // Password validation: minimum 8 characters
        if (credentials.password.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }

        // Check if the user exists
        const user: any = await Auth.findOne({ email: credentials.email });

        if (!user) {
          // Hash the password and create a new user
          const salt = genSaltSync(10);
          const hashedPassword = hashSync(credentials.password, salt);
          const newUser = await Auth.create({
            email: credentials.email,
            password: hashedPassword,
          });

          return {
            // @ts-ignore
            id: newUser._id.toString(),
            email: newUser.email,
          };
        }

        // Compare passwords
        const isPasswordValid = await compareSync(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return user info if authorized
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
