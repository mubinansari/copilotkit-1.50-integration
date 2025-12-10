"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
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
