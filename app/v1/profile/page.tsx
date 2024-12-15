"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/lib/navItems";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface Hackathon {
  _id: string;
  date: string;
  venue: string;
  title: string;
  prizePool: number;
  image: string;
  description: string;
  organizerEmail: string;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
}

export default function HackathonList() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (!session) {
      toast("NOT LOGGED IN");
      router.push("/");
    }
  }, []);
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("/api/apply");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (data.success) {
          setHackathons(data.hackathons);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Error fetching hackathons");
        toast("Error fetching:");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) {
    return (
      <div className=" mt-48 flex items-center justify-center">
        <ClipLoader
          color="#fff"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (hackathons.length === 0) {
    return (
      
      <div className="flex items-center justify-center mt-24">
        <button
          className="p-2 bg-purple-300 absolute top-2 right-5 rounded-md"
          onClick={() => {
            signOut({ callbackUrl: '/' })
          }}
        >
          <p>Logout</p>
        </button>
        <FloatingNav navItems={navItems} />
        <h1 className="text-xl text-red-600 font-medium">
          NO HACKATHONS REGISTERED
        </h1>
      </div>
    );
  }

  if (error) {
    toast("Error");
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <FloatingNav navItems={navItems}></FloatingNav>
      <button
        className="p-2 bg-purple-500"
        onClick={() => {
          signOut({ callbackUrl: '/' })
        }}
      >
        <p className="text-white">Logout</p>
      </button>
      <h1 className="text-3xl font-bold text-gray-100 mb-8 mt-8 text-center">
        Registered Events
      </h1>
      <div className="grid gap-6">
        {hackathons.map((hackathon) => {
          const isClosed =
            new Date(hackathon.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0);
          console.log(isClosed);
          return (
            <div
              key={hackathon._id}
              className="flex flex-row items-center bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-6 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex-shrink-0 mr-6">
                <Image
                  src={hackathon.image}
                  alt={hackathon.title}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {hackathon.title}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  Registered on:{" "}
                  {new Date(hackathon.createdAt).toLocaleString()} |{" "}
                  <strong>By:</strong> {hackathon.organizerEmail}
                </p>
                <p className="text-sm text-gray-400">
                  Venue: {hackathon.venue}
                </p>
              </div>
              <div className="ml-6">
                {isClosed ? (
                  <span className="bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded-full">
                    Closed
                  </span>
                ) : (
                  <span className="bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded-full">
                    Ongoing
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
