import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // MongoDB connection logic
import Hackathon from "@/lib/schema/hackathon"; // Hackathon model
import Auth from "@/lib/schema/auth"; // Auth model to get user emails
import ServerSession from "@/lib/serversession";

export const GET = async (req: Request) => {
  try {
    // Ensure the user is logged in
    const session = await ServerSession();
    const loggedInUser = session?.user?.email;
    
    if (!loggedInUser) {
      return NextResponse.json({ error: "USER NOT LOGGED IN" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Fetch hackathons created by the logged-in user
    const hackathons = await Hackathon.find({ organizerEmail: loggedInUser });

    if (hackathons.length === 0) {
      return NextResponse.json({ error: "No hackathons found for this organizer" }, { status: 404 });
    }

    // Fetch participant emails for each hackathon
    const hackathonsWithEmails = await Promise.all(hackathons.map(async (hackathon) => {
      // Get all participant IDs for the current hackathon
      const participantIds = hackathon.participantIds;

      // Fetch emails for the participants
      const participants = await Auth.find({ _id: { $in: participantIds } });

      // Map participant IDs to their emails
      const participantEmails = participants.map((participant) => participant.email);

      return {
        ...hackathon.toObject(),
        participantEmails, // Add the emails to the hackathon object
      };
    }));

    return NextResponse.json({ success: true, hackathons: hackathonsWithEmails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hackathons for organizer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
