import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════
   SOUND ENGINE — Web Audio API
═══════════════════════════════════════════════════ */
function createAudio() {
  if (typeof window === "undefined") return null;
  try { return new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { return null; }
}

function playTone(ctx: AudioContext | null, freq: number, duration: number, type: OscillatorType = "sine", vol = 0.18) {
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(); osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playWrong(ctx: AudioContext | null) {
  playTone(ctx, 200, 0.15, "sawtooth", 0.15);
}

function playWordComplete(ctx: AudioContext | null) {
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => playTone(ctx, f, 0.15, "sine", 0.15), i * 60)
  );
}

function playTimerRing(ctx: AudioContext | null) {
  [1047, 1319, 1568, 1319, 1047].forEach((f, i) =>
    setTimeout(() => playTone(ctx, f, 0.18, "sine", 0.22), i * 100)
  );
}

function playTickTock(ctx: AudioContext | null) {
  playTone(ctx, 1200, 0.04, "square", 0.06);
}

function playGameOver(ctx: AudioContext | null) {
  [400, 320, 240].forEach((f, i) =>
    setTimeout(() => playTone(ctx, f, 0.35, "sawtooth", 0.2), i * 200)
  );
}

/* ═══════════════════════════════════════════════════
   1000+ WORD BANK
═══════════════════════════════════════════════════ */

type Difficulty = "easy" | "medium" | "hard";
type WordEntry = { word: string; pts: number };

