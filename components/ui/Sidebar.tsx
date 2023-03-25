import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import { UIContext } from "@/context/ui";
import { useContext } from "react";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={closeSidebar}>
      <Box
        sx={{
          width: 300,
        }}
      >
        <Box
          sx={{
            padding: "5px 10px",
          }}
        >
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((menuItem, index) => (
            <ListItem button key={menuItem}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>

              <ListItemText primary={menuItem} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
