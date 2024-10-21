"use client";

// /components/VideoCard.tsx
import React from "react";
import { Chip } from "@nextui-org/react";
import { RiTv2Line } from "react-icons/ri";

interface PostCardProps {
  title: string;
  videoURL: string;
  thumbnailURL: string;
  category: string;
}
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function ContentCard({
  title,
  videoURL,
  thumbnailURL,
  category,
}: PostCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-28 bg-blend-soft-light bg-white backdrop-blur shadow-sm">
      <div className="leading-0">
        <div className=" aspect-square ">
          <ReactPlayer
            url={videoURL}
            className="react-player"
            light={thumbnailURL}
            width="100%"
            height="100%"
            controls={true}
            playing={false}
            loop={false}
            onError={(e) => console.error("Error playing video: ", e)}
          />
        </div>
      </div>
    </div>
  );
}
