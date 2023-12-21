import React, { useEffect, useRef, useState } from "react";
import { SearchResults } from "./SearchResults";

export function SearchForm() {
  const inputRef = useRef(null);
  const [conversations, setConversations] = useState([]);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current.value;
    console.log("searching", query);
    window.electron.sendMessage("search-file", query);
  }

  useEffect(() => {
    window.electron.receiveMessage(
      "search-results",
      (searchResults: unknown[]) => {
        console.log("search results", searchResults);
        setConversations(searchResults);
      }
    );
  }, []);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          name="query"
          id="queryInput"
          ref={inputRef}
          className="px-2 py-1 border border-zinc-600 rounded m-2 bg-zinc-900"
        />
        <button className="px-2 py-1 border border-zinc-600 rounded m-2">
          Search
        </button>
      </form>

      <SearchResults results={conversations} />
    </>
  );
}
