// components/Challenge.tsx
import { Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import PollButton from "./points/PollButton";
import { updatePoll } from "../../actions/updatePoll";

interface ChallengeProps {
  question: string;
  onSubmitAnswer: (points: number) => void;
}

const Challenge: React.FC<ChallengeProps> = ({ question, onSubmitAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false); // Loading state for PollButton

  const handleAwardPoints = async () => {
    setIsPending(true);
    const response = await updatePoll(); // Make sure this action handles awarding 1 point

    if (response.success) {
      toast.success("You've been awarded 1 point!");
      onSubmitAnswer(1);
    } else {
      toast.error(response.error);
    }

    setIsPending(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitted && answer.trim() !== "") {
      setSubmitted(true);
      handleAwardPoints();
      setAnswer("");
    } else {
      toast.error("Please provide an answer.");
    }
  };

  return (
    <div className="challenge space-y-4">
      <h2 className="mt-4 mb-12 text-slate-600 font-bold text-xl">
        {question}
      </h2>
      <form onSubmit={handleSubmit}>
        <Textarea
          size="lg"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted}
          placeholder="Andika maoni yako..."
        />

        <PollButton
          onPointsAwarded={() => setSubmitted(true)} // Call this when points are awarded
          disabled={submitted || isPending} // Disable if submitted or points are being awarded
          isPending={isPending} // Pass the loading state
        />
      </form>
    </div>
  );
};

export default Challenge;
