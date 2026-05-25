import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Users,
  Bell,
  CreditCard,
  Star,
  ArrowRight,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  ChevronDown,
  Upload,
  Lock,
  Instagram,
  Check,
  Eye,
  Clock,
  X,
  Sparkles,
  HelpCircle,
  ChevronRight,
  MessageCircle,
  Info,
  Lightbulb,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "home" | "gallery" | "editor" | "checkout" | "invite";

interface WizardAnswers {
  eventType: string;
  style: string;
  guests: string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const gold = "#B8952A";
const goldLight = "#C9A84C";
const dark = "#1A1814";

// ─── Template data ────────────────────────────────────────────────────────────
const templates = [
  {
    id: 1,
    title: "Casamento Editorial",
    category: "Casamento",
    style: "classico",
    price: "R$ 49,90",
    guests: "grande",
    description:
      "Um convite de casamento elegante com layout editorial, paleta sofisticada e escolhas para histórias de casal, cerimônia e recepção.",
    gradient: "from-stone-800 via-stone-700 to-stone-900",
    accent: "from-amber-900/60",
  },
  {
    id: 2,
    title: "Champanhe e Herança Dourada",
    category: "Casamento",
    style: "classico",
    price: "R$ 49,90",
    guests: "medio",
    description:
      "Para casais que celebram o amor com a grandiosidade de uma tradição suntuosa. Ouro, elegância e uma atmosfera de pura sofisticação.",
    gradient: "from-amber-900 via-yellow-800 to-stone-800",
    accent: "from-amber-800/60",
  },
  {
    id: 3,
    title: "Casamento Luxo",
    category: "Casamento",
    style: "moderno",
    price: "R$ 49,90",
    guests: "grande",
    description:
      "Convite moderno com estética de luxo contemporâneo. Detalhes refinados, fotografia de impacto e a elegância assimétrica do design de alto nível.",
    gradient: "from-rose-900 via-stone-800 to-zinc-900",
    accent: "from-rose-900/60",
  },
  {
    id: 4,
    title: "Aniversário Dourado",
    category: "Aniversário",
    style: "moderno",
    price: "R$ 39,90",
    guests: "pequeno",
    description:
      "Celebre a vida com um convite vibrante e elegante para aniversários especiais.",
    gradient: "from-yellow-700 via-amber-600 to-yellow-900",
    accent: "from-yellow-800/60",
  },
  {
    id: 5,
    title: "Chá de Bebê Floral",
    category: "Chá de Bebê/Panela",
    style: "casual",
    price: "R$ 39,90",
    guests: "pequeno",
    description:
      "Tons pastel e floreios delicados para receber com amor o mais novo membro da família.",
    gradient: "from-pink-200 via-rose-100 to-pink-300",
    accent: "from-pink-300/60",
  },
  {
    id: 6,
    title: "Formatura Clássica",
    category: "Formatura",
    style: "classico",
    price: "R$ 44,90",
    guests: "medio",
    description:
      "Celebre a conquista com um convite sofisticado e memorável para a cerimônia de colação de grau.",
    gradient: "from-indigo-900 via-blue-800 to-indigo-800",
    accent: "from-indigo-900/60",
  },
];

const categories = [
  "Todos",
  "Casamento",
  "Aniversário",
  "Chá de Bebê/Panela",
  "Festa Casual",
  "Confraternização",
  "Corporativo",
  "Formatura",
  "Jantar/Social",
];

// ─── Wizard steps ─────────────────────────────────────────────────────────────
const wizardSteps = [
  {
    id: "eventType",
    question: "Que tipo de evento você está criando?",
    hint: "Isso nos ajuda a mostrar os templates mais adequados para a sua celebração.",
    options: [
      { label: "💍 Casamento", value: "Casamento", desc: "Cerimônia e recepção" },
      { label: "🎂 Aniversário", value: "Aniversário", desc: "Festa ou confraternização" },
      { label: "👶 Chá de Bebê", value: "Chá de Bebê/Panela", desc: "Boas-vindas ao bebê" },
      { label: "🎓 Formatura", value: "Formatura", desc: "Colação de grau" },
      { label: "🎉 Outro", value: "Outro", desc: "Festa casual ou corporativo" },
    ],
  },
  {
    id: "style",
    question: "Qual estilo combina mais com o seu evento?",
    hint: "O estilo define a identidade visual do seu convite — cores, tipografia e atmosfera.",
    options: [
      { label: "✨ Clássico & Elegante", value: "classico", desc: "Sofisticado e atemporal" },
      { label: "🎨 Moderno & Minimalista", value: "moderno", desc: "Limpo e contemporâneo" },
      { label: "🌿 Casual & Descontraído", value: "casual", desc: "Informal e acolhedor" },
    ],
  },
  {
    id: "guests",
    question: "Quantos convidados você espera?",
    hint: "Alguns planos e templates são otimizados para diferentes tamanhos de lista.",
    options: [
      { label: "👥 Até 50 pessoas", value: "pequeno", desc: "Evento íntimo" },
      { label: "👥👥 50 a 150 pessoas", value: "medio", desc: "Tamanho médio" },
      { label: "🎊 Mais de 150 pessoas", value: "grande", desc: "Grande celebração" },
    ],
  },
];

// ─── DCC Tooltip ──────────────────────────────────────────────────────────────
function DCCTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-flex items-center" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xl text-xs text-white shadow-xl z-50 leading-relaxed"
          style={{ background: dark, fontFamily: "Inter, sans-serif" }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${dark}` }} />
        </div>
      )}
    </div>
  );
}

// ─── DCC Hint Banner ──────────────────────────────────────────────────────────
function HintBanner({ icon, text, action, onAction, onDismiss }: {
  icon: React.ReactNode;
  text: string;
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-6"
      style={{ background: "#FFF8E7", border: `1px solid ${goldLight}30` }}
    >
      <span style={{ color: gold, flexShrink: 0 }}>{icon}</span>
      <p className="text-sm flex-1" style={{ color: "#5a4a1a", fontFamily: "Inter, sans-serif" }}>{text}</p>
      <div className="flex items-center gap-2 flex-shrink-0">
        {action && onAction && (
          <button
            onClick={onAction}
            className="text-xs font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
            style={{ background: gold, color: "white", fontFamily: "Inter, sans-serif" }}
          >
            {action}
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="text-[#999] hover:text-[#666] transition-colors">
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Wizard Modal ─────────────────────────────────────────────────────────────
function WizardModal({
  onComplete,
  onSkip,
}: {
  onComplete: (answers: WizardAnswers) => void;
  onSkip: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const current = wizardSteps[step];
  const progress = ((step) / wizardSteps.length) * 100;

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    setAnimating(true);
    setTimeout(() => {
      if (step < wizardSteps.length - 1) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        onComplete(newAnswers as WizardAnswers);
      }
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(26,24,20,0.7)", backdropFilter: "blur(4px)" }}>
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: gold }} />
              <span className="text-sm font-semibold" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>
                Encontre seu template ideal
              </span>
            </div>
            <button
              onClick={onSkip}
              className="text-xs transition-colors hover:text-[#666]"
              style={{ color: "#999", fontFamily: "Inter, sans-serif" }}
            >
              Pular
            </button>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
              <span>Pergunta {step + 1} de {wizardSteps.length}</span>
              <span>{Math.round(((step + 1) / wizardSteps.length) * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "#f0ede6" }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / wizardSteps.length) * 100}%`, background: gold }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="px-8 py-6 transition-opacity duration-200"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <h2
            className="text-2xl mb-2 leading-snug"
            style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}
          >
            {current.question}
          </h2>
          <p className="text-sm mb-6 flex items-start gap-1.5" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>
            <Info size={13} style={{ color: gold, flexShrink: 0, marginTop: 2 }} />
            {current.hint}
          </p>

          <div className="space-y-3">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                style={{
                  border: selected === opt.value ? `2px solid ${gold}` : "2px solid #e8e6e2",
                  background: selected === opt.value ? "#FFF8E7" : "white",
                }}
              >
                <span className="text-2xl leading-none">{opt.label.split(" ")[0]}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                    {opt.label.split(" ").slice(1).join(" ")}
                  </p>
                  <p className="text-xs" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
                    {opt.desc}
                  </p>
                </div>
                {selected === opt.value && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: gold }}>
                    <Check size={11} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <button
            onClick={handleNext}
            disabled={!selected}
            className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
            style={{
              background: selected ? gold : "#d4c9a8",
              cursor: selected ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {step < wizardSteps.length - 1 ? "Próximo" : "Ver meus templates"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Recommendation banner ────────────────────────────────────────────────────
function RecommendationBanner({ answers, count }: { answers: WizardAnswers; count: number }) {
  const eventLabel = answers.eventType === "Outro" ? "seu evento" : `seu ${answers.eventType.toLowerCase()}`;
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl mb-8"
      style={{ background: "#FFF8E7", border: `1px solid ${goldLight}40` }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: gold }}>
        <Sparkles size={18} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold mb-0.5" style={{ color: dark, fontFamily: "Inter, sans-serif" }}>
          Encontramos {count} template{count !== 1 ? "s" : ""} para {eventLabel}
        </p>
        <p className="text-xs" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>
          Selecionados com base no seu estilo {answers.style === "classico" ? "clássico & elegante" : answers.style === "moderno" ? "moderno & minimalista" : "casual & descontraído"} e tamanho do evento.
        </p>
      </div>
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
        style={{ background: gold + "20", color: gold, fontFamily: "Inter, sans-serif" }}
      >
        Recomendados
      </span>
    </div>
  );
}

// ─── Shared Navbar ────────────────────────────────────────────────────────────
function Navbar({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("scroll-root");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 10);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.06)" : "none", borderBottom: "1px solid #e8e6e2" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg" style={{ background: dark, fontFamily: "Playfair Display, serif" }}>
            <span style={{ color: gold }}>Á</span>
          </div>
          <span className="font-semibold text-base" style={{ fontFamily: "Playfair Display, serif", color: dark }}>
            Áurea Events
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "Templates", screen: "gallery" as Screen },
            { label: "Cerimonialistas", screen: null },
            { label: "Blog", screen: null },
            { label: "Como Funciona", screen: null },
            { label: "Preços", screen: null },
            { label: "FAQ", screen: null },
          ].map(({ label, screen }) => (
            <button
              key={label}
              onClick={() => screen && onNavigate(screen)}
              className="text-sm text-[#666] hover:text-[#333] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("gallery")}
            className="hidden md:flex items-center px-5 py-2.5 text-sm font-medium text-white rounded-full transition-opacity hover:opacity-90"
            style={{ background: dark, fontFamily: "Inter, sans-serif" }}
          >
            Criar Convite
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer" style={{ background: gold }}>
            A
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <footer style={{ background: dark }} className="text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl" style={{ background: "#2a2620", fontFamily: "Playfair Display, serif" }}>
                <span style={{ color: gold }}>Á</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>
              Criando convites digitais únicos para momentos inesquecíveis.
            </p>
            <button className="mt-4 w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:border-[#B8952A]" style={{ borderColor: "#444" }}>
              <Instagram size={16} style={{ color: "#888" }} />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: goldLight, fontFamily: "Inter, sans-serif" }}>Produto</p>
            {["Templates", "Como Funciona", "Preços"].map((item) => (
              <button key={item} onClick={() => item === "Templates" && onNavigate("gallery")} className="block text-sm mb-2 text-left hover:text-white transition-colors" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>
                {item}
              </button>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: goldLight, fontFamily: "Inter, sans-serif" }}>Eventos</p>
            {["Casamentos", "Aniversários", "Formaturas", "Chá de Bebê"].map((item) => (
              <p key={item} className="text-sm mb-2" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>{item}</p>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: goldLight, fontFamily: "Inter, sans-serif" }}>Legal</p>
            {["Política de Privacidade", "Termos de Uso"].map((item) => (
              <p key={item} className="text-sm mb-2" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>{item}</p>
            ))}
          </div>
        </div>
        <div className="border-t flex flex-col md:flex-row items-center justify-between pt-6 gap-2" style={{ borderColor: "#333" }}>
          <p className="text-xs" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>© 2026 Áurea Events. Todos os direitos reservados.</p>
          <p className="text-xs" style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>Feito com <span style={{ color: "#e74c3c" }}>♥</span> para momentos especiais</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ tpl, onUse, recommended }: { tpl: typeof templates[0]; onUse: () => void; recommended?: boolean }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg cursor-pointer relative"
      style={{ borderColor: recommended ? gold : "#e8e6e2", boxShadow: recommended ? `0 0 0 2px ${gold}20` : "none" }}
    >
      {recommended && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white" style={{ background: gold }}>
          <Sparkles size={10} /> Ideal para você
        </div>
      )}
      <div className={`relative h-52 bg-gradient-to-br ${tpl.gradient} flex items-end`}>
        <div className={`absolute inset-0 bg-gradient-to-t ${tpl.accent} to-transparent`} />
        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-white font-medium" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
          {tpl.category}
        </span>
        <div className="relative px-5 pb-4">
          <p className="text-white text-xl leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            {tpl.title.split(" ").slice(0, 2).join(" ")}
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>{tpl.title}</h4>
          <span className="text-sm font-semibold flex-shrink-0" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>{tpl.price}</span>
        </div>
        <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>{tpl.description}</p>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm border transition-colors hover:bg-[#f5f5f5]" style={{ borderColor: "#ccc", color: "#333", fontFamily: "Inter, sans-serif" }}>
            <Eye size={14} /> Visualizar
          </button>
          <button onClick={onUse} className="flex-1 py-2.5 rounded-full text-sm text-white font-medium transition-opacity hover:opacity-90" style={{ background: gold, fontFamily: "Inter, sans-serif" }}>
            Usar template
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: Home ───────────────────────────────────────────────────────────
function HomeScreen({
  onNavigate,
  showWizard,
  setShowWizard,
  wizardAnswers,
  setWizardAnswers,
}: {
  onNavigate: (s: Screen) => void;
  showWizard: boolean;
  setShowWizard: (v: boolean) => void;
  wizardAnswers: WizardAnswers | null;
  setWizardAnswers: (a: WizardAnswers) => void;
}) {
  const [heroHint, setHeroHint] = useState(true);

  const handleWizardComplete = (answers: WizardAnswers) => {
    setWizardAnswers(answers);
    setShowWizard(false);
    onNavigate("gallery");
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      {showWizard && (
        <WizardModal
          onComplete={handleWizardComplete}
          onSkip={() => setShowWizard(false)}
        />
      )}

      <Navbar onNavigate={onNavigate} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">

            {/* DCC Hint: first-visit guide */}
            {heroHint && (
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl mb-6 text-left"
                style={{ background: "#FFF8E7", border: `1px solid ${goldLight}40` }}
              >
                <MessageCircle size={14} style={{ color: gold, flexShrink: 0 }} />
                <span className="text-xs" style={{ color: "#5a4a1a", fontFamily: "Inter, sans-serif" }}>
                  Não sabe por onde começar?{" "}
                  <button onClick={() => setShowWizard(true)} className="font-semibold underline" style={{ color: gold }}>
                    Responda 3 perguntas
                  </button>{" "}
                  e indicamos o template ideal.
                </span>
                <button onClick={() => setHeroHint(false)} className="text-[#bbb] hover:text-[#888] transition-colors ml-1">
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-8 border" style={{ borderColor: "#e0ddd6" }}>
              <Star size={14} fill={gold} style={{ color: gold }} />
              <span className="text-sm" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Mais de 5.000 eventos criados</span>
            </div>

            <h1 className="text-5xl lg:text-6xl leading-tight mb-2" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>
              O site do seu evento,
            </h1>
            <h2 className="text-4xl lg:text-5xl leading-tight mb-6 italic" style={{ fontFamily: "Playfair Display, serif", color: goldLight, fontWeight: 400 }}>
              pronto em minutos
            </h2>

            <p className="text-base max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
              Crie um convite digital elegante com link para compartilhar e um painel completo para gerenciar a confirmação de presença — tudo em um só lugar.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {[
                { icon: <Smartphone size={14} />, text: "Funciona no celular", tip: "Seu convite abre perfeitamente em qualquer dispositivo, sem precisar instalar nada." },
                { icon: <Clock size={14} />, text: "Pronto em 15 minutos", tip: "Escolha um template, personalize com seus dados e compartilhe. É só isso." },
                { icon: <Bell size={14} />, text: "Confirmações em tempo real", tip: "Receba uma notificação a cada RSVP dos seus convidados." },
              ].map(({ icon, text, tip }) => (
                <DCCTooltip key={text} text={tip}>
                  <div className="flex items-center gap-1.5 text-xs cursor-help" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                    <span style={{ color: gold }}>{icon}</span>
                    {text}
                    <HelpCircle size={11} style={{ color: "#ccc" }} />
                  </div>
                </DCCTooltip>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium transition-opacity hover:opacity-90"
                style={{ background: gold, fontFamily: "Inter, sans-serif" }}
              >
                <Sparkles size={16} /> Encontrar meu template
              </button>
              <button
                onClick={() => onNavigate("gallery")}
                className="px-7 py-3.5 rounded-full font-medium border transition-colors hover:bg-[#333] hover:text-white"
                style={{ borderColor: "#333", color: "#333", fontFamily: "Inter, sans-serif" }}
              >
                Ver todos os templates
              </button>
            </div>
          </div>

          {/* Smartphone mockup */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div
                className="w-64 h-[480px] rounded-[36px] border-4 overflow-hidden relative shadow-2xl"
                style={{ borderColor: dark, background: "#2a2620" }}
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-10 flex items-center justify-between px-4" style={{ background: "rgba(0,0,0,0.6)" }}>
                    <span className="text-xs font-semibold" style={{ color: gold, fontFamily: "Playfair Display, serif" }}>A&P</span>
                    <span className="text-xs text-white px-2 py-0.5 rounded" style={{ background: gold, fontSize: "9px" }}>CONFIRMAR</span>
                  </div>
                  <div
                    className="flex-1 flex flex-col items-center justify-end pb-8"
                    style={{ backgroundImage: "radial-gradient(ellipse at 50% 30%, #4a3520 0%, #1a1410 70%)" }}
                  >
                    <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: gold, background: "rgba(184,149,42,0.1)" }}>
                      <span style={{ fontFamily: "Playfair Display, serif", color: gold, fontSize: "22px" }}>A&P</span>
                    </div>
                    <p className="text-white text-2xl mb-1" style={{ fontFamily: "Playfair Display, serif" }}>Ana & Pedro</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>15 de Novembro · São Paulo</p>
                  </div>
                </div>
              </div>

              {/* Floating notification 1 */}
              <div className="absolute -left-36 top-20 w-48 bg-white rounded-2xl p-3 shadow-xl" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#e8f5e9" }}>
                    <Check size={12} style={{ color: "#2e7d32" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Nova confirmação</p>
                    <p className="text-xs mt-0.5" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Carolina confirmou presença</p>
                  </div>
                </div>
              </div>

              {/* Floating notification 2 */}
              <div className="absolute -right-32 bottom-28 w-44 bg-white rounded-2xl p-3 shadow-xl" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#fff8e1" }}>
                    <Star size={12} fill={gold} style={{ color: gold }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Personalize</p>
                    <p className="text-xs mt-0.5" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Cores e textos em tempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: goldLight, fontFamily: "Inter, sans-serif", letterSpacing: "2px" }}>Por que a Áurea?</p>
            <h2 className="text-4xl leading-tight" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>
              Muito mais do que um convite bonito
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Globe size={22} style={{ color: gold }} />, title: "Site de evento completo", desc: "Seu convite é um site real, acessível em qualquer celular ou computador — não é só uma imagem ou PDF.", titleColor: "#333" },
              { icon: <Users size={22} style={{ color: gold }} />, title: "Confirmações e acompanhantes", desc: "Cada convidado informa se vai comparecer, quantos acompanhantes leva e pode deixar um recado.", titleColor: gold },
              { icon: <Bell size={22} style={{ color: gold }} />, title: "Avisos em tempo real", desc: "Você recebe uma notificação a cada confirmação. E pode enviar lembretes diretamente para os convidados.", titleColor: gold },
              { icon: <CreditCard size={22} style={{ color: gold }} />, title: "Pagamento único, sem assinatura", desc: "Pague uma vez e tenha seu convite ativo de 6 a 12 meses, dependendo do plano. Sem surpresas.", titleColor: "#333" },
            ].map(({ icon, title, desc, titleColor }) => (
              <div key={title} className="rounded-2xl p-7" style={{ background: "#F7F5F1" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: "#ede9e0" }}>{icon}</div>
                <h4 className="text-base font-semibold mb-3 leading-snug" style={{ color: titleColor, fontFamily: "Inter, sans-serif" }}>{title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates destaque */}
      <section className="py-20 px-6" style={{ background: "#F5F4F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-medium uppercase mb-2" style={{ color: goldLight, fontFamily: "Inter, sans-serif", letterSpacing: "2px" }}>INSPIRAÇÕES</p>
              <h2 className="text-4xl" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>Templates em destaque</h2>
            </div>
            <button onClick={() => onNavigate("gallery")} className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.slice(0, 3).map((tpl) => (
              <TemplateCard key={tpl.id} tpl={tpl} onUse={() => onNavigate("editor")} />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── Screen 2: Gallery ────────────────────────────────────────────────────────
function GalleryScreen({
  onNavigate,
  wizardAnswers,
  setWizardAnswers,
}: {
  onNavigate: (s: Screen) => void;
  wizardAnswers: WizardAnswers | null;
  setWizardAnswers: (a: WizardAnswers) => void;
}) {
  const [activeCategory, setActiveCategory] = useState(wizardAnswers?.eventType && wizardAnswers.eventType !== "Outro" ? wizardAnswers.eventType : "Todos");
  const [search, setSearch] = useState("");
  const [showWizard, setShowWizard] = useState(false);
  const [filterHint, setFilterHint] = useState(!wizardAnswers);

  const handleWizardComplete = (answers: WizardAnswers) => {
    setWizardAnswers(answers);
    setShowWizard(false);
    if (answers.eventType !== "Outro") setActiveCategory(answers.eventType);
    setFilterHint(false);
  };

  const filtered = templates.filter((t) => {
    const matchesCat = activeCategory === "Todos" || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getRecommended = (tpl: typeof templates[0]) => {
    if (!wizardAnswers) return false;
    return (
      (wizardAnswers.eventType === "Outro" || tpl.category === wizardAnswers.eventType) &&
      tpl.style === wizardAnswers.style
    );
  };

  const sorted = wizardAnswers
    ? [...filtered].sort((a, b) => (getRecommended(b) ? 1 : 0) - (getRecommended(a) ? 1 : 0))
    : filtered;

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      {showWizard && (
        <WizardModal onComplete={handleWizardComplete} onSkip={() => setShowWizard(false)} />
      )}
      <Navbar onNavigate={onNavigate} />

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase mb-2" style={{ color: goldLight, fontFamily: "Inter, sans-serif", letterSpacing: "2px" }}>COLEÇÃO</p>
          <h1 className="text-5xl mb-4" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>Escolha seu template</h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
            Templates elegantes para cada tipo de evento. Personalize cores, textos e imagens com facilidade.
          </p>
        </div>

        {/* DCC: Wizard banner when no answers */}
        {filterHint && (
          <HintBanner
            icon={<Sparkles size={16} />}
            text="Não sabe qual template escolher? Responda 3 perguntas rápidas e indicamos os melhores para o seu evento."
            action="Ajuda para escolher"
            onAction={() => setShowWizard(true)}
            onDismiss={() => setFilterHint(false)}
          />
        )}

        {/* Recommendation summary */}
        {wizardAnswers && (
          <RecommendationBanner
            answers={wizardAnswers}
            count={sorted.filter(getRecommended).length || sorted.length}
          />
        )}

        {/* Re-run wizard */}
        {wizardAnswers && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
              style={{ color: gold, fontFamily: "Inter, sans-serif" }}
            >
              <Sparkles size={12} /> Refazer perguntas
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: activeCategory === cat ? dark : "white",
                color: activeCategory === cat ? "white" : "#333",
                border: activeCategory === cat ? "none" : "1px solid #ccc",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + sort */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#999" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, categoria ou descrição..."
              className="w-full pl-10 pr-4 py-3 rounded-full text-sm bg-white outline-none"
              style={{ border: "1px solid #ccc", fontFamily: "Inter, sans-serif", color: "#333" }}
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white rounded-full text-sm border" style={{ borderColor: "#ccc", color: "#333", fontFamily: "Inter, sans-serif" }}>
            Mais destaque <ChevronDown size={14} />
          </button>
        </div>

        {/* DCC: Empty state with action */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#F7F5F1" }}>
              <Search size={22} style={{ color: "#ccc" }} />
            </div>
            <p className="text-base font-semibold mb-2" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Nenhum template encontrado</p>
            <p className="text-sm mb-4" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Tente mudar os filtros ou buscar por outro termo.</p>
            <button onClick={() => { setActiveCategory("Todos"); setSearch(""); }} className="text-sm underline" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((tpl) => (
              <TemplateCard key={tpl.id} tpl={tpl} onUse={() => onNavigate("editor")} recommended={getRecommended(tpl)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 3: Editor ─────────────────────────────────────────────────────────
function EditorScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<"conteudo" | "aparencia">("conteudo");
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [eventName, setEventName] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [linkHint, setLinkHint] = useState(false);
  const [contextualTip, setContextualTip] = useState(true);
  const [exitIntent, setExitIntent] = useState(false);

  const canContinue = eventName && eventLink && person1 && person2;
  const filledCount = [eventName, eventLink, person1, person2].filter(Boolean).length;
  const progress = (filledCount / 4) * 100;

  // Auto-generate link from event name
  const handleEventName = (v: string) => {
    setEventName(v);
    if (!eventLink || linkHint) {
      const slug = v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 30);
      setEventLink(slug);
      if (v.length > 3) setLinkHint(true);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#F5F4F0" }}>
      {/* Exit intent dialog */}
      {exitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(26,24,20,0.6)", backdropFilter: "blur(2px)" }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: "#FFF8E7" }}>
              <Lightbulb size={22} style={{ color: gold }} />
            </div>
            <h3 className="text-xl text-center mb-2" style={{ fontFamily: "Playfair Display, serif", color: dark }}>
              Quer mesmo sair?
            </h3>
            <p className="text-sm text-center mb-6" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
              Seu progresso no editor será perdido. Você pode salvar um rascunho antes de sair.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setExitIntent(false)}
                className="flex-1 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-[#f5f5f5]"
                style={{ borderColor: "#ccc", color: "#333", fontFamily: "Inter, sans-serif" }}
              >
                Continuar editando
              </button>
              <button
                onClick={() => { setExitIntent(false); onNavigate("gallery"); }}
                className="flex-1 py-3 rounded-full text-sm font-medium text-white"
                style={{ background: "#999", fontFamily: "Inter, sans-serif" }}
              >
                Sair mesmo assim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b flex-shrink-0" style={{ borderColor: "#e8e6e2" }}>
        <button
          onClick={() => filledCount > 0 ? setExitIntent(true) : onNavigate("gallery")}
          className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#333]"
          style={{ color: "#666", fontFamily: "Inter, sans-serif" }}
        >
          ← Voltar
        </button>
        <div className="text-center">
          <span className="text-sm font-medium block" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
            Editor — Casamento Editorial
          </span>
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 h-1 rounded-full" style={{ background: "#f0ede6" }}>
              <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: gold }} />
            </div>
            <span className="text-xs" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>{filledCount}/4 campos</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: "#e0ddd6" }}>
            {[
              { key: "mobile" as const, Icon: Smartphone },
              { key: "tablet" as const, Icon: Tablet },
              { key: "desktop" as const, Icon: Monitor },
            ].map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setDevice(key)}
                className="p-2 transition-all"
                style={{
                  background: device === key ? "#F5F4F0" : "white",
                  borderRight: key !== "desktop" ? "1px solid #e0ddd6" : "none",
                  color: device === key ? gold : "#999",
                }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <DCCTooltip text={canContinue ? "Tudo pronto! Avance para escolher o plano." : "Preencha todos os campos obrigatórios para continuar."}>
            <button
              onClick={() => canContinue && onNavigate("checkout")}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity"
              style={{
                background: canContinue ? gold : goldLight,
                opacity: canContinue ? 1 : 0.5,
                fontFamily: "Inter, sans-serif",
                cursor: canContinue ? "pointer" : "not-allowed",
              }}
            >
              Continuar →
            </button>
          </DCCTooltip>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-80 flex-shrink-0 bg-white border-r overflow-y-auto" style={{ borderColor: "#e8e6e2" }}>
          {/* Contextual tip */}
          {contextualTip && (
            <div className="m-4 flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "#FFF8E7", border: `1px solid ${goldLight}30` }}>
              <Lightbulb size={14} style={{ color: gold, flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs flex-1" style={{ color: "#5a4a1a", fontFamily: "Inter, sans-serif" }}>
                Preencha o nome do evento e os campos com <span style={{ color: gold }}>*</span> para liberar o botão Continuar.
              </p>
              <button onClick={() => setContextualTip(false)} className="text-[#ccc] hover:text-[#999]"><X size={12} /></button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "#e8e6e2" }}>
            {(["conteudo", "aparencia"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3.5 text-sm font-medium capitalize transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: activeTab === tab ? gold : "#999",
                  borderBottom: activeTab === tab ? `2px solid ${gold}` : "2px solid transparent",
                }}
              >
                {tab === "conteudo" ? "Conteúdo" : "Aparência"}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-5">
            {/* Event name with live auto-slug */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                Nome do Evento <span style={{ color: gold }}>*</span>
              </label>
              <input
                value={eventName}
                onChange={(e) => handleEventName(e.target.value)}
                placeholder="Ex: Casamento da Ana & Pedro"
                className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{
                  border: `1px solid ${eventName ? gold : "#ccc"}`,
                  fontFamily: "Inter, sans-serif",
                  color: "#333",
                  background: "white",
                }}
              />
              <p className="text-xs mt-1" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
                Usado nos e-mails e compartilhamentos do convite.
              </p>
            </div>

            {/* Link with auto-generation hint */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                Link do convite <span style={{ color: gold }}>*</span>
              </label>
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${eventLink ? gold : "#ccc"}` }}>
                <span className="px-3 py-2.5 text-xs bg-[#f5f5f5] border-r text-[#999]" style={{ borderColor: "#ccc", fontFamily: "Inter, sans-serif" }}>//</span>
                <input
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm outline-none"
                  style={{ fontFamily: "Inter, sans-serif", color: "#333" }}
                />
              </div>
              {linkHint && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>
                  <Sparkles size={10} /> Link gerado automaticamente. Você pode editar.
                </p>
              )}
            </div>

            {/* Cover upload */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                Imagem de Capa
              </label>
              <div
                className="rounded-xl flex flex-col items-center justify-center py-6 cursor-pointer transition-colors hover:bg-[#f0ede6]"
                style={{ border: "2px dashed #ccc", background: "#faf9f6" }}
              >
                <Upload size={20} style={{ color: "#999" }} />
                <p className="text-xs mt-2" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Clique para substituir</p>
                <p className="text-xs" style={{ color: "#bbb", fontFamily: "Inter, sans-serif" }}>PNG, JPG ou WEBP · até 5MB</p>
              </div>
            </div>

            {/* Person 1 */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                Nome — Pessoa 1 <span style={{ color: gold }}>*</span>
              </label>
              <input
                value={person1}
                onChange={(e) => setPerson1(e.target.value)}
                placeholder="Ex: Ana"
                className="w-full px-3 py-2.5 text-sm rounded-lg outline-none"
                style={{ border: `1px solid ${person1 ? gold : "#ccc"}`, fontFamily: "Inter, sans-serif", color: "#333" }}
              />
            </div>

            {/* Photo 1 */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Foto — Pessoa 1</label>
              <div
                className="rounded-xl flex flex-col items-center justify-center py-5 cursor-pointer hover:bg-[#f0ede6] transition-colors"
                style={{ border: "2px dashed #ccc", background: "#faf9f6" }}
              >
                <Upload size={18} style={{ color: "#999" }} />
                <p className="text-xs mt-1.5" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>PNG, JPG ou WEBP · até 5MB</p>
              </div>
            </div>

            {/* Person 2 */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                Nome — Pessoa 2 <span style={{ color: gold }}>*</span>
              </label>
              <input
                value={person2}
                onChange={(e) => setPerson2(e.target.value)}
                placeholder="Ex: Pedro"
                className="w-full px-3 py-2.5 text-sm rounded-lg outline-none"
                style={{ border: `1px solid ${person2 ? gold : "#ccc"}`, fontFamily: "Inter, sans-serif", color: "#333" }}
              />
            </div>

            {/* DCC: completion nudge */}
            {!canContinue && filledCount > 0 && (
              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "#f0f8ff", border: "1px solid #b3d9ff" }}>
                <Info size={13} style={{ color: "#2196f3", flexShrink: 0, marginTop: 1 }} />
                <p className="text-xs" style={{ color: "#1565c0", fontFamily: "Inter, sans-serif" }}>
                  Falta{4 - filledCount === 1 ? "" : "m"} {4 - filledCount} campo{4 - filledCount !== 1 ? "s" : ""} para liberar o próximo passo.
                </p>
              </div>
            )}

            {canContinue && (
              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "#e8f5e9", border: "1px solid #a5d6a7" }}>
                <Check size={13} style={{ color: "#2e7d32", flexShrink: 0, marginTop: 1 }} />
                <p className="text-xs" style={{ color: "#1b5e20", fontFamily: "Inter, sans-serif" }}>
                  Tudo preenchido! Clique em <strong>Continuar →</strong> para escolher seu plano.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right panel: Preview */}
        <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: "#EAE8E3" }}>
          <p className="text-xs font-medium uppercase mb-5 tracking-widest" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
            PREVIEW — {device.toUpperCase()}
          </p>
          <div
            className="rounded-[36px] border-4 overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              borderColor: dark,
              width: device === "mobile" ? 240 : device === "tablet" ? 340 : 440,
              height: device === "mobile" ? 480 : device === "tablet" ? 540 : 320,
            }}
          >
            <div className="h-full flex flex-col" style={{ background: "#2a2414" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(0,0,0,0.5)" }}>
                <span className="text-base font-semibold" style={{ color: gold, fontFamily: "Playfair Display, serif" }}>
                  {person1 ? person1[0] : "A"}&{person2 ? person2[0] : "P"}
                </span>
                <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: gold, color: "white", fontFamily: "Inter, sans-serif" }}>
                  CONFIRMAR PRESENÇA
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center" style={{ backgroundImage: "radial-gradient(ellipse at 50% 30%, #4a3520 0%, #1a1410 70%)" }}>
                <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3" style={{ borderColor: gold, background: "rgba(184,149,42,0.1)" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", color: gold, fontSize: "16px" }}>
                    {person1 ? person1[0] : "A"}&{person2 ? person2[0] : "P"}
                  </span>
                </div>
                <p className="text-white text-lg mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
                  {person1 || "Ana"} & {person2 || "Pedro"}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
                  {eventName || "Nome do evento"} · 15 Nov
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate("invite")} className="mt-5 text-xs flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>
            <Eye size={13} /> Ver convite completo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Checkout ───────────────────────────────────────────────────────
function CheckoutScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [selectedPlan, setSelectedPlan] = useState<"essencial" | "exclusive">("exclusive");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [planHint, setPlanHint] = useState(true);
  const [step, setStep] = useState<"plano" | "dados" | "pagamento">("plano");

  const price = selectedPlan === "exclusive" ? "R$ 69,90" : "R$ 49,90";

  const validateEmail = (v: string) => {
    setEmail(v);
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setEmailError("Digite um e-mail válido para receber seu acesso.");
    } else {
      setEmailError("");
    }
  };

  const steps = ["plano", "dados", "pagamento"] as const;

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "#e8e6e2" }}>
        <button onClick={() => onNavigate("editor")} className="flex items-center gap-1.5 text-sm" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
          ← Voltar ao editor
        </button>
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: step === s ? gold : steps.indexOf(step) > i ? "#2e7d32" : "#ccc", fontFamily: "Inter, sans-serif" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: steps.indexOf(step) > i ? "#e8f5e9" : step === s ? gold : "#eee",
                    color: steps.indexOf(step) > i ? "#2e7d32" : step === s ? "white" : "#ccc",
                  }}
                >
                  {steps.indexOf(step) > i ? <Check size={11} /> : i + 1}
                </div>
                <span className="hidden md:inline capitalize">{s === "plano" ? "Plano" : s === "dados" ? "Dados" : "Pagamento"}</span>
              </div>
              {i < steps.length - 1 && <div className="w-8 h-px" style={{ background: "#e0ddd6" }} />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-sm" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
          <Lock size={14} style={{ color: gold }} /> Pagamento seguro
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-4xl mb-2" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>Finalizar pedido</h1>
            <p className="text-base mb-8" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Escolha o plano e a forma de pagamento</p>

            {/* DCC: Plan selection hint */}
            {planHint && (
              <HintBanner
                icon={<Lightbulb size={15} />}
                text="Para eventos com mais de 100 convidados, o plano Exclusive oferece confirmações ilimitadas e notificações automáticas — muito mais tranquilidade no grande dia."
                onDismiss={() => setPlanHint(false)}
              />
            )}

            {/* Plans */}
            <div className="mb-7">
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#666", fontFamily: "Inter, sans-serif", letterSpacing: "1.5px" }}>PLANO</p>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Essencial */}
                <div
                  className="flex-1 rounded-2xl p-5 cursor-pointer transition-all"
                  style={{ border: selectedPlan === "essencial" ? `1.5px solid ${gold}` : "1.5px solid #ccc", background: "white" }}
                  onClick={() => { setSelectedPlan("essencial"); setStep("plano"); }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Essencial</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Ideal para celebrar com elegância</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: selectedPlan === "essencial" ? gold : "#ccc", background: selectedPlan === "essencial" ? gold : "white" }}>
                      {selectedPlan === "essencial" && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-xl font-semibold mb-4" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>R$ 49,90 <span className="text-xs font-normal text-[#999]">único</span></p>
                  <div className="space-y-1.5">
                    {["1 convite digital premium", "Personalização completa", "Link ativo por 6 meses", "Confirmações limitadas"].map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                        <Check size={12} style={{ color: "#999" }} /> {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusive */}
                <div
                  className="flex-1 rounded-2xl p-5 cursor-pointer transition-all relative"
                  style={{ border: selectedPlan === "exclusive" ? `1.5px solid ${gold}` : "1.5px solid #ccc", background: "white" }}
                  onClick={() => { setSelectedPlan("exclusive"); setStep("plano"); }}
                >
                  <span className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full font-medium text-white" style={{ background: gold, fontFamily: "Inter, sans-serif" }}>Recomendado</span>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Exclusive</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Uma experiência completa para eventos especiais</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: selectedPlan === "exclusive" ? gold : "#ccc", background: selectedPlan === "exclusive" ? gold : "white" }}>
                      {selectedPlan === "exclusive" && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-xl font-semibold mb-4" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>R$ 69,90 <span className="text-xs font-normal text-[#999]">único</span></p>
                  <div className="space-y-1.5">
                    {["1 convite digital premium", "Personalização completa", "Link ativo por 12 meses", "Confirmações ilimitadas", "Notificações em tempo real", "Avisos e atualizações aos convidados", "Suporte Prioritário"].map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                        <Check size={12} style={{ color: gold }} /> {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "#666", fontFamily: "Inter, sans-serif", letterSpacing: "1.5px" }}>SEU E-MAIL</p>
              <p className="text-xs mb-2" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Para acessar seu convite depois <span style={{ color: gold }}>*</span></p>
              <input
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ border: `1px solid ${emailError ? "#d4183d" : email && !emailError ? gold : "#ccc"}`, fontFamily: "Inter, sans-serif", color: "#333", background: "white" }}
              />
              {emailError && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#d4183d", fontFamily: "Inter, sans-serif" }}>
                  <X size={11} /> {emailError}
                </p>
              )}
            </div>

            {/* Coupon */}
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "#666", fontFamily: "Inter, sans-serif", letterSpacing: "1.5px" }}>CUPOM DE DESCONTO</p>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Código do cupom"
                  className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid #ccc", fontFamily: "Inter, sans-serif", color: "#333", background: "white" }}
                />
                <button className="px-5 py-3 rounded-lg text-sm text-white font-medium" style={{ background: goldLight, fontFamily: "Inter, sans-serif" }}>Aplicar</button>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#666", fontFamily: "Inter, sans-serif", letterSpacing: "1.5px" }}>FORMA DE PAGAMENTO</p>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ border: `1.5px solid ${gold}`, background: "white" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#e8f5e9" }}>
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Pix</p>
                    <p className="text-xs" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Aprovação imediata</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: gold }}>
                  <Check size={13} className="text-white" />
                </div>
              </div>
            </div>

            {/* DCC: Reassurance before submit */}
            <div className="flex items-start gap-2 p-4 rounded-xl mb-5" style={{ background: "#F7F5F1" }}>
              <Lock size={14} style={{ color: gold, flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs leading-relaxed" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                Pagamento 100% seguro. Você tem <strong>7 dias de garantia</strong> — se não ficar satisfeito, devolvemos o valor integralmente, sem perguntas.
              </p>
            </div>

            <button
              className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
              style={{ background: gold, fontFamily: "Inter, sans-serif", opacity: (!email || emailError) ? 0.6 : 1, cursor: (!email || emailError) ? "not-allowed" : "pointer" }}
            >
              Finalizar compra — {price}
            </button>
          </div>

          {/* Summary sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 sticky top-8" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Resumo do pedido</h3>
              <div className="w-full h-36 rounded-xl mb-4 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 flex items-center justify-center">
                <span style={{ fontFamily: "Playfair Display, serif", color: gold, fontSize: "20px" }}>Casamento Editorial</span>
              </div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>CONVITE PARA</p>
              <p className="text-sm font-semibold mb-4" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Casamento da Ana & Pedro</p>
              <div className="border-t pt-4" style={{ borderColor: "#eee" }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Plano {selectedPlan === "exclusive" ? "Exclusive" : "Essencial"}</span>
                  <span style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>{price}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Taxa de serviço</span>
                  <span style={{ color: "#2e7d32", fontFamily: "Inter, sans-serif" }}>Grátis</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between items-center mb-5" style={{ borderColor: "#eee" }}>
                <span className="font-semibold" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Total</span>
                <span className="text-xl font-bold" style={{ color: gold, fontFamily: "Inter, sans-serif" }}>{price}</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: <Check size={12} />, text: "Confirmações incluídas" },
                  { icon: <ArrowRight size={12} />, text: "Link personalizado compartilhável" },
                  { icon: <Clock size={12} />, text: "Garantia de 7 dias" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
                    <span style={{ color: gold }}>{icon}</span> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Digital Invite ─────────────────────────────────────────────────
function InviteScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("0");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const countdown = { dias: 174, horas: 12, minutos: 35, segundos: 48 };

  const handleConfirm = () => {
    if (!name.trim()) { setNameError(true); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setConfirmed(true); }, 1200);
  };

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #2a1f0e 0%, #1a1410 40%, #0f0c08 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(184,149,42,0.08) 0%, transparent 60%)" }} />
        <nav className="relative z-10 flex items-center justify-between px-8 py-5">
          <span className="text-2xl" style={{ fontFamily: "Playfair Display, serif", color: gold }}>A&P</span>
          <button
            onClick={() => document.getElementById("confirm-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2 rounded text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            style={{ background: gold, fontFamily: "Inter, sans-serif", letterSpacing: "1px" }}
          >
            CONFIRMAR PRESENÇA
          </button>
        </nav>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
          <p className="text-xs uppercase tracking-widest mb-6 text-white/60" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "3px" }}>CONVITE DIGITAL</p>
          <h1 className="text-6xl md:text-7xl text-white mb-4 leading-tight" style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}>Ana & Pedro</h1>
          <p className="text-base text-white/70 mb-12" style={{ fontFamily: "Inter, sans-serif" }}>15 de Novembro · Espaço Jardim das Flores</p>
          <div className="flex gap-8">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-semibold text-white mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{String(value).padStart(2, "0")}</div>
                <div className="text-xs uppercase" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "1.5px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex justify-center pb-8 animate-bounce">
          <ChevronDown size={24} style={{ color: "rgba(255,255,255,0.3)" }} />
        </div>
      </div>

      {/* Confirmation form */}
      <section id="confirm-section" className="py-20 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-3" style={{ fontFamily: "Playfair Display, serif", color: dark, fontWeight: 400 }}>Confirme sua presença</h2>
            <p className="text-sm" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>Sua presença é muito importante para nós.</p>
          </div>

          {confirmed ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#e8f5e9" }}>
                <Check size={28} style={{ color: "#2e7d32" }} />
              </div>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif", color: dark }}>Presença confirmada!</h3>
              <p className="text-sm" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Obrigado, {name}! Até lá. 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                  Seu nome completo <span style={{ color: gold }}>*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setNameError(false); }}
                  placeholder="Ex: Carolina Silva"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ border: `1px solid ${nameError ? "#d4183d" : name ? gold : "#ccc"}`, fontFamily: "Inter, sans-serif", color: "#333" }}
                />
                {nameError && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#d4183d", fontFamily: "Inter, sans-serif" }}>
                    <X size={11} /> Por favor, informe seu nome para confirmar a presença.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>Quantos acompanhantes?</label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none appearance-none"
                    style={{ border: "1px solid #ccc", fontFamily: "Inter, sans-serif", color: "#333", background: "white" }}
                  >
                    {["0", "1", "2", "3", "4", "5+"].map((n) => (
                      <option key={n} value={n}>{n === "0" ? "Somente eu" : `${n} acompanhante${n === "1" ? "" : "s"}`}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#999" }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#333", fontFamily: "Inter, sans-serif" }}>
                  Deixe um recado <span style={{ color: "#999" }}>(opcional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva uma mensagem para os noivos..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                  style={{ border: "1px solid #ccc", fontFamily: "Inter, sans-serif", color: "#333" }}
                />
              </div>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-4 rounded-full text-white font-semibold text-base transition-all"
                style={{ background: name ? gold : "#ccc", fontFamily: "Inter, sans-serif", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.8 : 1 }}
              >
                {loading ? "Confirmando..." : "Confirmar presença"}
              </button>

              {/* DCC: Reassurance for guest */}
              <p className="text-xs text-center" style={{ color: "#bbb", fontFamily: "Inter, sans-serif" }}>
                Seus dados são usados apenas para confirmação do evento e não serão compartilhados.
              </p>
            </div>
          )}

          <div className="text-center mt-8">
            <button onClick={() => onNavigate("home")} className="text-xs transition-opacity hover:opacity-70" style={{ color: "#999", fontFamily: "Inter, sans-serif" }}>
              ← Voltar ao início
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [showWizard, setShowWizard] = useState(true);
  const [wizardAnswers, setWizardAnswers] = useState<WizardAnswers | null>(null);

  const navigate = (s: Screen) => {
    setScreen(s);
    const root = document.getElementById("scroll-root");
    if (root) root.scrollTop = 0;
  };

  return (
    <div id="scroll-root" className="h-screen overflow-y-auto" style={{ fontFamily: "Inter, sans-serif" }}>
      {screen === "home" && (
        <HomeScreen
          onNavigate={navigate}
          showWizard={showWizard}
          setShowWizard={setShowWizard}
          wizardAnswers={wizardAnswers}
          setWizardAnswers={setWizardAnswers}
        />
      )}
      {screen === "gallery" && (
        <GalleryScreen
          onNavigate={navigate}
          wizardAnswers={wizardAnswers}
          setWizardAnswers={setWizardAnswers}
        />
      )}
      {screen === "editor" && <EditorScreen onNavigate={navigate} />}
      {screen === "checkout" && <CheckoutScreen onNavigate={navigate} />}
      {screen === "invite" && <InviteScreen onNavigate={navigate} />}
    </div>
  );
}
