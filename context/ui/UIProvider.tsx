import { FC, ReactNode, useReducer } from "react";
import { UIContext } from "./UIContext";
import { uiReducer } from "./uiReducer";

export interface UIState {
  sidebarOpen: boolean | undefined;
  isAdding: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isAdding: false,
  isDragging: false,
};

interface Props {
  children: ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidebar = () => {
    dispatch({
      type: "UI - Open Sidebar",
    });
  };

  const closeSidebar = () => {
    dispatch({
      type: "UI - Close Sidebar",
    });
  };

  const setIsAddingEntry = (adding: boolean) => {
    dispatch({
      type: "UI - Adding Entry",
      payload: adding,
    });
  };

  const startDragging = () => {
    console.log("startDragging");

    dispatch({
      type: "UI - Start Dragging",
    });
  };

  const stopDragging = () => {
    console.log("stopDragign");

    dispatch({
      type: "UI - Stop Dragging",
    });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        openSidebar,
        closeSidebar,

        setIsAddingEntry,

        startDragging,
        stopDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
