import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "./ui/button";

interface CompleteButtonProps {
  onComplete: () => void; // Callback function to notify parent component
  quizScore: number; // The quiz score to award
}

const CompleteButton: React.FC<CompleteButtonProps> = ({
  onComplete,
  quizScore,
}) => {
  const [Btn, setBtn] = useState(false);
  const [awarded, setAwarded] = useState(false); // Tracks if points were awarded
  const [quizCompleted, setQuizCompleted] = useState(false); // Tracks if the quiz was completed
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Detect window size for confetti
  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  // Check if the points were already awarded (disable if already done)
  useEffect(() => {
    const awardedPoints = localStorage.getItem("points_awarded");
    if (awardedPoints) {
      setAwarded(true);
    }
  }, []);

  // Handle the complete action and points update
  const handleClick = async () => {
    if (!awarded) {
      setBtn(true);
      setAwarded(true);
      localStorage.setItem("points_awarded", "true"); // Save awarded state
      onComplete(); // Notify parent component that the quiz is completed

      // Call the server action to update points based on quizScore
      const response = await fetch("/api/update-quiz-points", {
        method: "POST",
        body: JSON.stringify({ score: quizScore }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        console.log("Points successfully updated!");
      }
    }
  };

  return (
    <>
      <Button
        className={`w-full ${awarded ? "bg-gray-500" : "bg-bhgreen"}`}
        onClick={handleClick}
        disabled={awarded || !quizCompleted} // Enable only if quiz is completed and points not awarded
      >
        {awarded
          ? `Umezawadiwa +${quizScore} Points `
          : `Pata +${quizScore} Points`}
      </Button>
      {Btn && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
    </>
  );
};

export default CompleteButton;
