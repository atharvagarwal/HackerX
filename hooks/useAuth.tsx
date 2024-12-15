  import { signIn } from "next-auth/react";

  const usehandleSignIn = async (e: React.FormEvent,email:string,password:string)=>{
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        alert("Invalid email or password");
      } else {
        console.log("Signed in successfully:", result);
      }
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
      alert("An error occurred during sign-in");
    }
  };

export default usehandleSignIn