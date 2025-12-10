import {
  LangChainAgent,
  type LangChainAgentChainFnConfig,
} from "@ag-ui/langchain";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  ExperimentalEmptyAdapter,
} from "@copilotkit/runtime";
import { ChatOpenAI } from "@langchain/openai";
import type { NextRequest } from "next/server";

const chatOpenAI = new ChatOpenAI({
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY,
});

type ChainFnReturn = Awaited<
  ReturnType<LangChainAgentChainFnConfig["chainFn"]>
>;

const agent = new LangChainAgent({
  chainFn: async ({ messages, tools, threadId }) => {
    const model = chatOpenAI.bindTools(
      tools as Parameters<ChatOpenAI["bindTools"]>[0],
      {
        strict: true,
      },
    );
    return model.stream(messages as Parameters<typeof model.stream>[0], {
      tools,
      metadata: { conversation_id: threadId },
    }) as unknown as ChainFnReturn;
  },
});

const serviceAdapter = new ExperimentalEmptyAdapter();
// TODO: CopilotRuntime must be initialized with an options object, even if empty ({}), to work properly.
const runtime = new CopilotRuntime({
  agents: {
    langchainAgent: agent,
  },
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
