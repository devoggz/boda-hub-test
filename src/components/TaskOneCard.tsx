"use client";

import { useState, useEffect } from "react";
import { Chip } from "@nextui-org/react";
import { CheckCheckIcon, Tv } from "lucide-react";
import dynamic from "next/dynamic";
import PointsButton from "./points/FivePointButton";
import { useCurrentUser } from "@/hooks/use-current-user";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface TaskOneCardProps {
  videoURL: string;
  thumbnailURL: string;
  completed: boolean;
  taskId: string; // Only taskId needed now as we get userId from the session
}

const TaskOneCard: React.FC<TaskOneCardProps> = ({
  videoURL,
  thumbnailURL,
  completed,
  taskId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isPointsAwarded, setIsPointsAwarded] = useState(completed);
  const [chipMessage, setChipMessage] = useState(
    completed ? "Task Completed" : "Watch video to score 5 points"
  );

  // Use the session hook to get the current user
  const user = useCurrentUser();

  const handleVideoStart = () => {
    setIsPlaying(true); // Disable button when the video starts playing
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsVideoCompleted(true); // Enable button once the video finishes
  };

  const handlePointsAwarded = () => {
    setIsPointsAwarded(true); // Update state to reflect points have been awarded
    setChipMessage("Umemaliza Shughuli"); // Update chip message
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-28 bg-blend-soft-light bg-emerald-50 backdrop-blur shadow-sm">
      {/* <Chip
        className="bg-emerald-50 px-2 text-emerald-800"
        size="sm"
        radius="sm"
        startContent={
          <Tv className="text-2xl text-emerald-600 h-4 w-4 mr-2 pointer-events-none flex-shrink-0" />
        }
      >
        {chipMessage}
      </Chip> */}
      <div className="leading-0">
        <div className="aspect-square">
          <ReactPlayer
            url={videoURL}
            className="react-player"
            width="100%"
            height="100%"
            controls
            onStart={handleVideoStart}
            onEnded={handleVideoEnd}
            onError={(e) => console.error("Error playing video: ", e)}
          />
        </div>

        <div className="w-full">
          <PointsButton
            onPointsAwarded={handlePointsAwarded}
            disabled={isPointsAwarded || !isVideoCompleted || !user} // Disable if points awarded or video not completed or no user
            isPending={isPlaying} // Manage loading state based on video playing
          />
        </div>
      </div>
    </div>
  );
};

export default TaskOneCard;
