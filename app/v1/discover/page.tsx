"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsizedClick";
import { useApply } from "@/hooks/useApply";
import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/lib/navItems";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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

export default function ExpandableCardDemo() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      toast("NOT LOGGED IN");
      router.push("/");
    }
  }, []);
  const [active, setActive] = useState<Hackathon | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Escape key handler and body scroll locking
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto"; // Ensure cleanup
    };
  }, [active]);

  // @ts-ignore
  useOutsideClick(ref, () => setActive(null));

  // Fetching hackathons
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("/api/register");
        if (!response.ok) {
          throw new Error("Failed to fetch hackathons");
        }
        const data = await response.json();
        if (data.success) {
          setHackathons(data.hackathons);
        } else {
          setError(data.error || "Unknown error");
        }
      } catch (err) {
        setError("Error fetching hackathons");
        toast("ERROR");
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
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <h1 className="text-3xl text-center text-white font-bold mt-24 mb-8">
        EXPLORE HACKATHONS 💻
      </h1>
      <AnimatePresence>
        {active && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-75 z-10"
            />
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.div
                id={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gray-800 sm:rounded-3xl overflow-hidden"
              >
                <Image
                  id={`image-${active.title}-${id}`}
                  priority
                  src={active.image}
                  alt={active.title}
                  width={500}
                  height={200}
                  className="w-full h-80 object-cover"
                />
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <h3 className="font-medium text-neutral-200 text-lg">
                    {active.title}
                  </h3>
                  <p className="text-neutral-300 my-2">{active.description}</p>
                  <div className="text-neutral-300">
                    <p>Prize Pool: ${active.prizePool}</p>
                    <p>Date: {new Date(active.date).toLocaleDateString()}</p>
                    <p>Venue: {active.venue}</p>
                    <p>Organizer Email: {active.organizerEmail}</p>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <button
                    onClick={() => {
                      // @ts-ignore
                      useApply(active._id, session?.user?.id);
                    }}
                    className="flex-1 px-4 py-2 text-sm rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setActive(null)}
                    className="flex-1 px-4 py-2 text-sm rounded bg-purple-400 text-white hover:bg-purple-500"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-8xl mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hackathons.map((hackathon) => (
          <motion.li
            key={hackathon._id}
            id={`card-${hackathon.title}-${id}`}
            onClick={() => setActive(hackathon)}
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 p-4 rounded-lg"
          >
            <Image
              id={`image-${hackathon.title}-${id}`}
              src={hackathon.image}
              alt={hackathon.title}
              width={500}
              height={300}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="font-medium text-neutral-200 mt-2">
              {hackathon.title}
            </h3>
            <div className="flex space-between gap-2 pt-2">
              <p className="text-white">
                📅{new Date(hackathon.date).toLocaleDateString()}
              </p>
              <p className="text-white">🚂{hackathon.venue}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
