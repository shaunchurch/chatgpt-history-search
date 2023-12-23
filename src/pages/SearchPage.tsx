import React from "react";
import { SearchForm } from "../components/SearchForm";
import { SearchResults } from "../components/SearchResults";
import { LoadButton } from "../components/LoadButton";

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
