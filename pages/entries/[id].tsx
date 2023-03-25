import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import Layout from "@/components/layouts/Layout"
import { Entry, EntryStatusType } from "@/types"
import { Delete, SaveOutlined } from "@mui/icons-material";
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { GetServerSideProps } from "next";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { getFormatDistanceToNow } from "@/utils/dateFunctions";

const validStatus: EntryStatusType[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
    age: number;
    id: string;
}

export const EntryPage: FC<Props> = ({ entry }) => {
    const router = useRouter()
    const { updateEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatusType>(entry.status)
    const [touched, setTouched] = useState(false)
    const error = useMemo(() => !inputValue.length && touched, [inputValue, touched])

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatusType)
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }

        updateEntry(updatedEntry, true)

        router.push('/')
    }

    return (

        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={8} md={6}>

                    <Card>
                        <IconButton sx={{
                            position: 'absolute',
                            alignItems: 'center',
                            bottom: 30,
                            right: 30,
                            backgroundColor: 'error.dark',
                        }}>
                            <Delete />
                        </IconButton>

                        <CardHeader title={`Entrada: ${inputValue}`} subheader={`Creada hace: ${getFormatDistanceToNow(entry.createdAt)}`} >
                        </CardHeader>
                        <CardContent>
                            <TextField
                                sx={{ mt: 2, mb: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                onFocus={() => setTouched(false)}
                                onBlur={() => setTouched(true)}
                                error={error}
                                helperText={error && 'Ingrese un valor'}
                            />

                            <FormControl>
                                <FormLabel>
                                    Status:
                                </FormLabel>

                                <RadioGroup row value={status} onChange={onStatusChange}>
                                    {validStatus.map(option => (
                                        <FormControlLabel
                                            label={capitalize(option)}
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                onClick={onSave}
                                startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                disabled={error}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>


        </Layout>

    )
}






export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };
    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }



    return {
        props: {
            id,
            entry,
        }
    }
}








export default EntryPage