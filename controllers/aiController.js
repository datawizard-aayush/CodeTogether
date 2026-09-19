const { generateAiResponse } = require("../services/aiService");

/**
 * Handles AI chat, code explanation, error debugging, and project summarization requests.
 * Route: POST /api/ai/chat
 */
const handleChat = async (req, res) => {
  try {
    const actionType = req.body.actionType || req.body.action || "general";
    const prompt = req.body.prompt || req.body.message || req.body.query || "";
    const codeSnippet = req.body.codeSnippet || req.body.code || "";
    const errorSnippet = req.body.errorSnippet || req.body.error || req.body.errorMessage || "";
    const projectContext = req.body.projectContext || req.body.context || "";
    const history = req.body.history || req.body.messages || [];

    const hasPrompt = typeof prompt === "string" && prompt.trim().length > 0;
    const hasCode = typeof codeSnippet === "string" && codeSnippet.trim().length > 0;
    const hasError = typeof errorSnippet === "string" && errorSnippet.trim().length > 0;
    const hasContext = typeof projectContext === "string" && projectContext.trim().length > 0;
    const isSpecialAction = actionType === "summarize" || actionType === "setup";

    if (!hasPrompt && !hasCode && !hasError && !hasContext && !isSpecialAction) {
      return res.status(400).json({
        success: false,
        message: "Please provide a prompt, code snippet, error message, or project context to analyze.",
      });
    }

    // If no explicit prompt was provided for special actions, supply an intuitive default
    let effectivePrompt = hasPrompt ? prompt.trim() : "";
    if (!effectivePrompt) {
      if (actionType === "summarize") {
        effectivePrompt = "Summarize this repository, its purpose, architecture, and technology stack.";
      } else if (actionType === "setup") {
        effectivePrompt = "Provide instructions and troubleshooting tips for setting up and running this project.";
      } else if (actionType === "explain" && hasCode) {
        effectivePrompt = "Explain what this code does and how it works.";
      } else if (actionType === "debug" && (hasError || hasCode)) {
        effectivePrompt = "Analyze this error and code, explain the cause, and provide a fix.";
      }
    }

    const response = await generateAiResponse({
      prompt: effectivePrompt,
      codeSnippet: hasCode ? codeSnippet.trim() : "",
      errorSnippet: hasError ? errorSnippet.trim() : "",
      actionType,
      projectContext: hasContext ? projectContext.trim() : "",
      history,
    });

    return res.status(200).json({
      success: true,
      data: {
        reply: response.text,
        isFallback: response.isFallback,
        model: response.model,
        actionType,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while generating AI response.",
    });
  }
};

/**
 * Returns the status of the AI service without revealing sensitive keys.
 * Route: GET /api/ai/status
 */
const getAiStatus = (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = Boolean(
    apiKey && apiKey.trim() !== "" && apiKey !== "your_gemini_api_key_here"
  );

  return res.status(200).json({
    success: true,
    service: "Google Gemini",
    configured: isConfigured,
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
  });
};

module.exports = {
  handleChat,
  getAiStatus,
};
