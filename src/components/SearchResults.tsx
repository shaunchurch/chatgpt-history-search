import React from "react";
import { ResultCard } from "./ResultCard";

export function SearchResults({
  results,
  maxItems = 100,
}: {
  results: unknown[];
  maxItems: number;
}) {
  return (
    <div className="w-full scroll-auto break-words">
      <header className="px-4 py-1 border-t border-zinc-800 text-zinc-500 text-sm flex">
        <span>
          <strong>
            Found {results.length < maxItems ? results.length : maxItems}
          </strong>{" "}
          conversations
        </span>
        {/* <span className="ml-auto">
          <strong>Archive updated 23rd July 2918</strong>
        </span> */}
      </header>
      {results.slice(0, maxItems).map((result, index) => (
        <ResultCard key={index} result={result} />
      ))}
    </div>
  );
}
