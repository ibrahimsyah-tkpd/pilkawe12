import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

type Response = {
  DB: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
 
  try {
    await db.raw("select 1");
    res.status(200).json("All system and dependencies run well.");
  } catch{
    res.status(500).json("The system is unhealthy.");

  }

}
