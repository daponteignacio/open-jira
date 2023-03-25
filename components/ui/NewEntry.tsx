import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import { Add, AddCircleRounded, Cancel, Save } from "@mui/icons-material";
import { Box, Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAdding } = useContext(UIContext);

  const [form, setForm] = useState("");
  const [touched, setTouched] = useState(false);

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(event.target.value);
  };

  const onSave = () => {
    if (!form.length) return;

    addNewEntry(form);

    setIsAddingEntry(true);

    setIsAddingEntry(false);
    setForm("");
    setTouched(false);
  };

  return (
    <Box sx={{ margin: 2, paddingX: 1 }}>
      {isAdding ? (
        <Card
          elevation={5}
          sx={{
            padding: 2,
            margin: 1,
          }}
        >
          <TextField
            fullWidth
            sx={{ marignTop: 2, margintBottom: 1 }}
            placeholder="Ingresa una tarea"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={form.length <= 0 && touched && "Ingrese un valor"}
            error={form.length <= 0 && touched}
            value={form}
            onChange={onFormChange}
            onBlur={() => setTouched(true)}
          />

          <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<Save />}
              onClick={onSave}
              disabled={form.length <= 0}
            >
              Guardar
            </Button>

            <Button
              variant="outlined"
              color="error"
              endIcon={<Cancel />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Card>
      ) : (
        <Button
          variant={isAdding ? "outlined" : "contained"}
          color="primary"
          endIcon={<AddCircleRounded />}
          fullWidth
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar
        </Button>
      )}
    </Box>
  );
};
