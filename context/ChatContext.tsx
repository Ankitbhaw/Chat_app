"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }: any) => {
  const { currentUser }: any = useAuthContext();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload?.uid
              : action.payload?.uid + currentUser.uid,
        };
        break;

      default:
        return state;
        break;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = () => useContext(ChatContext);
