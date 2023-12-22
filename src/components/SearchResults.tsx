import React from "react";
import { ResultCard } from "./ResultCard";

export function SearchResults({ results }: { results: unknown[] }) {
  return (
    <div className="w-full">
      {results.map((result, index) => (
        <ResultCard key={index} result={result} />
      ))}
    </div>
  );
}
