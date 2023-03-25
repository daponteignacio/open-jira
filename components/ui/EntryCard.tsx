import { FC, DragEvent, useContext } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Entry } from "@/types";
import { UIContext } from "@/context/ui";
import { getFormatDistanceToNow } from "@/utils/dateFunctions";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter()
  const { startDragging, stopDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => stopDragging();
  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        marginBottom: 1,
      }}
    >
      <CardActionArea draggable onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <CardContent>
          <Typography
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">{getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
