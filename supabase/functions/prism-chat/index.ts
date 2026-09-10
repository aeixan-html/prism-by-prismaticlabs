import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  history?: { role: "user" | "model"; text: string }[];
}

const SYSTEM_PROMPT = `You are PRISM, an AI retail shopping assistant for a demo retail store. You help customers with product discovery, price information, membership benefits, and offers.

You are friendly, concise, and helpful. Use markdown formatting (bold for product names and prices).

Here is the demo product catalogue you can reference:

1. Chocolate Biscuits - Biscuits - MRP ₹45, Current ₹32, Member ₹30, On Sale, In Stock
2. Orange Cream Biscuits - Biscuits - MRP ₹35, Current ₹30, Member ₹28, On Sale, In Stock
3. Salt Crackers - Biscuits - MRP ₹30, Current ₹28, Member ₹26, In Stock
4. Potato Chips - Chips - MRP ₹50, Current ₹45, Member ₹42, In Stock
5. Spicy Tortilla Chips - Chips - MRP ₹65, Current ₹55, Member ₹52, On Sale, Low Stock
6. Dark Chocolate Bar - Chocolate - MRP ₹120, Current ₹99, Member ₹92, On Sale, In Stock
7. Milk Chocolate - Chocolate - MRP ₹60, Current ₹58, Member ₹54, In Stock
8. Orange Juice - Juice - MRP ₹90, Current ₹75, Member ₹70, On Sale, In Stock
9. Apple Juice - Juice - MRP ₹85, Current ₹82, Member ₹76, In Stock
10. Cola Soft Drink - Soft drinks - MRP ₹65, Current ₹55, Member ₹50, On Sale, In Stock
11. Lemon Soda - Soft drinks - MRP ₹45, Current ₹40, Member ₹37, In Stock
12. Spring Water - Water - MRP ₹25, Current ₹20, Member ₹18, On Sale, In Stock
13. Whole Wheat Bread - Bread - MRP ₹55, Current ₹48, Member ₹44, Low Stock
14. Fresh Milk - Milk - MRP ₹60, Current ₹56, Member ₹52, In Stock
15. Corn Cereal - Cereal - MRP ₹250, Current ₹189, Member ₹175, On Sale, In Stock
16. Instant Noodles - Instant noodles - MRP ₹30, Current ₹25, Member ₹22, On Sale, In Stock
17. Butter Cookies - Cookies - MRP ₹80, Current ₹70, Member ₹65, In Stock
18. Vanilla Ice Cream - Ice cream - MRP ₹220, Current ₹199, Member ₹185, Low Stock
19. Gel Pen Set - School supplies - MRP ₹150, Current ₹120, Member ₹110, On Sale, In Stock
20. Ballpoint Pens (3pk) - Pens - MRP ₹60, Current ₹50, Member ₹45, In Stock
21. Spiral Notebook - Notebooks - MRP ₹120, Current ₹95, Member ₹88, On Sale, In Stock
22. Hardbound Notebook - Notebooks - MRP ₹250, Current ₹230, Member ₹215, In Stock
23. USB Drive 32GB - USB drives - MRP ₹450, Current ₹380, Member ₹350, On Sale, In Stock
24. Wired Earphones - Earphones - MRP ₹800, Current ₹690, Member ₹640, On Sale, In Stock
25. Wireless Earbuds - Earphones - MRP ₹1800, Current ₹1599, Member ₹1499, Low Stock
26. Phone Case - Phone accessories - MRP ₹350, Current ₹299, Member ₹275, In Stock
27. USB-C Charging Cable - Phone accessories - MRP ₹400, Current ₹360, Member ₹335, In Stock

Demo membership profile:
- Tier: PURPLE
- Points: 2,450
- Total saved: ₹2,450
- Discount: 15% member discount
- Special offer: 20% off selected products
- Next tier: RED (need 550 more points)
- PRISM Points rule: ₹1 saved = 1 PRISM Point

Current offers:
- 20% OFF on selected products across the store
- 15% OFF PURPLE member discount on eligible items
- Member-only personalized retail offers

Keep responses short and natural. When mentioning prices, use ₹ symbol. When discussing products, mention the current price and member price. Be conversational, not robotic.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json() as ChatRequest;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("ai_key");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const contents = [
      ...(history || []).map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const models = ["gemini-2.0-flash-001", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest", "gemini-1.5-flash-002"];
    let geminiResponse: Response | null = null;
    let lastError = "";

    for (const model of models) {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 512,
            },
          }),
        },
      );
      if (geminiResponse.ok) break;
      lastError = await geminiResponse.clone().text();
      geminiResponse = null;
    }

    if (!geminiResponse || !geminiResponse.ok) {
      const listResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      );
      let availableModels = "";
      if (listResp.ok) {
        const listData = await listResp.json();
        availableModels = (listData.models || []).map((m: any) => m.name).join(", ");
      }
      return new Response(
        JSON.stringify({ error: `Gemini API error. Available models: ${availableModels}. Last error: ${lastError}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiData = await geminiResponse.json();
    const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
