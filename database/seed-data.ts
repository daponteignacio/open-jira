import { Description } from "@mui/icons-material";

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: string;
}

export const seedData = {
  entries: [
    {
      description: "Pendiente: Esse Lorem culpa Lorem non excepteur.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En proceso: Do irure sunt quis anim nostrud do et minim labore dolor anim non.",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      description:
        "Terminda: Mollit nulla adipisicing sint sint amet deserunt sit Lorem nulla mollit exercitation.",
      status: "finished",
      createdAt: Date.now() - 150000,
    },
  ],
};
