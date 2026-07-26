export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    res.status(500).json({ error: "Server missing OPENROUTER_API_KEY" });
    return;
  }

  const body = req.body;
  if (!body?.messages) {
    res.status(400).json({ error: "Missing messages in request body" });
    return;
  }

  try {
    const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: "openai/gpt-3.5-turbo", messages: body.messages })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("OpenRouter proxy error:", error);
    res.status(502).json({ error: "Proxy request failed" });
  }
}
