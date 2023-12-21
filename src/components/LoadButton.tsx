import React from "react";

export function LoadButton() {
  function handleLoadButtonClick() {
    window.electron.sendMessage("load-file");
    // window.electronAPI.sendMessage("toMain", { data: "Your Message" });
  }
  return (
    <button className="border" onClick={handleLoadButtonClick}>
      Load conversations.json
    </button>
  );
}
