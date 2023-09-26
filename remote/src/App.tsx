import React from "react";
import ReactDOM from "react-dom";

import { type router } from "./AppRouter";
import Title from "./Title";
import "./index.scss";

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <Title />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
