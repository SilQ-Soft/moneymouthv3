import React, { useState, useEffect, useRef } from "react";
import {
  CreditCard,
  TrendingUp,
  Users,
  Clock,
  Share2,
  DollarSign,
  ShieldCheck,
  AlertCircle,
  ChevronLeft,
  Wallet,
  Home,
  User,
  X as XIcon,
  Trophy,
  ArrowRight,
} from "lucide-react";

/**
 * MoneyMouth - Put Your Money Where Your Mouth Is.
 * * A high-stakes social voting platform where the winner takes the whole pot
 * for their chosen cause.
 */

// --- Mock Data ---
const INITIAL_BATTLES = [
  {
    id: 1,
    question: "Should AI development be paused for 6 months?",
    description:
      "The rapid advancement of LLMs poses an existential risk vs. The benefits of curing diseases and solving climate change outweigh the risks.",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).getTime(), // 2 hours from now
    totalPot: 14520,
    sideA: {
      id: "a",
      label: "PAUSE IT",
      institution: "Humanity Forward Foundation",
      color: "from-rose-500 to-red-600",
      money: 6200,
      voters: 410,
    },
    sideB: {
      id: "b",
      label: "FULL SPEED",
      institution: "Open Science Alliance",
      color: "from-blue-500 to-indigo-600",
      money: 8320,
      voters: 550,
    },
  },
  {
    id: 2,
    question: "Is a 4-day work week the future?",
    description:
      "Productivity increases with rest vs. The economy cannot sustain a 20% reduction in labor hours.",
    expiresAt: new Date(Date.now() + 1000 * 60 * 45).getTime(), // 45 mins from now
    totalPot: 8450,
    sideA: {
      id: "a",
      label: "YES, 4 DAYS",
      institution: "Labor Rights Union",
      color: "from-emerald-500 to-green-600",
      money: 5100,
      voters: 340,
    },
    sideB: {
      id: "b",
      label: "NO, 5 DAYS",
      institution: "Chamber of Commerce",
      color: "from-slate-500 to-gray-600",
      money: 3350,
      voters: 210,
    },
  },
  {
    id: 3,
    question: "Should meat carry a 'Climate Tax'?",
    description:
      "Meat production causes high emissions vs. Food affordability is a basic human right.",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).getTime(), // 24 hours
    totalPot: 2210,
    sideA: {
      id: "a",
      label: "TAX IT",
      institution: "Green Earth Coalition",
      color: "from-teal-500 to-teal-700",
      money: 900,
      voters: 85,
    },
    sideB: {
      id: "b",
      label: "NO TAX",
      institution: "Farmers Association",
      color: "from-orange-500 to-amber-600",
      money: 1310,
      voters: 120,
    },
  },
];

// --- Components ---

const FormatMoney = ({ amount }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("ENDED");
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, [targetDate]);

  return <span className="font-mono font-bold text-red-500">{timeLeft}</span>;
};

// --- Views ---

const AuthScreen = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
    <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
      <DollarSign size={40} className="text-white" />
    </div>
    <h1 className="text-4xl font-black mb-2 tracking-tight">MoneyMouth</h1>
    <p className="text-slate-400 text-center mb-10 max-w-xs">
      Put your money where your mouth is. Winner takes all for their cause.
    </p>

    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={onLogin}
        className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2"
      >
        <User size={20} />
        Continue with Apple
      </button>
      <button
        onClick={onLogin}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition flex items-center justify-center gap-2"
      >
        <div className="w-5 h-5 bg-white rounded-full"></div>
        Continue with Google
      </button>
      <p className="text-xs text-slate-500 text-center mt-6">
        By continuing, you agree to our Terms of Service. You must be 18+ to
        participate.
      </p>
    </div>
  </div>
);

