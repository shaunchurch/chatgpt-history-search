import React, { useEffect } from "react";

export function LoadButton() {
  function handleLoadButtonClick() {
    window.electron.sendMessage("load-file");
    // window.electronAPI.sendMessage("toMain", { data: "Your Message" });
  }

  useEffect(() => {
    window.electron.receiveMessage("search-results", (searchResults) => {
      console.log("search results", searchResults);
      // setArticles(articles);
    });
  }, []);

  return (
    <button
      className="px-2 py-1 border border-zinc-600 rounded m-2"
      onClick={handleLoadButtonClick}
    >
      Load conversations.json
    </button>
  );
}
