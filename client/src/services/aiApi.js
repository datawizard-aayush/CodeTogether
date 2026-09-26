const API_BASE = '/api/ai';

/**
 * Sends a message or coding task to the backend AI assistant.
 * @param {Object} params
 * @param {string} [params.prompt] - User prompt / question
 * @param {string} [params.codeSnippet] - Optional code snippet
 * @param {string} [params.errorSnippet] - Optional error message / stack trace
 * @param {string} [params.actionType='general'] - 'general' | 'explain' | 'debug' | 'setup' | 'summarize'
 * @param {string} [params.projectContext] - Active repository / project context
 * @param {Array} [params.history=[]] - Recent conversation history turns
 * @returns {Promise<{ reply: string, isFallback: boolean, model: string, actionType: string }>}
 */
export async function sendAiMessage({
  prompt = '',
  codeSnippet = '',
  errorSnippet = '',
  actionType = 'general',
  projectContext = '',
  history = [],
}) {
  const payload = {
    prompt: prompt.trim(),
    codeSnippet: codeSnippet.trim(),
    errorSnippet: errorSnippet.trim(),
    actionType,
    projectContext: projectContext.trim(),
    history: Array.isArray(history) ? history.slice(-6) : [],
  };

  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.message || `AI request failed with status ${response.status}`);
  }

  return json.data;
}

/**
 * Checks the status and configured model of the backend AI service.
 * @returns {Promise<{ configured: boolean, model: string, service: string }>}
 */
export async function checkAiStatus() {
  try {
    const response = await fetch(`${API_BASE}/status`);
    if (!response.ok) return { configured: false, model: 'gemini-3.8-flash' };
    const json = await response.json();
    return json;
  } catch {
    return { configured: false, model: 'gemini-3.8-flash' };
  }
}