const WORDS: Record<Difficulty, string[]> = {
  easy: [
    // 3-4 letters
    "CAT","DOG","SUN","RUN","FLY","SKY","CUP","BOX","CAR","BUS","MAP","JAM","ANT","BEE","FOX",
    "COW","PIG","HEN","OWL","BAT","RAT","EEL","YAK","EMU","GNU","AXE","OAR","URN","VAN","JET",
    "NET","DEN","ZEN","KEG","JUG","POT","WOK","PAN","TAP","MOP","RUG","SOB","NOD","WAG","DIP",
    "TIP","HOP","ZAP","TAX","WAX","FIG","RYE","OAT","PEA","YAM","BEAN","CORN","LIME","KIWI","PEAR",
    "PLUM","RICE","MILK","SALT","TACO","BEEF","TOFU","MINT","CAKE","SODA","FISH","FROG","DEER","WOLF",
    "DUCK","CROW","CRAB","WORM","MOLE","SWAN","TOAD","CLAM","LYNX","BEAR","LION","SLUG","MOTH","LARK",
    "DOVE","MULE","BOAR","STAG","NEWT","VOLE","IBIS","HARE","WREN","GNAT","WASP","FLEA","TICK","LOUSE",
    "MONK","KING","FORT","FLAG","CLAN","TOMB","RUIN","MYTH","FUND","BOND","DEED","COIN","LAND","MINE",
    "PORT","ROAD","WELL","FARM","LAKE","POND","HILL","DALE","GLEN","MOOR","CAVE","REEF","MESA","CAPE",
    "ISLE","GULF","DUNE","RIFT","LOCH","BURN","BECK","FORD","WADI","ATOLL","FELL","KNOLL",
    "CODE","DATA","DISK","FILE","FONT","ICON","LINK","LOOP","MENU","BYTE","WIFI","ATOM","CELL","GENE",
    "RAIN","LAVA","WAVE","SEED","SOIL","MOON","STAR","HEAT","WIND","ECHO","ACID","LENS","GOLF","POLO",
    "SURF","SWIM","RACE","KICK","YOGA","JUDO","DRUM","HARP","JAZZ","TUNE","BEAT","NOTE","FILM","SONG",
    "PLAY","DANCE","OPERA","PIANO","FLUTE","BRUSH",
    // 5 letters
    "APPLE","TIGER","CLOUD","MANGO","GLOBE","OCEAN","CAMEL","CRANE","BRUSH","STORM","FLUTE","PLAZA",
    "QUEEN","SWORD","HORSE","SNAKE","SHEEP","RHINO","CRANE","OTTER","HIPPO","KOALA","BISON","GECKO",
    "HERON","QUAIL","VIPER","SLOTH","EAGLE","PANDA","MOOSE","GRAPE","PIZZA","BREAD","HONEY","CURRY",
    "LEMON","ONION","PEACH","GUAVA","PASTA","SUSHI","SALAD","STEAK","ORBIT","SOLAR","OZONE","LASER",
    "LUNAR","PRISM","FROST","RUGBY","RELAY","CHESS","DARTS","NILE","ALPS","ANDES","GLOBE","OPERA",
    "PIXEL","CLOUD","ROBOT","EMAIL","VIRUS","DRONE","RADAR","TRADE","CROWN","TRIBE","BLOOM","CHALK",
    "CRISP","DWARF","EMBER","FABLE","GRACE","GROVE","HATCH","IVORY","JEWEL","KNACK","LANCE","MAPLE",
    "NOTCH","OXIDE","PATCH","QUILL","RIDGE","SCONE","THORN","UNBOX","VIGIL","WALTZ","XENON","YOUTH",
    "ZONAL","ADOBE","BLAZE","CLOAK","DEPOT","EPOCH","FORTE","GRAZE","HAVEN","INFER","JOUST","KARMA",
    "LEDGE","MANOR","NOBLE","OPTIC","PROXY","QUEST","REALM","SCALD","TALON","ULCER","VAPOR","WHIRL",
    "ABIDE","BLEND","CRIMP","DRONE","EXERT","FRILL","GNOME","HORDE","INEPT","JOKER","KNAVE","LUCID",
  ],
  medium: [
    // 6-7 letters
    "JAGUAR","DONKEY","RABBIT","PARROT","MONKEY","TURTLE","FALCON","WALRUS","TOUCAN","PYTHON","SALMON",
    "CONDOR","GIBBON","IMPALA","WAFFLE","BUTTER","CHEESE","TURNIP","RADISH","PAPAYA","CHERRY","GINGER",
    "PEPPER","CARROT","MILLET","WALNUT","ALMOND","RAISIN","MUFFIN","NOODLE","PICKLE","PUMPKIN","BROWNIE",
    "SPINACH","PRETZEL","CASHEW","GARLIC","FOSSIL","MAGNET","GALAXY","PHOTON","PROTON","PLASMA","TUNDRA",
    "TYPHOON","NEUTRON","TSUNAMI","ECLIPSE","EROSION","GRAVITY","METHANE","NUCLEUS","OXYGEN","PROTEIN",
    "QUANTUM","ELEMENT","TORNADO","BOXING","HOCKEY","KARATE","SQUASH","FENCING","CYCLING","ARCHERY",
    "CRICKET","CURLING","HURDLES","SNOOKER","SKETCH","MELODY","CANVAS","SONNET","BALLET","CHORUS",
    "GUITAR","STUDIO","RHYTHM","MOSAIC","MURAL","OCTAVE","PALETTE","SCROLL","TEMPLE","EMPIRE","CASTLE",
    "KNIGHT","PHARAOH","PYRAMID","DYNASTY","SERVER","CURSOR","COOKIE","BUFFER","ROUTER","SCRIPT",
    "KERNEL","LAPTOP","SENSOR","BINARY","MALWARE","NARWHAL","OSTRICH","PENGUIN","PANTHER","GORILLA",
    "HAMSTER","LOBSTER","PEACOCK","DOLPHIN","BUFFALO","CHEETAH","SAHARA","AMAZON","CANYON","DESERT",
    "LAGOON","PLATEAU","VOLCANO","GLACIER","EQUATOR","COMET","TABLETOP","CATFISH","CUBICLE","DAZZLE",
    "ECLIPSE","FATHOM","GARLAND","HARVEST","IMPRINT","JUBILEE","KINSHIP","LANTERN","MINDFUL","NETWORK",
    "OUTCOME","PELICAN","QUARTER","RESCIND","STEALTH","TRIUMPH","UNNAMED","VENTURE","WHISPER","XYLOPH",
    "YEARNED","ZEALOUS","ABSTAIN","BREADTH","CAPTIVE","DESCENT","ELEVATE","FERVENT","GLISTEN","HONORED",
    "ISOLATE","JARRING","KNOWING","LOFTY","MAGNIFY","NOTABLE","OBVIOUS","PRUDENT","QUALIFY","RECKLESS",
    "SILENCE","TANGENT","UNCOVER","VIBRANT","WISTFUL","ABDOMEN","BRACKET","CEILING","DOLPHIN","EXHAUST",
    "FRAGILE","GALLANT","HABITAT","IMAGINE","JOURNEY","KEYNOTE","LIBERAL","MYSTERY","NURTURE","OVERLAP",
    "PIONEER","RAPPORT","SCATTER","TERRAIN","UPGRADE","VERDICT","WARRIOR","ABANDON","BRAVERY","CHAPTER",
    "COMBINE","DESPITE","ENFORCE","FICTION","GENUINE","HARMONY","INHERIT","JOYFUL","KITTEN","LEISURE",
    "MEANING","NEGLECT","OPINION","PATTERN","ROUTINE","SPECIAL","TENSION","UNIFORM","VILLAGE","WITNESS",
    "ACHIEVE","BALANCE","CAPABLE","DEVOTE","EVIDENT","FORWARD","GALLANT","HELPFUL","INTENSE","JUSTICE",
    "LASTING","MENTION","NATURAL","OFFENSE","PERFORM","RADICAL","SERVANT","TEXTURE","UNLEASH","VIBRANT",
  ],
  hard: [
    // 8+ letters
    "FLAMINGO","SCORPION","PLATYPUS","CHAMELEON","CROCODILE","PORCUPINE","WOLVERINE","ALBATROSS","CHIMPANZEE",
    "OMELETTE","COURGETTE","CROISSANT","ARTICHOKE","AUBERGINE","RASPBERRY","BLUEBERRY","STRAWBERRY","WATERMELON",
    "PINEAPPLE","FRICTION","ELECTRON","MOLECULE","REFRACTION","BIODIVERSITY","EQUILIBRIUM","CHROMOSOME","ATMOSPHERE",
    "SUPERNOVA","LACROSSE","MARATHON","PENTATHLON","BADMINTON","TRIATHLON","WRESTLING","VOLLEYBALL","SCULPTURE",
    "SYMPHONY","PERFORMANCE","ARCHITECTURE","PHOTOGRAPHY","CALLIGRAPHY","PENINSULA","ARCHIPELAGO","SUBTROPICAL",
    "MEDITERRANEAN","FIREWALL","ALGORITHM","BANDWIDTH","BLOCKCHAIN","ENCRYPTION","JAVASCRIPT","PROCESSOR",
    "SEMICONDUCTOR","REPUBLIC","REVOLUTION","CIVILIZATION","COLONIALISM","DEMOCRACY","INDEPENDENCE","NARWHAL",
    "PHOTOSYNTHESIS","ANTELOPE","CAPYBARA","TARANTULA","NARWHAL","WOLVERINE","BARRACUDA","CHINCHILLA","DRAGONFLY",
    "EARTHWORM","FIREFLIES","GASTROPOD","HUMMINGBIRD","ICHTHYOLOGY","JELLYFISH","KOMODODRAGON","LADYBUG",
    "MUSHROOM","NIGHTINGALE","ORANGUTAN","PARAKEET","QUICKSAND","RHINOCEROS","SALAMANDER","TORTOISE",
    "UNDERMINE","VALOROUS","WANDERLUST","XYLOPHONE","YESTERDAY","ZEPPELIN","ACCELERATE","BLUEPRINT",
    "CELESTIAL","DETERMINE","ELABORATE","FAVORABLE","GLAMOROUS","HEARTBEAT","ILLUMINATE","JEOPARDIZE",
    "KNOWLEDGE","LIMITLESS","MAGNITUDE","NARRATIVE","OBJECTIVE","PARAMOUNT","QUARANTINE","RELUCTANT",
    "SANCTUARY","TREMBLING","UNIVERSE","VALIDATE","WONDERFUL","ALONGSIDE","BRILLIANT","CAPTIVATE",
    "DESPERATE","ELECTORAL","FORMATION","GRACEFUL","HONORABLE","INSPIRING","LEGENDARY","MARVELOUS",
    "NOURISHING","OBSESSION","PASSIONATE","QUARTERLY","RESILIENT","SCATTERED","TERRITORY","UNIVERSAL",
    "BEAUTIFUL","CAREFULLY","DANGEROUS","EFFECTIVE","FANTASTIC","GORGEOUS","HAPPINESS","IMPORTANT",
    "JEALOUSLY","KNOWLEDGE","LAUGHTER","MEMORABLE","NATURALLY","OBVIOUSLY","PERFECTLY","REALISTIC",
    "SENSITIVE","TOLERANCE","UNFORGETTABLE","VICTORIAN","WONDERFUL","YOUTHFULNESS","ZEALOUSLY",
    "ABUNDANCE","BOTANICAL","CALCULATE","DIMENSION","EMBELLISH","FASHIONABLE","GRATITUDE","HISTORICAL",
    "INNOCENCE","JUDGEMENT","KINDHEARTED","LEGENDARY","MEDITATION","NECESSARY","ORGANICALLY","PLANETARY",
    "REASONING","SPIRITUAL","TRADITIONAL","ULTIMATELY","VIBRANTLY","WONDERING","ADVENTURE","BEAUTIFUL",
    "CHALLENGE","DISCOVERY","EMOTIONAL","FASCINATE","GATHERING","HEARTFELT","ILLUSION","JOYFULNESS",
    "KINDNESS","LEARNING","MOTIVATED","NURTURING","OBSERVANT","PRINCIPLE","REALISTIC","SANCTUARY",
    "TRAVELING","UNLIMITED","VISIONARY","AWAKENING","BOUNTIFUL","CELEBRATE","DEDICATED","ENERGETIC",
    "FRAMEWORK","GENUINELY","HONORABLE","IMPACTFUL","JOURNEYING","KNOWLEDGE","LIBERATED","MEANINGFUL",
  ],
};

