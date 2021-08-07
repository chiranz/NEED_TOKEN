import React, { ReactNode } from "react";

type MessageTypes = "SUCCESS" | "INFO" | "WARNING" | "RESET" | null;

type MessageProps = {
  message?: string | null;
  type: MessageTypes;
};
interface MessageActionType {
  type: MessageTypes;
  payload?: string;
}
interface IGlobalMessageContext {
  dispatch: React.Dispatch<MessageActionType>;
  globalMessage?: MessageProps;
}
export const GlobalMessageContext = React.createContext<IGlobalMessageContext>({
  dispatch: () => {},
});

const initialState: MessageProps = {
  message: "this is error message",
  type: "WARNING",
};

const reducer = (
  state: MessageProps = initialState,
  action: MessageActionType
): MessageProps => {
  switch (action.type) {
    case "INFO":
      return { type: "INFO", message: action.payload };
    case "SUCCESS":
      return { type: "SUCCESS", message: action.payload };
    case "WARNING":
      return { type: "WARNING", message: action.payload };
    case "RESET":
      return { type: null, message: null };
    default:
      return state;
  }
};

export const GlobalMessageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [globalMessage, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalMessageContext.Provider value={{ dispatch, globalMessage }}>
      {children}
    </GlobalMessageContext.Provider>
  );
};
