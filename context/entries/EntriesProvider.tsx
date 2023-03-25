import { Entry } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "@/apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    console.log(data);

    dispatch({
      type: "[Entries] - Add",
      payload: data,
    });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSb = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({
        type: "[Entries] - Update",
        payload: data,
      });

      showSb && enqueueSnackbar('Guardado correctamente', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      })
    } catch (error) { }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({
      type: "[Entries] - Loading Entries",
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
