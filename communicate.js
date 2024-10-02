import { Agents } from "./scripts/Agent.mjs";
import { AskingPrompt } from "./scripts/Prompts.mjs";
import { settings } from "./scripts/settings.mjs";

const smsAgent = new Agents(settings.ApiEndpoint, settings.ApiKey);
Agents.setBody(AskingPrompt());
document.querySelector("send-msg").addEventListener("click", () => {});
