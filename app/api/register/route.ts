import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/db"; // Your MongoDB connection logic
import Hackathon from "@/lib/schema/hackathon"; // Your Hackathon model
import Auth from "@/lib/schema/auth";
import ServerSession from "@/lib/serversession";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    // Parse JSON data from the request body
    const body = await req.json();
    const { date, venue, title, prizePool, description, organizerEmail, image } = body;
    const user: any = await Auth.findOne({ email: organizerEmail });
    const session=await ServerSession();
    const loggedInUser=session?.user?.email;
    if(!loggedInUser){
        return NextResponse.json({ error: "USER NOT LOGGED IN" }, { status: 400 });
    }
    if(!user){
        return NextResponse.json({ error: "ENTER EMAIL OF REGISTERED USER" }, { status: 400 });
    }
    if(loggedInUser!==user.email){
        return NextResponse.json({ error: "USE EMAIL OF A CORRECT USER" }, { status: 400 });
    }
    // Validate required fields
    if (!date || !venue || !title || !prizePool || !description || !organizerEmail || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "hackathons",
    });

    const imageUrl = uploadResponse.secure_url;

    // Connect to the database
    await connectDB();

    // Save hackathon details in MongoDB
    const hackathon = new Hackathon({
      date: new Date(date),
      venue,
      title,
      prizePool: parseFloat(prizePool),
      description,
      organizerEmail,
      participantIds: [], // Default to an empty array if not provided
      image: imageUrl,
    });

    await hackathon.save();

    return NextResponse.json({ success: true, hackathon }, { status: 201 });
  } catch (error) {
    console.error("Error creating hackathon:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};


export const GET = async (req: Request) => {
    try {
      // Connect to the database
      await connectDB();
  
      // Fetch all hackathons from the database
      const hackathons = await Hackathon.find();
  
      // Return the list of hackathons
      return NextResponse.json({ success: true, hackathons }, { status: 200 });
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };