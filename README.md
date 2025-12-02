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
  - **Outcome**: Persisted failure with the same error: `{ url: 'http://localhost:3000/api/copilotkit' } Invalid single-route payload`.

## Summary of Findings

According to the [CopilotKit v1.50 Pre-Release Packet](https://copilotkit.notion.site/CopilotKit-v1-50-Pre-Release-Packet-2b23aa381852800fae86ca323de6fc1e), the new version is intended to be fully backward compatible. However, our testing indicates a consistent regression affecting the single-route payload handling.

Due to limited documentation for the beta release and a lack of similar reported issues, debugging has proven difficult. This repository aims to facilitate collaboration and resolution of these errors.
