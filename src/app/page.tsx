"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import {
  useCopilotAction,
  useCopilotReadable,
  useHumanInTheLoop,
} from "@copilotkit/react-core";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  console.log({ todos });

  useCopilotReadable({
    description: "My Todo List",
    value: todos,
  });

  useCopilotAction({
    name: "addTodo",
    description: "Add a todo to the list",
    parameters: [
      {
        name: "todo",
        type: "string",
        description: "The todo to add",
      },
    ],
    handler: async ({ todo }) => {
      setTodos((prev) => [...prev, todo]);
      return {
        success: true,
        message: "Todo added successfully",
      };
    },
  });

  useHumanInTheLoop({
    name: "removeTodo",
    description: "Remove a todo from the list",
    parameters: [
      {
        name: "todo",
        type: "string",
        description: "The todo to remove",
      },
    ],
    render: ({ args, status, respond }) => {
      if (status !== "executing" || !respond) {
        return <></>;
      }

      const { todo } = args;

      const handleApprove = () => {
        setTodos((prev) => prev.filter((t) => t !== todo));
        respond({ success: true, message: "Todo removed successfully" });
      };
      const handleReject = () => {
        respond({
          success: false,
          message: "USer cancelled the action. Todo not removed",
        });
      };

      return (
        <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md border shadow-sm">
          <p>Are you sure you want to remove {todo}?</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleApprove}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="border text-black px-4 py-2 rounded-md"
            >
              Reject
            </button>
          </div>
        </div>
      );
    },
  });

  return (
    <main className="h-screen w-screen">
      <CopilotChat
        className="h-full"
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Your Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
      />
    </main>
  );
}
