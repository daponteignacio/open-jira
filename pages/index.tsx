import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "@/components/layouts/Layout";
import { EntryList, NewEntry } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title="Home">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} height={100}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} height={100}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En proceso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} height={100}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Terminadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