/* Pick random word with difficulty-based points */
function getWordEntry(difficulty: Difficulty): WordEntry {
  const pool = WORDS[difficulty];

  if (pool.length === 0) {
    throw new Error("Word pool is empty");
  }

  const index = Math.floor(Math.random() * pool.length);
  const word = pool[index]!;
  const pts =
    difficulty === "easy"
      ? word.length * 3
      : difficulty === "medium"
      ? word.length * 5
      : word.length * 8;

  return { word, pts };
}

/* ═══════════════════════════════════════════════════
   GAME CONFIG
═══════════════════════════════════════════════════ */

const GAME_DURATION = 60; // seconds

interface DiffConfig {
  label: string; color: string; from: string; to: string;
  description: string; wpmTarget: number;
}

const DIFF_CFG: Record<Difficulty, DiffConfig> = {
  easy:   { label:"Easy",   color:"#3f8a5f", from:"#3f8a5f", to:"#1F6F54", description:"Short words · Relaxed pace",  wpmTarget:20 },
  medium: { label:"Medium", color:"#D79A2C", from:"#D79A2C", to:"#B06A2E", description:"Medium words · Normal speed", wpmTarget:35 },
  hard:   { label:"Hard",   color:"#B5492F", from:"#B5492F", to:"#7A4E6E", description:"Long words · Fast fingers",  wpmTarget:50 },
};

