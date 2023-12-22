import React from "react";

export function LoadButton() {
  function handleLoadButtonClick() {
    window.electron.sendMessage("load-file");
  }

  return (
    <button
      className="px-2 py-1 border border-zinc-600 rounded-full m-2 "
      onClick={handleLoadButtonClick}
    >
      Load conversations.json
    </button>
  );
}
