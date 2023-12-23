import React from "react";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { LoadButton } from "./LoadButton";

export function SearchPage() {
  return (
    <>
      <SearchForm />
      <div className="flex-1 overflow-auto">
        <SearchResults />
        <LoadButton />
      </div>
    </>
  );
}
