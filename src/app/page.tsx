"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useFrontendTool, useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Buy groceries from the store",
    completed: false,
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Buy groceries from the store",
    completed: false,
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Buy groceries from the store",
    completed: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  useCopilotReadable({
    description: "The user's previous todos",
    value: todos,
  });

  useFrontendTool({
    name: "addTodo",
    description: "Add a new todo",
    parameters: [
      {
        type: "string",
        name: "title",
        description: "The title of the todo",
      },
      {
        type: "string",
        name: "description",
        description: "The description of the todo",
      },
      {
        type: "boolean",
        name: "completed",
        description: "Whether the todo is completed",
      },
    ],
    handler: async ({ title, description, completed }) => {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title,
          description,
          completed,
        },
      ]);
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
