import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      getEntries(res);
      break;

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(200).json({ message: "No existe" });
  }
}

export const postEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { description = "" } = req.body;

  const newEnty = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();

    const entry = await newEnty.save();

    await db.disconnect();

    return res.status(201).json(entry!);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({
      message: "Hubo un error al crear la entrada",
    });
  }

  res.status(200).json({
    message: "todo ok",
  });
};

export const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  console.log("getting entries");

  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();

  res.status(200).json(entries);
};
