import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/navbar/NavBar";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const GAMES = [
  {
    id: "math-quize",
    title: "Math Quiz",
    emoji: "🧮",
    desc: "Solve maths problems & earn stars!",
    tint: "#B06A2E", // ochre
    badge: "Numbers",
    tip: "Easy → hard levels",
  },
  {
    id: "word-puzzle",
    title: "Word Puzzle",
    emoji: "🔤",
    desc: "Unscramble words & build vocabulary!",
    tint: "#7A4E6E", // plum
    badge: "Vocabulary",
    tip: "15 fun words",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    emoji: "🃏",
    desc: "Match the pairs & train your memory!",
    tint: "#3E5C83", // indigo
    badge: "Brain power",
    tip: "3 exciting levels",
  },
  {
    id: "snake",
    title: "Child Snake",
    emoji: "🐍",
    desc: "Control the snake & grow longer!",
    tint: "#1F6F54", // pine
    badge: "Arcade",
    tip: "Speed increases",
  },
  {
    id: "color-matching",
    title: "Color Match",
    emoji: "🎨",
    desc: "Match colors with drag & drop!",
    tint: "#8a5f18", // gold-dark
    badge: "Focus",
    tip: "With timer & lives",
  },
  {
    id: "find-odd-one",
    title: "Find Odd One",
    emoji: "👀",
    desc: "Spot the different item quickly!",
    tint: "#6B5636", // warm muted
    badge: "Logic",
    tip: "3 lives challenge",
  },
];

export default function GamesLobby() {
  const [player, setPlayer] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [nameInput, setNameInput] = useState("");
  const [nameSet, setNameSet] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem("kg_player") || "";
    const s = localStorage.getItem("kg_scores");
    if (p) { setPlayer(p); setNameSet(true); }
    if (s) setScores(JSON.parse(s));
  }, []);

  const saveName = () => {
    if (!nameInput.trim()) return;
    const n = nameInput.trim();
    localStorage.setItem("kg_player", n);
    setPlayer(n);
    setNameSet(true);
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <>
      <NavBar />
      <Head>
        <title>Kids Game Zone</title>
      </Head>

      <div className={`min-h-screen relative overflow-hidden bg-[#0E211C] ${dmSans.className}`}>
        {/* Grain texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
          {/* ── NAME GATE ── */}
          <AnimatePresence mode="wait">
            {!nameSet ? (
              <motion.div
                key="name-gate"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-screen"
              >
                <p className={`${lora.className} italic text-sm text-[#AAB6A2] mb-3`}>Learn · play · win</p>
                <h1 className={`${lora.className} text-center text-white text-3xl sm:text-4xl font-semibold mb-8`}>
                  Kids game zone
                </h1>

                <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[.04] p-7">
                  <label className="block text-sm text-[#AAB6A2] mb-2.5">What&rsquo;s your name?</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveName()}
                    placeholder="e.g. Arjun, Priya..."
                    maxLength={18}
                    className="w-full rounded-md border border-white/15 bg-white/[.06] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[#D79A2C]"
                  />
                  <button
                    onClick={saveName}
                    disabled={!nameInput.trim()}
                    className="mt-3 w-full py-3 rounded-md font-semibold text-sm transition-colors disabled:cursor-not-allowed"
                    style={{
                      background: nameInput.trim() ? "#D79A2C" : "rgba(255,255,255,0.08)",
                      color: nameInput.trim() ? "#17261D" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    Start adventure
                  </button>

                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    {GAMES.map((g) => (
                      <div key={g.id} className="rounded-md bg-white/[.04] py-2.5">
                        <div className="text-xl">{g.emoji}</div>
                        <div className="text-[11px] text-white/35 mt-1">{g.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── LOBBY ── */
              <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                  <div>
                    <p className={`${lora.className} italic text-sm text-[#AAB6A2]`}>Game zone</p>
                    <h1 className={`${lora.className} text-white mt-1 text-2xl sm:text-3xl font-semibold`}>
                      Hey, {player}
                    </h1>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-5 py-2.5 rounded-md border border-white/10 bg-white/[.05]">
                      <div className="text-[#D79A2C] text-xl font-semibold">{totalScore}</div>
                      <div className="text-white/35 text-xs">Total points</div>
                    </div>
                    <button
                      onClick={() => { localStorage.removeItem("kg_player"); setPlayer(""); setNameSet(false); setNameInput(""); }}
                      className="px-4 py-2.5 rounded-md border border-white/10 bg-white/[.04] text-white/45 hover:text-white/75 text-sm transition-colors"
                    >
                      Exit
                    </button>
                  </div>
                </div>

                {/* Score row */}
                {Object.keys(scores).length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {GAMES.map((g) => (
                      <div key={g.id} className="text-center py-3.5 rounded-md border border-white/10 bg-white/[.03]">
                        <div className="text-xl">{g.emoji}</div>
                        <div className="text-white font-semibold text-lg mt-1">{scores[g.id] ?? 0}</div>
                        <div className="text-white/30 text-xs">best pts</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Game cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {GAMES.map((game) => (
                    <Link key={game.id} href={`/games/${game.id}`} className="block">
                      <div className="rounded-lg border border-white/10 bg-white/[.03] p-6 transition-colors hover:border-white/20">
                        <span
                          className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4"
                          style={{ background: `${game.tint}2a`, color: game.tint === "#8a5f18" ? "#D79A2C" : "#fff" }}
                        >
                          {game.badge}
                        </span>

                        <div className="text-4xl mb-4">{game.emoji}</div>

                        <h3 className={`${lora.className} text-white font-semibold text-lg mb-1.5`}>{game.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed mb-1">{game.desc}</p>
                        <p className="text-white/25 text-xs mb-5">{game.tip}</p>

                        {scores[game.id] !== undefined && (
                          <p className="text-[#D79A2C] text-sm font-medium mb-4">Best: {scores[game.id]} pts</p>
                        )}

                        <div className="w-full py-2.5 rounded-md text-center text-sm font-semibold bg-[#D79A2C] text-[#17261D]">
                          {scores[game.id] ? "Play again" : "Start game"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <p className="text-center text-white/20 text-xs mt-12">
                  6 games · fun hints along the way · scores saved to this device
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
