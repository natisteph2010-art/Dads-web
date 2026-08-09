import { X, LockKeyhole, Send } from "lucide-react";

interface ActivationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ActivationModal({ open, onClose }: ActivationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-990/80 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="activation-title">
      <div className="card-glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border-emerald2-400/20 bg-royal-960 p-6 shadow-royal sm:p-9">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Close activation dialog">
          <X className="h-5 w-5" />
        </button>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-300">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h2 id="activation-title" className="mt-6 font-display text-2xl font-bold text-white">Unlock Complete Curriculum Access</h2>
        <p className="mt-3 text-lg font-semibold leading-7 text-emerald2-300">Premium preparation package for the Ethiopian National Exam is 200 ETB.</p>
        <div className="mt-7 space-y-4 text-sm leading-6 text-white/70">
          <p><strong className="text-white">1.</strong> Transfer 200 ETB via Telebirr or Commercial Bank of Ethiopia (CBE).</p>
          <p><strong className="text-white">2.</strong> Send your payment screenshot along with your registered Email/Phone number to our Telegram Support: <span className="font-bold text-emerald2-300">@DadsWebSupport</span>.</p>
          <p><strong className="text-white">3.</strong> An admin will verify your transaction and instantly unlock your dashboard!</p>
        </div>
        <a href="https://t.me/DadsWebSupport" target="_blank" rel="noreferrer" className="btn-cta mt-8 w-full">
          <Send className="h-5 w-5" />
          Open Telegram Support
        </a>
      </div>
    </div>
  );
}
