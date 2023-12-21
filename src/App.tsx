import React from "react";
import { LoadButton } from "./components/LoadButton";
import { SearchForm } from "./components/SearchForm";

export function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100">
      <header className="pl-20 p-3 bg-black">🔎 ChatGPT History Search</header>
      <LoadButton />
      <SearchForm />
    </div>
  );
}
