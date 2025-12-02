"use client";

import { useCopilotReadable, useFrontendTool } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  console.log({ todos });

  useCopilotReadable(
    {
      description: "The list of todo items",
      value: {
        todos,
      },
    },
    [todos],
  );

  useFrontendTool({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      setTodos([...todos, todoText]);
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
