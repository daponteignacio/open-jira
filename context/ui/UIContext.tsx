import { createContext } from "react";

export interface ContextProps {
  sidebarOpen: boolean | undefined;
  openSidebar: () => void;
  closeSidebar: () => void;

  setIsAddingEntry: (adding: boolean) => void;
  isAdding: boolean;

  startDragging: () => void;
  stopDragging: () => void;
  isDragging: boolean;
}

export const UIContext = createContext({} as ContextProps);
