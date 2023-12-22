import React from "react";

export function LoadButton() {
  function handleLoadButtonClick() {
    window.electron.sendMessage("load-file");
  }

  return (
    <button
      className="px-2 py-1 border border-zinc-600 rounded m-2 absolute right-0 top-0"
      onClick={handleLoadButtonClick}
    >
      Load conversations.json
    </button>
  );
}