type Screen = "select" | "countdown" | "game" | "over";

/* ═══════════════════════════════════════════════════
   TIMER RING SVG COMPONENT
═══════════════════════════════════════════════════ */

function TimerRing({ timeLeft, total, color }: { timeLeft: number; total: number; color: string }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const pct = timeLeft / total;
  const offset = C * (1 - pct);
  const urgent = timeLeft <= 10;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 130, height: 130 }}>
      <svg width="130" height="130" style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="65" cy="65" r={R}
          fill="none"
          stroke={timeLeft <= 10 ? "#B5492F" : timeLeft <= 20 ? "#D79A2C" : color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
        />
      </svg>
      <div className="relative text-center">
        <div className="font-display font-black" style={{
          fontSize: 36, lineHeight: 1,
          color: timeLeft <= 10 ? "#e8927a" : timeLeft <= 20 ? "#D79A2C" : "#fff",
          transition: "color 0.5s",
          animation: urgent ? "pulse-urgent 0.6s ease infinite" : "none",
        }}>
          {timeLeft}
        </div>
        <div className="font-body text-white/40 text-xs">sec</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════════ */

interface Particle { id: number; x: number; y: number; char: string; color: string; }

/* ═══════════════════════════════════════════════════
   MAIN GAME
═══════════════════════════════════════════════════ */

export default function TypingGame() {
  const router = useRouter();
  const audioCtx = useRef<AudioContext | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const PARTICLE_ICONS = ["✦","✧","●","◆","▲","○"] as const;
  const [screen, setScreen]           = useState<Screen>("select");
  const [difficulty, setDifficulty]   = useState<Difficulty>("easy");
  const [player, setPlayer]           = useState("");
  const [bestScore, setBestScore]     = useState(0);

  // Game state
  const [currentWord, setCurrentWord] = useState<WordEntry>({ word: "", pts: 0 });
  const [typed, setTyped]             = useState("");
  const [score, setScore]             = useState(0);
  const [combo, setCombo]             = useState(0);
  const [maxCombo, setMaxCombo]       = useState(0);
  const [wordsCorrect, setWordsCorrect] = useState(0);
  const [wordsTotal, setWordsTotal]   = useState(0);
  const [timeLeft, setTimeLeft]       = useState(GAME_DURATION);
  const [charStates, setCharStates]   = useState<("idle" | "correct" | "wrong")[]>([]);
  const [particles, setParticles]     = useState<Particle[]>([]);
  const [countdown, setCountdown]     = useState(3);
  const [wordAnimation, setWordAnimation] = useState(false);
  const [lastScore, setLastScore]     = useState<number | null>(null);
  const particleId = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const p = localStorage.getItem("kg_player") || "";
    if (!p) { router.push("/games"); return; }
    setPlayer(p);
    const s = JSON.parse(localStorage.getItem("kg_scores") || "{}");
    setBestScore(s["typing-game"] ?? 0);
  }, []);

  // Countdown then start
  useEffect(() => {
    if (screen !== "countdown") return;
    if (countdown <= 0) {
      setScreen("game");
      return;
    }
    const t = setTimeout(() => {
      playTone(audioCtx.current, countdown === 1 ? 880 : 440, 0.15, "sine", 0.2);
      setCountdown(c => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [screen, countdown]);

  // Focus input on game screen
  useEffect(() => {
    if (screen === "game") {
      inputRef.current?.focus();
      startTimer();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [screen]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          playGameOver(audioCtx.current);
          setTimeout(() => setScreen("over"), 400);
          return 0;
        }
        if (t <= 11) playTickTock(audioCtx.current);
        if (t === 11) playTimerRing(audioCtx.current);
        return t - 1;
      });
    }, 1000);
  };

  const loadNextWord = useCallback((diff: Difficulty) => {
    const entry = getWordEntry(diff);
    setCurrentWord(entry);
    setTyped("");
    setCharStates(new Array(entry.word.length).fill("idle"));
    setWordAnimation(true);
    setTimeout(() => setWordAnimation(false), 300);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const startGame = (diff: Difficulty) => {
    if (!audioCtx.current) audioCtx.current = createAudio();
    setDifficulty(diff);
    setScore(0); setCombo(0); setMaxCombo(0);
    setWordsCorrect(0); setWordsTotal(0);
    setTimeLeft(GAME_DURATION); setTyped(""); setParticles([]);
    setCountdown(3);
    setScreen("countdown");
    // Prepare first word
    const entry = getWordEntry(diff);
    setCurrentWord(entry);
    setCharStates(new Array(entry.word.length).fill("idle"));
  };

  // Real-time character evaluation
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (screen !== "game") return;
    const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    const word = currentWord.word;

    setTyped(val);

    // Evaluate each character
    const newStates: ("idle" | "correct" | "wrong")[] = word.split("").map((ch, i) => {
      if (i >= val.length) return "idle";
      if (val[i] === ch) return "correct";
      return "wrong";
    });
    setCharStates(newStates);

    // Sound on each key
    const lastIdx = val.length - 1;
    if (val.length > 0) {
      if (lastIdx < word.length && val[lastIdx] === word[lastIdx]) {
        playTone(audioCtx.current, 440 + lastIdx * 30, 0.06, "sine", 0.08);
      } else {
        playWrong(audioCtx.current);
      }
    }
    // Check completion — only if fully correct
    if (val === word) {
      // Spawn particles
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
        id: particleId.current++,
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        char: PARTICLE_ICONS[i % PARTICLE_ICONS.length] as string,
        color: DIFF_CFG[difficulty].color,
      }));
      setParticles(p => [...p, ...newParticles]);
      setTimeout(() => setParticles(p => p.filter(px => !newParticles.find(n => n.id === px.id))), 900);

      // Score
      const newCombo = combo + 1;
      const multiplier = Math.min(newCombo, 5);
      const earned = currentWord.pts * multiplier;
      setScore(s => s + earned);
      setCombo(newCombo);
      setMaxCombo(m => Math.max(m, newCombo));
      setWordsCorrect(w => w + 1);
      setWordsTotal(w => w + 1);
      setLastScore(earned);
      setTimeout(() => setLastScore(null), 1000);
      playWordComplete(audioCtx.current);
      loadNextWord(difficulty);
    } else if (val.length >= word.length && val !== word) {
      // Wrong full attempt
      setCombo(0);
      setWordsTotal(w => w + 1);
      playWrong(audioCtx.current);
      loadNextWord(difficulty);
    }
  };

  const saveExit = () => {
    const s = JSON.parse(localStorage.getItem("kg_scores") || "{}");
    s["typing-game"] = Math.max(score, s["typing-game"] ?? 0);
    localStorage.setItem("kg_scores", JSON.stringify(s));
    router.push("/games");
  };

  const accuracy = wordsTotal > 0 ? Math.round((wordsCorrect / wordsTotal) * 100) : 100;
  const cfg = DIFF_CFG[difficulty];

  const FONT_HEAD = (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        body { margin:0; background:#0E211C; }
        .font-display { font-family:'Lora',Georgia,serif; }
        .font-mono { font-family:'DM Sans',system-ui,sans-serif; letter-spacing: 0.02em; }
        .font-body { font-family:'DM Sans',system-ui,sans-serif; }
      `}</style>
    </>
  );

  /* ═══════ DIFFICULTY SELECT ═══════ */
  if (screen === "select") {
    return (
      <>
        <Head>
          <title>Word Rush</title>
          {FONT_HEAD}
        </Head>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#0E211C]">
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 opacity-[.04]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 w-full max-w-sm">
            {/* Logo */}
            <div className="text-center mb-10">
              <p className="font-display italic text-sm text-[#AAB6A2] mb-2">A word-typing game</p>
              <h1 className="font-display text-white font-semibold mb-1" style={{ fontSize: 38 }}>
                Word <span style={{ color: "#D79A2C" }}>Rush</span>
              </h1>
              <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Best: <span style={{ color: "#D79A2C" }}>{bestScore}</span> pts
                {player ? ` · ${player}` : ""}
              </p>
            </div>

            {/* Difficulty cards */}
            <div className="flex flex-col gap-3 mb-6">
              {(["easy","medium","hard"] as Difficulty[]).map((d, idx) => {
                const dc = DIFF_CFG[d];
                return (
                  <motion.button key={d}
                    initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay: idx * 0.08 }}
                    whileTap={{ scale:0.98 }}
                    onClick={() => startGame(d)}
                    className="relative overflow-hidden rounded-lg text-left px-5 py-4 bg-white/[0.03] border border-white/10 transition-colors hover:border-[color:var(--c)]"
                    style={{ "--c": dc.color } as React.CSSProperties}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: dc.color }} />
                    <div className="flex items-center justify-between pl-2">
                      <div>
                        <div className="font-display font-semibold text-white" style={{ fontSize:17 }}>{dc.label}</div>
                        <div className="font-mono text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.5)" }}>{dc.description}</div>
                      </div>
                      <div className="font-mono text-right">
                        <div className="text-xs" style={{ color:dc.color }}>{dc.wpmTarget}+ WPM</div>
                        <div className="text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>target</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <Link href="/games">
              <button className="w-full py-2.5 font-mono text-xs rounded-md transition-colors text-white/40 border border-white/10 hover:text-white/70">
                ← Exit to menu
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ═══════ COUNTDOWN ═══════ */
  if (screen === "countdown") {
    return (
      <>
        <Head>
          <title>Word Rush</title>
          {FONT_HEAD}
        </Head>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0E211C]">
          <AnimatePresence mode="wait">
            <motion.div key={countdown}
              initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:1.3, opacity:0 }}
              transition={{ duration:0.35 }}
              className="font-display font-semibold text-center"
              style={{ fontSize:110, color: countdown > 0 ? cfg.color : "#fff" }}>
              {countdown > 0 ? countdown : "Go!"}
            </motion.div>
          </AnimatePresence>
          <p className="font-mono mt-4 text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>
            {cfg.label} · {GAME_DURATION}s · get ready
          </p>
        </div>
      </>
    );
  }

  /* ═══════ GAME OVER ═══════ */
  if (screen === "over") {
    const isNewBest = score > bestScore;
    return (
      <>
        <Head>
          <title>Word Rush</title>
          {FONT_HEAD}
        </Head>
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#0E211C]">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            className="w-full max-w-sm rounded-lg overflow-hidden bg-white/[0.04] border border-white/10">

            {/* Header bar */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="font-mono text-xs" style={{ color: cfg.color }}>Game over</div>
              <div className="font-display font-semibold text-white text-xl mt-1">
                {isNewBest ? "New record" : wordsCorrect >= 10 ? "Well played" : "Keep practicing"}
              </div>
            </div>

            <div className="p-6">
              {/* Score big */}
              <div className="text-center mb-5">
                <div className="font-display font-semibold" style={{ fontSize:48, color:cfg.color }}>
                  {score}
                </div>
                <div className="font-mono text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>Total score</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  ["Words","" + wordsCorrect + "/" + wordsTotal],
                  ["Accuracy","" + accuracy + "%"],
                  ["Max combo","×" + maxCombo],
                  ["Difficulty",cfg.label],
                ].map(([label,val]) => (
                  <div key={label} className="rounded-md px-3 py-2.5 bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>{label}</div>
                    <div className="font-display font-semibold text-white mt-0.5">{val}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={saveExit}
                  className="font-display w-full py-3 rounded-md text-[#17261D] font-semibold text-base transition-colors"
                  style={{ background: "#D79A2C" }}>
                  Save &amp; exit
                </button>
                <button
                  onClick={() => startGame(difficulty)}
                  className="font-display w-full py-2.5 rounded-md text-white font-semibold text-sm bg-white/[0.06] border border-white/10">
                  Play again
                </button>
                <button onClick={() => setScreen("select")}
                  className="font-mono w-full py-2 text-xs rounded-md text-white/40 border border-white/10">
                  ← Change difficulty
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  /* ═══════ GAME SCREEN ═══════ */
  const comboColor = combo >= 5 ? "#B5492F" : combo >= 3 ? "#D79A2C" : combo >= 2 ? "#3f8a5f" : cfg.color;

  return (
    <>
      <Head>
        <title>Word Rush</title>
        {FONT_HEAD}
        <style>{`
          @keyframes pulse-urgent { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.96)} }
          @keyframes word-enter { from{opacity:0;transform:translateY(-8px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
          .word-enter { animation:word-enter 0.25s cubic-bezier(0.34,1.56,0.64,1); }
          input { caret-color: transparent; }
          input::selection { background:rgba(215,154,44,0.25); }
          :focus { outline:none; }
        `}</style>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0E211C]">
        {/* Grain texture */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none opacity-[.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Particles */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <AnimatePresence>
            {particles.map(p => (
              <motion.div key={p.id}
                initial={{ opacity:1, x:`${p.x}vw`, y:`${p.y}vh`, scale:1 }}
                animate={{ opacity:0, y:`${p.y - 20}vh`, scale:1.6 }}
                exit={{ opacity:0 }}
                transition={{ duration:0.8 }}
                className="absolute text-lg select-none"
                style={{ color:p.color }}>
                {p.char}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full max-w-sm">

          {/* ── TOP HUD ── */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => { if(timerRef.current) clearInterval(timerRef.current); setScreen("select"); }}
              className="font-mono text-xs transition-colors text-white/40 border border-white/10 px-2.5 py-1 rounded-md hover:text-white/70">
              ← Exit
            </button>
            {/* Combo */}
            <div className="text-center">
              {combo >= 2 ? (
                <motion.div key={combo} initial={{ scale:0.85 }} animate={{ scale:1 }}
                  className="font-display font-semibold" style={{ color:comboColor, fontSize:18 }}>
                  ×{combo} combo
                </motion.div>
              ) : (
                <div className="font-mono text-xs text-white/40">Word Rush</div>
              )}
            </div>
            {/* Score */}
            <div className="text-right">
              <div className="font-display font-semibold text-xl text-white">{score}</div>
              <div className="font-mono text-xs text-white/40">pts</div>
            </div>
          </div>

          {/* ── TIMER RING ── */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <TimerRing timeLeft={timeLeft} total={GAME_DURATION} color={cfg.color} />
              <AnimatePresence>
                {lastScore !== null && (
                  <motion.div
                    initial={{ opacity:1, y:0, x:"-50%", scale:1 }}
                    animate={{ opacity:0, y:-45, scale:1.3 }}
                    transition={{ duration:0.9 }}
                    className="absolute left-1/2 top-0 font-display font-semibold whitespace-nowrap"
                    style={{ color:cfg.color, fontSize:20, zIndex:10 }}>
                    +{lastScore}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              [wordsCorrect + "/" + wordsTotal, "words"],
              [accuracy + "%", "accuracy"],
              ["×" + maxCombo, "best combo"],
            ].map(([val,lbl]) => (
              <div key={lbl} className="text-center py-2 rounded-md bg-white/[0.03] border border-white/10">
                <div className="font-display text-white font-semibold" style={{ fontSize:15 }}>{val}</div>
                <div className="font-mono" style={{ fontSize:9, color:"rgba(255,255,255,0.35)" }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* ── WORD DISPLAY ── */}
          <div className="relative rounded-lg overflow-hidden mb-4 bg-white/[0.03] border" style={{ borderColor: `${cfg.color}40` }}>
            <div style={{ height:2, background: cfg.color }} />
            <div className="px-5 py-5 text-center">
              <div className="font-mono text-xs mb-3 text-white/40">Type this word</div>

              {/* Word letters */}
              <div className={`flex justify-center flex-wrap gap-1 mb-4 ${wordAnimation ? "word-enter" : ""}`}>
                {currentWord.word.split("").map((ch, i) => {
                  const state = charStates[i] || "idle";
                  const bg = state === "correct" ? `${cfg.color}25`
                           : state === "wrong" ? "rgba(181,73,47,0.25)"
                           : "rgba(255,255,255,0.06)";
                  const border = state === "correct" ? cfg.color
                               : state === "wrong" ? "#B5492F"
                               : "rgba(255,255,255,0.18)";
                  const color = state === "correct" ? cfg.color
                              : state === "wrong" ? "#e8927a"
                              : "rgba(255,255,255,0.85)";
                  return (
                    <motion.div key={i}
                      animate={{ scale: state === "correct" ? [1,1.15,1] : state === "wrong" ? [1,0.88,1] : 1 }}
                      transition={{ duration:0.2 }}
                      className="font-display font-semibold flex items-center justify-center rounded-md"
                      style={{
                        width: currentWord.word.length > 10 ? 28 : 36,
                        height: currentWord.word.length > 10 ? 34 : 44,
                        fontSize: currentWord.word.length > 10 ? 14 : 18,
                        background:bg, border:`1.5px solid ${border}`,
                        color, transition:"all 0.15s",
                      }}>
                      {ch}
                    </motion.div>
                  );
                })}
              </div>

              {/* Typing progress bar */}
              <div className="h-0.5 rounded-full overflow-hidden bg-white/10">
                <div className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${currentWord.word.length > 0 ? (typed.length / currentWord.word.length) * 100 : 0}%`,
                    background: cfg.color,
                  }} />
              </div>

              {/* Points indicator */}
              <div className="mt-2 font-mono text-xs" style={{ color: `${cfg.color}99` }}>
                {currentWord.pts * Math.min(combo + 1, 5)} pts {combo >= 1 ? `(×${Math.min(combo+1,5)} combo)` : ""}
              </div>
            </div>
          </div>

          {/* ── HIDDEN INPUT ── */}
          <div className="relative rounded-lg overflow-hidden bg-white/[0.03] border-2" style={{ borderColor: `${cfg.color}50` }}>
            <input
              ref={inputRef}
              type="text"
              value={typed}
              onChange={handleInput}
              onBlur={() => setTimeout(() => inputRef.current?.focus(), 100)}
              autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
              placeholder="start typing..."
              className="w-full font-mono font-semibold text-center bg-transparent py-4 px-4"
              style={{
                color: "#fff", fontSize:18, letterSpacing:"0.15em",
                caretColor:cfg.color,
              }}
            />
          </div>

          <p className="font-mono text-center mt-3 text-xs text-white/25">
            Tap the box and type — it submits automatically
          </p>
        </div>
      </div>
    </>
  );
}
