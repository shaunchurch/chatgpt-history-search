import React from "react";
import { SearchPage } from "./pages/SearchPage";

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-1 drag-handle text-center bg-zinc-950 border-b border-zinc-800 shadow-2xl">
        AI Chat Manager
      </header>
      <SearchPage />
    </div>
  );
}
