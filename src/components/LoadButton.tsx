import React from "react";

export function LoadButton() {
  function handleLoadButtonClick() {
    window.electron.sendMessage("load-file");
  }

  return (
    <div className="my-10 flex flex-col text-center justify-center text-xl max-w-2xl mx-auto space-y-10">
      <p>
        Export your ChatGPT History, unzip the archive, and find the
        conversations.json file.
      </p>
      <button
        className="px-4 py-1 border border-zinc-700 rounded-lg max-w-64 mx-auto"
        onClick={handleLoadButtonClick}
      >
        Load conversations.json
      </button>
    </div>
  );
}
