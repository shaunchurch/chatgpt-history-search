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
    <div className="my-4 px-4 rounded shadow-md tabular-nums">
      <header className="flex">
        <button
          className="text-xl font-semibold"
          onClick={() =>
            handleOpenUrl(`https://chat.openai.com/c/${result.conversationId}`)
          }
        >
          {result.conversationTitle}
        </button>

        <div className="ml-auto">
          <span className="text-sm text-gray-500 ml-2">
            {result.contextualItems.length} messages
          </span>

          {/* how long ago? */}
          <span className="text-sm text-gray-500 ml-2">
            {result.contextualItems[0].item.createTime
              ? toRelativeDate(
                  new Date(
                    result.contextualItems.filter(
                      (contextualItem) => contextualItem.item.messageText
                    )[0].item.createTime * 1000
                  )
                )
              : null}
          </span>
        </div>
      </header>

      {result.contextualItems
        .filter((contextualItem) => contextualItem.item.messageText)
        .slice(0, 3)
        .map((contextualItem, index) => (
          <div key={index} className="mt-0">
            <div className="ml-auto flex space-x-2">
              <span className="text-zinc-500">
                {(
                  100 -
                  parseFloat(contextualItem.score.toFixed(3)) * 100
                ).toFixed(0)}
                %
              </span>
              {/* <time
                className="text-zinc-700 w-28"
                title={new Date(
                  contextualItem.item.createTime * 1000
                ).toLocaleDateString()}
              >
                {contextualItem.item.createTime
                  ? toRelativeDate(
                      new Date(contextualItem.item.createTime * 1000)
                    )
                  : null}{" "}
              </time> */}
              <span className="text-zinc-400">
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
