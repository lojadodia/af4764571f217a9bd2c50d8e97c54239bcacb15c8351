import { loggedIn } from "@utils/is-loggedin";
import React, { FC, useMemo } from "react";


export interface State {
  isAuthorize: boolean;
  sidebarView: any;
  displaySidebar: boolean;
  displayModal: boolean;
  modalView: string;
  modalData: any;
  displayHeaderSearch: boolean;
  displayMobileSearch: boolean;
  displayModalStickyBar: boolean;
}

const initialState = {
  isAuthorize: loggedIn(),
  sidebarView: "CART_VIEW",
  displaySidebar: false,
  displayModal: false,
  modalView: "LOGIN_VIEW",
  modalData: null,
  displayHeaderSearch: false,
  displayMobileSearch: false,
  displayModalStickyBar: false,
};

type Action =
  | {
      type: "AUTHORIZE";
    }
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "SET_SIDEBAR_VIEW";
      view: SIDEBAR_VIEW;
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
    }
  | {
      type: "SHOW_HEADER_SEARCH";
    }
  | {
      type: "HIDE_HEADER_SEARCH";
    }
  | {
      type: "SHOW_MODAL_STICKY_BAR";
    }
  | {
      type: "HIDE_MODAL_STICKY_BAR";
    }
  | {
      type: "TOGGLE_MOBILE_SEARCH";
    }
  | {
      type: "SET_MODAL_DATA";
      data: MODAL_DATA;
    }
  | {
      type: "SHOW_MODAL_PRODUCT_OFFER",
      data: MODAL_DATA
  };

type MODAL_VIEWS =
  | "REGISTER"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "ADD_OR_UPDATE_ADDRESS"
  | "DELETE_ADDRESS"
  | "PRODUCT_DETAILS"
  | "PRODUCT_OFFER";
type SIDEBAR_VIEW =
  | "CART_VIEW"
  | "FILTER_VIEW"
  | "MAIN_MENU_VIEW"
  | "AUTH_MENU_VIEW";
type MODAL_DATA = any;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "AUTHORIZE": {
      return {
        ...state,
        isAuthorize: true,
        displayModal: state.displayModal && false,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_MODAL_DATA": {
      return {
        ...state,
        modalData: action.data,
      };
    }
    case "SHOW_HEADER_SEARCH": {
      return {
        ...state,
        displayHeaderSearch: true,
      };
    }
    case "HIDE_HEADER_SEARCH": {
      return {
        ...state,
        displayHeaderSearch: false,
      };
    }
    case "SHOW_MODAL_STICKY_BAR": {
      return {
        ...state,
        displayModalStickyBar: true,
      };
    }
    case "HIDE_MODAL_STICKY_BAR": {
      return {
        ...state,
        displayModalStickyBar: false,
      };
    }
    case "TOGGLE_MOBILE_SEARCH": {
      return {
        ...state,
        displayMobileSearch: !state.displayMobileSearch,
      };
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const authorize = () => dispatch({ type: "AUTHORIZE" });
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" });
  const setSidebarView = (view: SIDEBAR_VIEW) =>
    dispatch({ type: "SET_SIDEBAR_VIEW", view });

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const showHeaderSearch = () => dispatch({ type: "SHOW_HEADER_SEARCH" });
  const hideHeaderSearch = () => dispatch({ type: "HIDE_HEADER_SEARCH" });
  const showModalStickyBar = () => dispatch({ type: "SHOW_MODAL_STICKY_BAR" });
  const hideModalStickyBar = () => dispatch({ type: "HIDE_MODAL_STICKY_BAR" });
  const toggleMobileSearch = () => dispatch({ type: "TOGGLE_MOBILE_SEARCH" });

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: "SET_MODAL_VIEW", view });
  const setModalData = (data: MODAL_DATA) =>
    dispatch({ type: "SET_MODAL_DATA", data });

  const value = useMemo(
    () => ({
      ...state,
      authorize,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      setSidebarView,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      setModalData,
      showHeaderSearch,
      hideHeaderSearch,
      showModalStickyBar,
      hideModalStickyBar,
      toggleMobileSearch,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
