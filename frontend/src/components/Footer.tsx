import React, { ReactElement } from "react";
import { joinClasses } from "../helper";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps): ReactElement {
  return (
    <footer className={joinClasses(className, "py-4", "border-t")}>
      Made by{" "}
      <a
        href="https://github.com/chiranz"
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"
      >
        Chiranjibi
      </a>
    </footer>
  );
}
