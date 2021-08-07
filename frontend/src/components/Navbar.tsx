import React, { ReactElement } from "react";
import { joinClasses } from "../helper";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps): ReactElement {
  return (
    <nav
      className={joinClasses(
        "flex",
        "justify-between",
        "w-full",
        "py-4",
        "border-b",
        className
      )}
    >
      <div id="brand" className="text-xl font-medium">
        UBF
      </div>
      <ul id="nav-links" className="flex">
        <li>
          <button>Connect</button>
        </li>
        <li>
          <button>Wallet</button>
        </li>
      </ul>
    </nav>
  );
}
