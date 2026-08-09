import { Link } from "react-router-dom";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-royal-600 to-royal-800 shadow-royal ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald2-400" fill="none">
          <path
            d="M4 17 L12 5 L20 17"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald2-400 ring-2 ring-royal-970" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          ሐበሻ<span className="text-emerald2-400">Learn</span>
        </span>
      )}
    </Link>
  );
}
