import React from "react";
import { LoadButton } from "./components/LoadButton";
import { SearchForm } from "./components/SearchForm";

export function App() {
  return (
    <>
      <header className="pl-20 p-3 drag-handle text-center bg-blue-950">
        ChatGPT History Search
      </header>
      <SearchForm />
      <LoadButton />
    </>
  );
}
