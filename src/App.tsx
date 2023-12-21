import React from "react";
import { LoadButton } from "./components/LoadButton";
import { SearchForm } from "./components/SearchForm";

export function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100">
      <LoadButton />
      <SearchForm />
    </div>
  );
}
