import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalMessage from "./components/GlobalMessage";
import { GlobalMessageProvider } from "./context/GlobalMessageContext";

function App() {
  return (
    <GlobalMessageProvider>
      <div className="grid h-screen max-w-4xl mx-auto text-center grid-rows-3m">
        <Navbar />

        <div className="py-4">
          <GlobalMessage />
          <h1 className="text-4xl">Universal Basic Fund</h1>
          <p>Claim your fund once and multiply it.</p>
        </div>
        <Footer />
      </div>
    </GlobalMessageProvider>
  );
}

export default App;
