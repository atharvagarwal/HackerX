import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // Your MongoDB connection logic
import Hackathon from "@/lib/schema/hackathon"; // Your Hackathon model
import Auth from "@/lib/schema/auth"; // Your Auth model for user validation
import ServerSession from "@/lib/serversession";

const normalizeToMidnight = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// PATCH request to add a participant to a hackathon
export const PATCH = async (req: Request) => {
  try {
    // Parse the JSON data from the request body
    const body = await req.json();
    const { hackathonId, participantId } = body;

    // Ensure user is logged in
    const session = await ServerSession();
    const loggedInUser = session?.user?.email;

    if (!loggedInUser) {
      return NextResponse.json({ error: "USER NOT LOGGED IN" }, { status: 400 });
    }

    // Check if the provided email matches the logged-in user
    const user = await Auth.findOne({ _id:participantId});
    if (!user) {
      return NextResponse.json({ error: "ENTER EMAIL OF REGISTERED USER" }, { status: 400 });
    }

    if (loggedInUser !== user.email) {
      return NextResponse.json({ error: "USE EMAIL OF A CORRECT USER" }, { status: 400 });
    }

    // Validate required fields
    if (!hackathonId || !participantId) {
      return NextResponse.json({ error: "Hackathon ID and Participant ID are required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find the hackathon by its ID
    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      return NextResponse.json({ error: "Hackathon not found" }, { status: 404 });
    }

    const currentDate = new Date();
    const hackathonDate = new Date(hackathon.date); // Assuming hackathon has a `date` field

    const normalizedCurrentDate = normalizeToMidnight(currentDate);
    const normalizedHackathonDate = normalizeToMidnight(hackathonDate);

    if (normalizedCurrentDate > normalizedHackathonDate) {
      return NextResponse.json({ error: "Application date has passed" }, { status: 400 });
    }

    // Add the participantId to the participantIds array, ensuring no duplicates
    if (hackathon.participantIds.includes(participantId)) {
      return NextResponse.json({ error: "Participant already registered" }, { status: 400 });
    }

    hackathon.participantIds.push(participantId);
    await hackathon.save();

    return NextResponse.json({ success: true, hackathon }, { status: 200 });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};


export const GET = async (req: Request) => {
    try {

      // Ensure participantId is provided
      // Ensure the user is logged in
      const session = await ServerSession();
      const loggedInUser = session?.user?.email;
      // @ts-ignore
      const participantId = session?.user?.id;
      if (!loggedInUser) {
        return NextResponse.json({ error: "USER NOT LOGGED IN" }, { status: 400 });
      }
  
      // Connect to the database
      await connectDB();
  
      // Fetch hackathons where the participant is in the participantIds array
      const hackathons = await Hackathon.find({
        participantIds: { $in: [participantId] },
      });
  
      return NextResponse.json({ success: true, hackathons }, { status: 200 });
    } catch (error) {
      console.error("Error fetching hackathons for participant:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };