"use client";

import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/lib/navItems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

interface Hackathon {
  _id: string; // Unique identifier for the hackathon
  date: string; // Date of the hackathon in ISO string format
  venue: string; // Venue of the event
  title: string; // Title of the hackathon
  prizePool: number; // Prize pool amount
  image: string; // URL of the image representing the hackathon
  description: string; // Description of the hackathon event
  organizerEmail: string; // Email of the organizer
  participantIds: string[]; // Array of participant IDs (empty array if no participants)
  participantEmails: string[]; // Array of participant emails (added from the backend)
  createdAt: string; // Date when the hackathon was created (ISO string)
  updatedAt: string; // Date when the hackathon was last updated (ISO string)
}

const Dashboard: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      toast("NOT LOGGED IN");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchHackathons = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch
      try {
        const response = await fetch(`/api/manage`);
        const data = await response.json();
        if (data.success) {
          setHackathons(data.hackathons);
        } else {
          toast("No hackathons found");
        }
      } catch (error) {
        toast("No hackathons found");
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchHackathons();
  }, []);

  const handleCardClick = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const closeModal = () => {
    setSelectedHackathon(null);
  };
  if (hackathons.length === 0) {
    return (
      <div>
        <FloatingNav navItems={navItems} />
        <div className="flex items-center justify-center mt-24">
          <h1 className="text-xl text-red-600 font-medium">
            NO HACKATHONS ORGANIZED
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <div className="p-5 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-white py-6">
          Your Hackathons
        </h1>

        {/* Show loading indicator while fetching hackathons */}
        {isLoading ? (
          <div className="flex items-center justify-center pt-48">
            <ClipLoader
              color="#fff"
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon._id}
                className="bg-gray-800 border rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
                onClick={() => handleCardClick(hackathon)}
              >
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-[100%] h-80 mx-auto object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white px-2 py-2">
                  {hackathon.title}
                </h3>
                <div className="flex space-around gap-10 px-2 pb-2 ">
                  <p className="text-white">
                    {" "}
                    📅 {new Date(hackathon.date).toLocaleDateString()}
                  </p>
                  <p className="text-white">🚂 {hackathon.venue}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for selected hackathon */}
        {selectedHackathon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
              <h2 className="text-2xl font-bold mb-4">
                {selectedHackathon.title}
              </h2>
              <p className="mb-4">
                <strong>Organizer Email:</strong>{" "}
                {selectedHackathon.organizerEmail}
              </p>
              <h3 className="text-lg font-semibold mb-2">Registered Users:</h3>

              {/* Scrollable container for participants */}
              <div className="overflow-y-auto max-h-60">
                <ul className="list-disc pl-6 mb-4">
                  {selectedHackathon.participantEmails.length === 0 ? (
                    <li>No participants registered yet</li>
                  ) : (
                    selectedHackathon.participantEmails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))
                  )}
                </ul>
              </div>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
