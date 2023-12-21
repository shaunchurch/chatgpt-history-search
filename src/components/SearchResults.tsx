import React from "react";
import { ResultCard } from "./ResultCard";

export function SearchResults({ results }: { results: unknown[] }) {
  return (
    <div className="container w-full">
      {results.slice(0, 40).map((result, index) => (
        <ResultCard key={index} result={result} />
      ))}
    </div>
  );
}
