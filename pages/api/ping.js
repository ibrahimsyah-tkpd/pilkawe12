import db from "../../lib/db";

export default async function handler(_, res) {
  try {
    await db.raw("select 1");
    res.status(200).json("All system and dependencies run well.");
  } catch{
    res.status(500).json("The system is unhealthy.");

  }

}
