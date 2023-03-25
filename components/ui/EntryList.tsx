import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import { Entry, EntryStatusType } from "@/types";
import { List, Paper } from "@mui/material";
import { FC, useContext, useMemo, DragEvent } from "react";
import { EntryCard } from "./EntryCard";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatusType;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, stopDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent) => event.preventDefault();

  const onDrop = (event: DragEvent) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;

    updateEntry(entry);
    stopDragging();
  };

  return (
    <div
      onDragOver={allowDrop}
      onDrop={onDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          minHeight: "300px",
          height: "calc(100vh -250px)",
          overflow: "auto",
          scrollbarColor: "red",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.5 : 1 }}>
          {entriesByStatus.map((entry, index) => (
            <EntryCard key={index} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
