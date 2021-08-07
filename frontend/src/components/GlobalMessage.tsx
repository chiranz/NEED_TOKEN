import React, { ReactElement } from "react";
import { GlobalMessageContext } from "../context/GlobalMessageContext";

export default function GlobalMessage(): ReactElement | null {
  const { globalMessage, dispatch } = React.useContext(GlobalMessageContext);

  React.useEffect(() => {
    const clearMessage = () => {
      dispatch({ payload: "", type: "RESET" });
    };
    const resetMessage = setTimeout(clearMessage, 5000);
    return () => clearTimeout(resetMessage);
  }, [dispatch]);

  const color =
    globalMessage?.type === "SUCCESS"
      ? "green"
      : globalMessage?.type === "WARNING"
      ? "red"
      : "blue";
  if (!globalMessage?.message) {
    return null;
  }
  return (
    <div className={`bg-${color}-100 text-lg relative py-4 rounded-md`}>
      <div>{globalMessage?.message}</div>
      <button
        className="absolute top-1 right-3"
        onClick={() => dispatch({ type: "RESET", payload: "" })}
      >
        x
      </button>
    </div>
  );
}
