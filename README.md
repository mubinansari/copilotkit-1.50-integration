# CopilotKit v1.50 Integration Reproduction

This repository documents the process and challenges encountered while attempting to integrate CopilotKit v1.50 (Beta 2) into a standard Next.js application. It serves as a reproducible example for the issues observed during the upgrade.

## Branch Overview

The repository is organized into branches representing different stages and approaches to the integration:

- **`main`**
  - Base Next.js application, bootstrapped via the official CLI.

- **`01-copilot-stable`**
  - Successful implementation of CopilotKit stable version with LangChain, following the official quickstart guide.

- **`02-copilot-1.50`**
  - Attempted upgrade to CopilotKit v1.50 beta.
  - **Outcome**: Runtime failure with the error: `{ url: 'http://localhost:3000/api/copilotkit' } Invalid single-route payload`.

- **`03-copilot-1.50-with-langchain-1.x`**
  - Investigation into potential version conflicts by upgrading LangChain from v0.3.x (CopilotKit peer dependency) to v1.x.x.
  - **Outcome**: Failed due to extensive type errors; approach abandoned.

- **`04-copilot-1.50-with-openai-adapter`**
  - Isolated test using the bare-bones `OpenAIAdapter` to rule out LangChain adapter specifics.
  - **Outcome**: 
    - **Partial Success**: Basic chat functionality and frontend tools (via `useCopilotAction`) work.
    - **Issues**:
      - The `copilotkitSuggest` payload (used for suggestion generation) triggers a console error: `{ url: 'http://localhost:3000/api/copilotkit' } Invalid single-route payload` and returns a `400 Bad Request` with `Missing method field`.
      - **Critical Failure**: Adding `useCopilotReadable` causes the chat to stop working entirely, returning no response.

- **`05-copilot-1.50.0-beta.8-with-ag-ui-langchain`**
  - Attempted to use the `@ag-ui/langchain` package to integrate LangChain with CopilotKit.
  - `useCopilotReadable` fails to deliver the "previous todos" that is defined in the `page.tsx` as context to the chat.
  - **Outcome**: The chat works, but the "previous todos" are not available to the chat.

- **`06-copilot-1.50.0-beta.8-with-openai-adapter`**
  - Attempted to use the `OpenAIAdapter` with CopilotKit.
  - Implemented basic hooks with zod parameters.
  - The implementation works, but throws error when trying to use zod/v4.
  - **Outcome**: The hooks may break or perform differently when using zod/v4.

- **`07-copilot-1.50.0-with-ag-ui-langchain`**
- Same outcome as `05-copilot-1.50.0-beta.8-with-ag-ui-langchain`

- **`08-copilot-1.50.0-with-openai-adapter`**
  - Same outcome as `06-copilot-1.50.0-beta.8-with-openai-adapter`

- **`09-copilot-1.50.0-with-ag-ui-langchain`**
  - In the production (build) version of the Next.js app, invoking a CopilotKit tool call results in a crash.
  - After that, the chat stops working entirely, returning no response.
