import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Not valid ID",
    });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    default:
      break;
  }
}

export const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: "Entry not found",
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();

    if (!entry) {
      return res.status(400).json({
        message: "Entry not found",
      });
    }

    res.status(200).json(entry);
  } catch (error) {
    await db.disconnect();
    res.status(500).json({
      message: "Server error",
    });
  }
};
