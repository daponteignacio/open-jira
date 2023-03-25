import { Entry } from "@/types";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (payload: Entry, showSb?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
