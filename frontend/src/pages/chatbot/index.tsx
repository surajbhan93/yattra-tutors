import { useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { Send, MessageCircle } from "lucide-react";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"] });

type Option = { label: string; value: string };

export default function ChatbotPage() {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [reply, setReply] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [waMsg, setWaMsg] = useState<string | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    callBot({});
  }, []);

  const callBot = async (payload: any) => {
    setLoading(true);
    setWaMsg(null); // IMPORTANT RESET

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setReply(data.reply || "");
    setOptions(data.options || []);
    setWaMsg(data.whatsappMessage ?? null);

    setLoading(false);
  };

  const handleOption = (value: string) => {
    if (value === "whatsapp") {
      callBot({ language, role, step: "whatsapp" });
      return;
    }

    if (!language) {
      setLanguage(value);
      callBot({ language: value });
      return;
    }

    if (!role) {
      setRole(value);
      callBot({ language, role: value });
      return;
    }
    callBot({ language, role, step: value });
  };

  const sendText = () => {
    if (!input.trim()) return;

    callBot({
      language,
      role,
      step: null, // THIS WAS THE BUG
      message: input,
    });

    setInput("");
  };

  const openWhatsApp = () => {
    if (!waMsg) return;

    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(waMsg)}`, "_blank");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9] px-4">
      <div className="w-[360px] rounded-lg border border-[#1C2B22]/10 bg-white p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <MessageCircle size={18} className="text-[#D79A2C]" />
          <h2 className={`${lora.className} text-lg font-semibold text-[#1C2B22]`}>Yattra Tutors chatbot</h2>
        </div>

        {/* BOT REPLY */}
        {reply && (
          <p className="mb-4 whitespace-pre-line text-center text-sm text-[#58646C]">{reply}</p>
        )}

        {/* OPTIONS FROM API */}
        {options.length > 0 && (
          <div className="mb-3 space-y-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleOption(opt.value)}
                className="w-full rounded-md bg-[#0E211C] py-2 text-sm font-medium text-white transition-colors hover:bg-[#132B22]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* TEXT INPUT */}
        {language && role && !waMsg && (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
            />
            <button
              onClick={sendText}
              className="rounded-md bg-[#D79A2C] px-3 text-[#17261D] transition-colors hover:bg-[#c4891f]"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        )}

        {/* WHATSAPP FINAL */}
        {waMsg && (
          <button
            onClick={openWhatsApp}
            className="mt-4 w-full rounded-md bg-[#3f8a5f] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#357a52]"
          >
            Talk on WhatsApp
          </button>
        )}

        {loading && <p className="mt-3 text-center text-sm text-[#9AA3AB]">Loading...</p>}
      </div>
    </div>
  );
}
