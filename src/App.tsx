import React from "react";
import { LoadButton } from "./components/LoadButton";
import { SearchForm } from "./components/SearchForm";

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-3 drag-handle text-center bg-zinc-950 border-b border-zinc-900 shadow-2xl">
        AI Chat Manager
      </header>
      <div className="flex-1 overflow-auto">
        <SearchForm />
        <LoadButton />
      </div>
      {/* <footer className="p-1 text-center bg-zinc-950 border-t border-zinc-900 text-zinc-600">
        Footer
      </footer> */}
    </div>
  );
}
