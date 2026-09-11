import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, Sparkles, RotateCw } from 'lucide-react';
import { Section, SectionHeader } from './Section';
import ChatMessage from './ChatMessage';
import ProductDetail from './ProductDetail';
import { suggestedPrompts } from '@/data/chatLogic';
import type { Message, Product } from '@/data/types';

let messageId = 0;
const genId = () => `msg-${++messageId}`;

const initialMessage: Message = {
  id: genId(),
  role: 'prism',
  text: "PRISM is online. Ask me about products, prices, your membership, or today's offers.",
};

async function callPrismAI(
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
): Promise<string> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/prism-chat`;
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  const data = await response.json();
  if (!data || typeof data.reply !== 'string') {
    throw new Error('Invalid response from AI');
  }
  return data.reply;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isProcessing) return;

      const userMsg: Message = { id: genId(), role: 'user', text };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsProcessing(true);

      const processingMsg: Message = { id: genId(), role: 'prism', text: '', isProcessing: true };
      setMessages((prev) => [...prev, processingMsg]);

      try {
        const history = messages
          .filter((m) => !m.isProcessing && m.text)
          .map((m) => ({
            role: m.role === 'user' ? 'user' as const : 'model' as const,
            text: m.text,
          }));

        const aiReply = await callPrismAI(text, history);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === processingMsg.id
              ? { ...m, text: aiReply, isProcessing: false }
              : m,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === processingMsg.id
              ? { ...m, text: 'PRISM couldn\'t reach its AI service right now. Please try again.', isProcessing: false, isError: true }
              : m,
          ),
        );
      }
      setIsProcessing(false);
    },
    [isProcessing, messages],
  );

  const retryLastMessage = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      const errorMessages = messages.filter((m) => m.isError);
      setMessages((prev) => prev.filter((m) => !m.isError && !m.isProcessing));
      sendMessage(lastUserMsg.text);
    }
  }, [messages, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <Section id="demo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="INTERACTIVE DEMO"
          title="Talk to PRISM"
          description="PRISM is powered by live AI. Ask about products, prices, membership, or offers."
        />

        <div className="mx-auto max-w-2xl">
          {/* Chat container */}
          <div className="overflow-hidden border border-border bg-surface shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent4 animate-pulse-dot" aria-hidden="true" />
                </div>
                <span className="font-mono text-sm font-semibold text-ptext">PRISM / ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-mtext">
                <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                Live AI
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[420px] space-y-4 overflow-y-auto bg-bg px-5 py-5" role="log" aria-label="PRISM conversation messages" aria-live="polite">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} onProductClick={handleProductClick} onRetry={msg.isError ? retryLastMessage : undefined} />
              ))}
            </div>

            {/* Suggested prompts */}
            <div className="border-t border-border px-5 py-3">
              <div className="mb-2 font-mono text-xs text-mtext">Suggested prompts:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    disabled={isProcessing}
                    className="border border-border bg-surface-2 px-3 py-1.5 text-xs text-stext transition-all hover:border-primary/40 hover:text-primary disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-surface-2 px-4 py-3">
              <button
                type="button"
                onClick={() => inputRef.current?.focus()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-border text-mtext transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Microphone"
                title="Microphone (demo control)"
              >
                <Mic className="h-4 w-4" aria-hidden="true" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask PRISM about products, prices, membership..."
                aria-label="Ask PRISM about products, prices, or membership"
                className="flex-1 border border-border bg-surface px-4 py-2 text-sm text-ptext placeholder:text-mtext focus:border-primary/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-primary text-white transition-all hover:bg-primary/90 disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          <p className="mt-3 text-center font-mono text-xs text-mtext">
            PRISM is powered by live AI. Ask about products, prices, membership, or offers.
          </p>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Section>
  );
}
