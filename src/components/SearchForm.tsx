import { toRelativeDate } from "@/lib/dates";
import React, { useEffect, useRef, useState } from "react";

export function SearchForm() {
  const inputRef = useRef(null);
  const [conversations, setConversations] = useState([]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const query = inputRef.current.value;
    console.log("searching", query);
    window.electron.sendMessage("search-file", query);
  }

  function handleOpenUrl(url) {
    window.electron.sendMessage("open-external", url);
  }

  useEffect(() => {
    window.electron.receiveMessage("search-results", (searchResults) => {
      console.log("search results", searchResults);
      setConversations(searchResults);
      // setArticles(articles);
    });
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
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation.refIndex}
            className="flex px-2 py-2 border-b border-zinc-800 "
          >
            <button
              onClick={() =>
                handleOpenUrl(
                  `https://chat.openai.com/c/${conversation.item.id}`
                )
              }
            >
              {conversation.item.title}
            </button>

            <div className="ml-auto flex space-x-4">
              <span className="text-zinc-500">
                {100 - conversation.score.toFixed(2) * 100}%
              </span>
              <time className="text-zinc-700">
                {toRelativeDate(conversation.item.create_time * 1000)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
