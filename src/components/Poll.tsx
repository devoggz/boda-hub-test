"use client";

// components/Poll.tsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import PollButton from "./points/PollButton";

interface PollProps {
  question: string;
  onVote: (points: number) => void;
}

const Poll: React.FC<PollProps> = ({ question, onVote }) => {
  const { data: session } = useSession(); // Get user session
  const [voted, setVoted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Check if the user has already voted by accessing local storage or session data
  useEffect(() => {
    if (session) {
      const hasVoted = localStorage.getItem(
        `poll_voted_${session.user?.username}`
      );
      if (hasVoted) {
        setVoted(true); // User has voted
      }
    }
  }, [session]);

  const handleVote = (answer: "yes" | "no") => {
    if (!voted && session) {
      setVoted(true);
      localStorage.setItem(`poll_voted_${session.user?.username}`, "true");
      onVote(1); // Pass 1 point for a vote
      toast.success(`You voted ${answer}. You've been awarded 1 point!`);
    } else {
      toast.error("You have already voted!");
    }
  };

  return (
    <div className="poll space-y-6 rounded-lg bg-white border p-4">
      <h2 className="mt-4 mb-12 text-slate-600 font-bold text-2xl">
        {question}
      </h2>
      <div className="flex flex-row gap-4 items-center justify-between">
        {voted ? (
          <PollButton
            disabled={true}
            isPending={isPending}
            onPointsAwarded={() => {}}
          />
        ) : (
          <>
            <Button
              className="w-full bg-green-500"
              onClick={() => {
                handleVote("yes");
                setIsPending(true);
              }}
            >
              Ndio
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                handleVote("no");
                setIsPending(true);
              }}
            >
              La
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Poll;
