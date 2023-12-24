import React, { useRef } from "react";

export function SearchForm() {
  const inputRef = useRef(null);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current.value;
    console.log("searching", query);
    window.electron.sendMessage("search-file", query);
  }

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex flex-row p-4 space-x-4 bg-zinc-950 w-full border-b border-zinc-800"
    >
      <input
        type="search"
        name="query"
        id="queryInput"
        ref={inputRef}
        className="px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-950 w-10/12"
        placeholder="Search conversations..."
      />
      <button className="px-2 py-1 border border-zinc-700 rounded-lg m-0 w-2/12">
        Search
      </button>
    </form>
  );
}
