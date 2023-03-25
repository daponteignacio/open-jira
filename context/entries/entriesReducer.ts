import { Entry } from "@/types";
import { EntriesState } from "./";

type entriesActionType =
  | { type: "[Entries] - Add"; payload: Entry }
  | { type: "[Entries] - Update"; payload: Entry }
  | { type: "[Entries] - Loading Entries"; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: entriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entries] - Add":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entries] - Update":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        }),
      };

    case "[Entries] - Loading Entries":
      return {
        ...state,
        entries: action.payload,
      };

    default:
      return state;
  }
};
