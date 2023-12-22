import React from "react";
import { toRelativeDate } from "../lib/dates";

type ContextualItem = {
  item: {
    conversationId: string;
    conversationTitle: string;
    nodeId: string;
    parentNodeId: string | null;
    messageText: string;
    createTime: number | null;
    updateTime: number | null;
  };
  context: string[];
  score: number;
};

export type ResultProps = {
  result: {
    conversationId: string;
    conversationTitle: string;
    contextualItems: ContextualItem[];
  };
};

export function ResultCard({ result }: ResultProps) {
  function handleOpenUrl(url: string) {
    window.electron.sendMessage("open-external", url);
  }

  return (
    <div className="my-0 py-4 px-4 shadow-md tabular-nums border-t border-zinc-800">
      <header className="flex">
        <button
          className="text-xl font-semibold"
          onClick={() =>
            handleOpenUrl(`https://chat.openai.com/c/${result.conversationId}`)
          }
        >
          {result.conversationTitle}
        </button>
      </header>
      <div className="font-semibold ">
        <span className="text-sm text-zinc-400">
          {result.contextualItems[0].item.createTime
            ? toRelativeDate(
                new Date(result.contextualItems[0].item.createTime * 1000)
              )
            : null}
        </span>
        <span className="text-sm text-zinc-500 ml-2">
          {result.contextualItems.length} messages
        </span>
      </div>

      {result.contextualItems
        .filter((contextualItem) => contextualItem.item.messageText)
        .slice(0, 3)
        .map((contextualItem, index) => (
          <div key={index} className="mt-0 text-sm">
            <div className="ml-auto flex space-x-2">
              <span className="text-zinc-700">
                {(
                  100 -
                  parseFloat(contextualItem.score.toFixed(3)) * 100
                ).toFixed(0)}
                %
              </span>
              <span className="text-zinc-400 break-words">
                {contextualItem.item.messageText.slice(0, 140) || ""}...
              </span>
            </div>

            {/* {contextualItem.context.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Context:</h3>
              {contextualItem.context.map((context, contextIndex) => (
                <p key={contextIndex} className="text-gray-700">
                  {context}
                </p>
              ))}
            </div>
          )} */}
          </div>
        ))}
    </div>
  );
}
