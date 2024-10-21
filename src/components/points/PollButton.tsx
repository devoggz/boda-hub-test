"use client";

import { Button } from "@/components/ui/button";
import { updatePoll } from "../../../actions/updatePoll"; // Adjust the path as necessary
import { toast } from "@/hooks/use-toast";

interface PointsButtonProps {
  onPointsAwarded: () => void; // Callback to handle when points are awarded
  disabled: boolean; // Disable button prop
  isPending: boolean; // Loading state prop
}

const PollButton: React.FC<PointsButtonProps> = ({
  onPointsAwarded,
  disabled,
  isPending,
}) => {
  const handleAwardPoints = async () => {
    const response = await updatePoll(); // Ensure this function correctly awards points

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
      {disabled ? "Asante kwa maoni yako!" : "Nyakua Points Zako"}
    </Button>
  );
};

export default PollButton;
