"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Create Amazing and Unique Projects
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
           Register with your friends and create projects that can scale across the globe.
          </p>
        </div>
        <Image
          src="https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_114579-2817.jpg?t=st=1734256429~exp=1734260029~hmac=2a0bd64597adf2cb0a62472431a6db37690b6a1e2c92a2136cc92c5a1e54d47d&w=1060"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No Shortcuts , Only Hardwork
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, tell them that you're busy in a grind to create the best of its kind product
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Make a Change
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Boost the tech innovation and growth through amazing ideas and cutting edge technologies.
          </p>
        </div>
        <Image
          src="https://img.freepik.com/free-photo/architecture-plan-blueprint-layout-work-concept_53876-124259.jpg?t=st=1734256564~exp=1734260164~hmac=d90fd82b314a814b98b6ca2367ce34cee7bf867f371ec9b903d791dfff17e5fb&w=996"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
