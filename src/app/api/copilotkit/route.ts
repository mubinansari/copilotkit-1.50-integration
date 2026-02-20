import { createAzure } from "@ai-sdk/azure-v5";
import {
  BuiltInAgent,
  CopilotRuntime,
  createCopilotEndpointSingleRoute,
} from "@copilotkit/runtime/v2";
import type { NextRequest } from "next/server";

const azure = createAzure({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: "preview",
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_V1,
});

const agent = new BuiltInAgent({
  model: azure("model-router"),
});

const runtime = new CopilotRuntime({
  agents: { default: agent },
});

const app = createCopilotEndpointSingleRoute({
  runtime,
  basePath: "/api/copilotkit",
});

export const POST = async (req: NextRequest) => app.fetch(req);
