"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePoints } from "../../../actions/updatePoints"; // Adjust the path as necessary
import { toast } from "@/hooks/use-toast"; // Assuming you have a toast notification setup

interface PointsButtonProps {
  onPointsAwarded: () => void; // Callback to handle when points are awarded
  disabled: boolean; // Disable button prop
  isPending: boolean; // Loading state prop
}

const PointsButton: React.FC<PointsButtonProps> = ({
  onPointsAwarded,
  disabled,
  isPending,
}) => {
  const handleAwardPoints = async () => {
    const response = await updatePoints();

    if (response.success) {
      toast({ title: response.success, variant: "default" });
      onPointsAwarded(); // Notify the parent component to update state
    } else {
      toast({ title: response.error, variant: "destructive" });
    }
  };

  return (
    <Button
      onClick={handleAwardPoints}
      disabled={disabled || isPending} // Disable the button if it's pending or passed as disabled
      className="rounded-none bg-bhpink w-full"
    >
      {disabled ? "Tazama hadi mwisho upate 5 points" : "Nyakua Points Zako"}
    </Button>
  );
};

export default PointsButton;
