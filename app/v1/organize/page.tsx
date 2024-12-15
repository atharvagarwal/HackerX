"use client";

import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { WobbleCardDemo } from "@/components/ui/Wobble";
import { navItems } from "@/lib/navItems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const HackathonForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    venue: "",
    title: "",
    prizePool: "",
    description: "",
    organizerEmail: "",
    image: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Flag to check if it's client-side

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      toast("NOT LOGGED IN")
      router.push("/");
    }
  }, []);

  // Set isClient to true after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    toggleModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast("Hackathon created successfully!");
        setFormData({
          date: "",
          venue: "",
          title: "",
          prizePool: "",
          description: "",
          organizerEmail: "",
          image: "",
        });
        setImagePreview(null);
      } else {
        toast(`Error`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred.");
    }
  };

  if (!isClient) {
    return null; // Prevent SSR hydration issues by returning null until the client-side code is ready
  }

  return (
    <div>
      <FloatingNav navItems={navItems}></FloatingNav>
      <div className="min-h-screen bg-gray-900 flex justify-center items-start lg:space-around m-12">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 mt-12 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-white text-center">
            Create Hackathon
          </h1>
          <label className="block mb-2 text-sm font-medium text-white">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Venue"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Hackathon Title"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Prize Money
          </label>
          <input
            type="number"
            name="prizePool"
            value={formData.prizePool}
            onChange={handleChange}
            placeholder="Prize Money"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Hackathon Description"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            rows={4}
            required
          ></textarea>

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Organizer Email
          </label>
          <input
            type="text"
            name="organizerEmail"
            value={formData.organizerEmail}
            onChange={handleChange}
            placeholder="Organizer Email"
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-white">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          {imagePreview && showModal && (
            <div className="flex-col fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
              <img
                src={imagePreview}
                alt="Preview in Modal"
                className="w-auto h-1/2"
              />
              <button
                className="p-1 bg-white rounded-md mt-2"
                onClick={toggleModal}
              >
                <p>close</p>
              </button>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit
          </button>
        </form>

        <div className="ml-8 mt-8 hidden lg:block">
          <WobbleCardDemo />
        </div>
      </div>
    </div>
  );
};

export default HackathonForm;
