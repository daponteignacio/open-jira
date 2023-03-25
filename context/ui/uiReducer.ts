import { UIState } from "./UIProvider";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Adding Entry"; payload: boolean }
  | { type: "UI - Start Dragging" }
  | { type: "UI - Stop Dragging" };

interface action {
  type: UIActionType;
  payload: any;
}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sidebarOpen: true,
      };

    case "UI - Close Sidebar":
      return {
        ...state,
        sidebarOpen: false,
      };

    case "UI - Adding Entry":
      return {
        ...state,
        isAdding: action.payload,
      };
    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - Stop Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
