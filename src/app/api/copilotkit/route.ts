import {
  LangChainAgent,
  type LangChainAgentChainFnConfig,
} from "@ag-ui/langchain";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  ExperimentalEmptyAdapter,
} from "@copilotkit/runtime";
import { SystemMessage } from "@langchain/core/messages";
import { AzureChatOpenAI, type ChatOpenAI } from "@langchain/openai";
import type { NextRequest } from "next/server";

const chatOpenAI = new AzureChatOpenAI({
  streaming: true,
  model: "model-router",
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  azureOpenAIBasePath: process.env.AZURE_OPENAI_API_BASE_PATH,
  azureOpenAIApiDeploymentName: "model-router",
  streamUsage: true,
});

type ChainFnReturn = Awaited<
  ReturnType<LangChainAgentChainFnConfig["chainFn"]>
>;

const agent = new LangChainAgent({
  chainFn: async ({ messages, tools, threadId, context }) => {
    console.log({ messages, tools, threadId, context });
    const model = chatOpenAI.bindTools(
      tools as Parameters<ChatOpenAI["bindTools"]>[0],
      {
        strict: true,
      },
    );

    const allMessages = [
      new SystemMessage(
        `Context: ${context.map((c) => `${c.description}: ${c.value}`).join("\n")}`,
      ),
      ...messages,
    ];

    console.log({ messages: allMessages });

    return model.stream(allMessages as Parameters<typeof model.stream>[0], {
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