const Feed = ({ battles, onSelectBattle }) => (
  <div className="pb-24 pt-4 px-4 space-y-6">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Active Battles
      </h2>
      <div className="flex gap-2">
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          LIVE
        </span>
      </div>
    </div>

    {battles.map((battle) => {
      const percentageA = (battle.sideA.money / battle.totalPot) * 100;

      return (
        <div
          key={battle.id}
          onClick={() => onSelectBattle(battle)}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden active:scale-95 transition-transform duration-100 cursor-pointer border border-slate-100 dark:border-slate-700"
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Politics • Trending
              </span>
              <Countdown targetDate={battle.expiresAt} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              {battle.question}
            </h3>

            {/* Money Bar */}
            <div className="relative w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4 flex">
              <div
                className={`h-full bg-gradient-to-r ${battle.sideA.color}`}
                style={{ width: `${percentageA}%` }}
              ></div>
              <div
                className={`h-full bg-gradient-to-l ${battle.sideB.color}`}
                style={{ width: `${100 - percentageA}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 font-semibold mb-1">
                  {battle.sideA.label}
                </p>
                <p
                  className={`font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r ${battle.sideA.color}`}
                >
                  <FormatMoney amount={battle.sideA.money} />
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-slate-500">POT</span>
                  <p className="font-black text-slate-900 dark:text-white">
                    <FormatMoney amount={battle.totalPot} />
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-semibold mb-1">
                  {battle.sideB.label}
                </p>
                <p
                  className={`font-bold text-lg text-transparent bg-clip-text bg-gradient-to-l ${battle.sideB.color}`}
                >
                  <FormatMoney amount={battle.sideB.money} />
                </p>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{battle.sideA.voters + battle.sideB.voters} votes</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-blue-600 cursor-pointer">
              View Details <ArrowRight size={14} />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

const BattleDetail = ({ battle, onBack, onVote, lastVotedTime }) => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate Cooldown
  const COOLDOWN_MS = 10 * 60 * 1000;
  const timeSinceVote = Date.now() - (lastVotedTime || 0);
  const canVote = !lastVotedTime || timeSinceVote >= COOLDOWN_MS;
  const remainingCooldown = COOLDOWN_MS - timeSinceVote;
  const minutesLeft = Math.ceil(remainingCooldown / 60000);

  const percentageA = (battle.sideA.money / battle.totalPot) * 100;

  const handleShare = () => {
    const winner =
      battle.sideA.money > battle.sideB.money
        ? battle.sideA.label
        : battle.sideB.label;
    const text = `I just put money where my mouth is on MoneyMouth! 💸\n\n"${battle.question}"\n\nCurrent Leader: ${winner}\nPot: $${battle.totalPot}\n\nThe winner takes the whole pot for their charity! Join the battle here:`;
    const url = "https://moneymouth.app/battle/" + battle.id;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleVoteClick = (side) => {
    if (!canVote) return;
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    onVote(battle.id, side, selectedAmount);
  };

  return (
    <div className="pb-24 pt-0 min-h-screen bg-white dark:bg-slate-900 relative">
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="text-6xl animate-bounce">💸</div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
        </button>
        <span className="font-bold text-slate-900 dark:text-white">
          Battle Arena
        </span>
        <button
          onClick={handleShare}
          className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-500"
        >
          <Share2 size={24} />
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
          {battle.question}
        </h1>
        <p className="text-slate-500 mb-6">{battle.description}</p>

        {/* Live Status Card */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
            <div
              className={`h-full bg-slate-900 transition-all duration-1000`}
              style={{ width: `${Date.now() % 100}%` }}
            ></div>
          </div>

          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
            TOTAL POT
          </p>
          <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
            <FormatMoney amount={battle.totalPot} />
          </div>
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
            <Clock size={14} />
            <Countdown targetDate={battle.expiresAt} />
          </div>
        </div>

        {/* The Battle Sides */}
        <div className="space-y-4 mb-8">
          {/* Side A */}
          <div
            className={`relative overflow-hidden rounded-2xl border-2 ${
              battle.sideA.money > battle.sideB.money
                ? "border-yellow-400"
                : "border-transparent"
            } bg-white dark:bg-slate-800 shadow-sm`}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${battle.sideA.color}`}
            ></div>
            <div className="p-5 pl-7">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold dark:text-white">
                  {battle.sideA.label}
                </h3>
                <span
                  className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${battle.sideA.color}`}
                >
                  {percentageA.toFixed(1)}%
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-3">
                Beneficiary:{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {battle.sideA.institution}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${battle.sideA.color}`}
                    style={{ width: `${percentageA}%` }}
                  ></div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  <FormatMoney amount={battle.sideA.money} />
                </span>
              </div>
              {battle.sideA.money > battle.sideB.money && (
                <div className="absolute top-2 right-2 text-yellow-500">
                  <Trophy size={20} />
                </div>
              )}
            </div>
          </div>

          {/* VS Badge */}
          <div className="flex justify-center -my-6 relative z-10">
            <div className="bg-slate-900 text-white font-black text-sm rounded-full w-10 h-10 flex items-center justify-center border-4 border-white dark:border-slate-900">
              VS
            </div>
          </div>

          {/* Side B */}
          <div
            className={`relative overflow-hidden rounded-2xl border-2 ${
              battle.sideB.money > battle.sideA.money
                ? "border-yellow-400"
                : "border-transparent"
            } bg-white dark:bg-slate-800 shadow-sm`}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${battle.sideB.color}`}
            ></div>
            <div className="p-5 pl-7">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold dark:text-white">
                  {battle.sideB.label}
                </h3>
                <span
                  className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${battle.sideB.color}`}
                >
                  {(100 - percentageA).toFixed(1)}%
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-3">
                Beneficiary:{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {battle.sideB.institution}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${battle.sideB.color}`}
                    style={{ width: `${100 - percentageA}%` }}
                  ></div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  <FormatMoney amount={battle.sideB.money} />
                </span>
              </div>
              {battle.sideB.money > battle.sideA.money && (
                <div className="absolute top-2 right-2 text-yellow-500">
                  <Trophy size={20} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="bg-white dark:bg-slate-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] -mx-6 -mb-6 p-6 border-t border-slate-100 dark:border-slate-700">
          {!canVote ? (
            <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4 flex items-center gap-3 text-slate-500 justify-center">
              <Clock className="animate-pulse" />
              <span className="font-semibold">
                Next vote available in {minutesLeft} min
              </span>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-4 mb-6">
                {[1, 5, 10].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`flex-1 py-3 rounded-xl font-black text-lg transition-all ${
                      selectedAmount === amt
                        ? "bg-slate-900 text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-slate-900 dark:ring-white dark:bg-white dark:text-slate-900"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-500"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleVoteClick("a")}
                  className={`flex-1 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 bg-gradient-to-r ${battle.sideA.color}`}
                >
                  Vote {battle.sideA.label}
                </button>
                <button
                  onClick={() => handleVoteClick("b")}
                  className={`flex-1 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 bg-gradient-to-l ${battle.sideB.color}`}
                >
                  Vote {battle.sideB.label}
                </button>
              </div>
            </>
          )}

          <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <p>
              Winner takes ALL. If your side wins, the institution receives the
              entire pot (Side A + Side B) minus 5% platform fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletView = () => (
  <div className="p-6 pb-24">
    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
      My Wallet
    </h2>

    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <p className="text-slate-400 text-sm font-semibold mb-1">
        Available Balance
      </p>
      <div className="text-4xl font-mono font-bold mb-6">$45.00</div>

      <div className="flex gap-4">
        <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 rounded-lg text-sm font-bold transition">
          + Add Funds
        </button>
        <button className="flex-1 bg-white text-slate-900 py-2 rounded-lg text-sm font-bold shadow-lg">
          Withdraw
        </button>
      </div>
    </div>

    <h3 className="font-bold text-lg mb-4 dark:text-white">Recent Activity</h3>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="font-bold text-sm dark:text-white">
                Vote: AI Regulation
              </p>
              <p className="text-xs text-slate-500">Today, 10:23 AM</p>
            </div>
          </div>
          <span className="font-bold text-red-500">-$5.00</span>
        </div>
      ))}
      <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="font-bold text-sm dark:text-white">Deposit</p>
            <p className="text-xs text-slate-500">Yesterday</p>
          </div>
        </div>
        <span className="font-bold text-green-500">+$50.00</span>
      </div>
    </div>
  </div>
);

// --- Main App Container ---

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [battles, setBattles] = useState(INITIAL_BATTLES);
  const [lastVotedTime, setLastVotedTime] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Voting
  const handleVote = (battleId, sideId, amount) => {
    // 1. Update timestamp
    setLastVotedTime(Date.now());

    // 2. Update Local State (Simulating Backend)
    setBattles((current) =>
      current.map((b) => {
        if (b.id !== battleId) return b;

        const newTotal = b.totalPot + amount;
        const isSideA = sideId === "a";

        return {
          ...b,
          totalPot: newTotal,
          sideA: {
            ...b.sideA,
            money: isSideA ? b.sideA.money + amount : b.sideA.money,
            voters: isSideA ? b.sideA.voters + 1 : b.sideA.voters,
          },
          sideB: {
            ...b.sideB,
            money: !isSideA ? b.sideB.money + amount : b.sideB.money,
            voters: !isSideA ? b.sideB.voters + 1 : b.sideB.voters,
          },
        };
      })
    );
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-900 transition-colors duration-300">
        {/* Mobile Container wrapper for desktop viewing */}
        <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden flex flex-col">
          {/* Top Nav (only show on Feed) */}
          {activeTab === "feed" && !selectedBattle && (
            <div className="px-6 pt-12 pb-2 bg-white dark:bg-slate-900 sticky top-0 z-20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                  M
                </div>
                <h1 className="font-black text-xl tracking-tight dark:text-white">
                  MoneyMouth
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  $45.00
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {selectedBattle ? (
              <BattleDetail
                battle={selectedBattle}
                onBack={() => setSelectedBattle(null)}
                onVote={handleVote}
                lastVotedTime={lastVotedTime}
              />
            ) : (
              <>
                {activeTab === "feed" && (
                  <Feed battles={battles} onSelectBattle={setSelectedBattle} />
                )}
                {activeTab === "wallet" && <WalletView />}
                {activeTab === "profile" && (
                  <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                      />
                    </div>
                    <h2 className="text-2xl font-bold dark:text-white">
                      Alex Doe
                    </h2>
                    <p className="text-slate-500 mb-8">
                      Passionate Voter • Level 5
                    </p>

                    <div className="w-full space-y-2">
                      <button className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold flex justify-between items-center dark:text-white">
                        <span>Settings</span>{" "}
                        <ChevronLeft className="rotate-180" size={20} />
                      </button>
                      <button className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold flex justify-between items-center dark:text-white">
                        <span>Voting History</span>{" "}
                        <ChevronLeft className="rotate-180" size={20} />
                      </button>
                      <button
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full p-4 text-red-500 font-bold mt-8"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Nav */}
          {!selectedBattle && (
            <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-2 pb-6 flex justify-around items-center sticky bottom-0 z-30">
              <button
                onClick={() => setActiveTab("feed")}
                className={`p-3 rounded-xl transition-all ${
                  activeTab === "feed"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                <Home size={24} strokeWidth={activeTab === "feed" ? 3 : 2} />
              </button>
              <button
                onClick={() => setActiveTab("wallet")}
                className={`p-3 rounded-xl transition-all ${
                  activeTab === "wallet"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                <Wallet
                  size={24}
                  strokeWidth={activeTab === "wallet" ? 3 : 2}
                />
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`p-3 rounded-xl transition-all ${
                  activeTab === "profile"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                <User size={24} strokeWidth={activeTab === "profile" ? 3 : 2} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
