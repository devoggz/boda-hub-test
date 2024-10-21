import { NextApiRequest, NextApiResponse } from "next";
import { updateQuiz } from "../../../actions/updateQuiz";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { score } = req.body;

    if (typeof score !== "number") {
      return res.status(400).json({ error: "Invalid score" });
    }

    try {
      const result = await updateQuiz(score);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update points" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
