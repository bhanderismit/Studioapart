// Shared primitives for the Uni-Stays resident app.

// ─── Lucide icon ─────────────────────────────────────────────
function Icon({ name, size = 20, color, strokeWidth = 2, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide?.createIcons) {
      ref.current.innerHTML =
      `<i data-lucide="${name}" style="width:${size}px;height:${size}px;display:inline-flex;${
      color ? "color:" + color + ";" : ""}"></i>`;

      try {
        window.lucide.createIcons({
          attrs: { "stroke-width": strokeWidth, width: size, height: size }
        });
      } catch (e) {}
    }
  }, [name, size, color, strokeWidth]);
  return (
    <span
      ref={ref}
      style={{
        display: "inline-flex",
        lineHeight: 0,
        color: color || "currentColor",
        ...style
      }} />);


}

// ─── App-bar (under dynamic island) ──────────────────────────
function AppBar({ resident, theme, onToggleTheme, onBrandTap, daysLeft, stayDay, stayLength, unread, onOpenInbox }) {
  const [showStatus, setShowStatus] = React.useState(false);
  const prevUnread = React.useRef(unread);
  const [shake, setShake] = React.useState(false);
  React.useEffect(() => {
    if (unread > (prevUnread.current ?? 0)) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 1500);
      prevUnread.current = unread;
      return () => clearTimeout(t);
    }
    prevUnread.current = unread;
  }, [unread]);

  const handleBrandTap = () => {
    setShowStatus((s) => !s);
    onBrandTap?.();
    setTimeout(() => setShowStatus(false), 2400);
  };

  return (
    <div className="appbar">
      <button
        className={`brand brand-button ${showStatus ? "expanded" : ""}`}
        onClick={handleBrandTap}
        aria-label="Building status">

        <div className="mark">
          U
          <span className="mark-pulse" />
        </div>
        <div className="brand-text">
          {!showStatus ?
          <React.Fragment>
              <span className="b1">Uni-Stays</span>
              <span className="b2">{resident.building}</span>
            </React.Fragment> :

          <React.Fragment>
              <span className="b1">Day {stayDay} · {daysLeft} left</span>
              <span className="b2">Gym open · lounge busy</span>
            </React.Fragment>
          }
        </div>
      </button>
      <div className="actions">
        {onToggleTheme &&
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
        }
        {onOpenInbox &&
        <button
          className={`icon-btn ${unread > 0 && shake ? "has-unread" : ""}`}
          onClick={onOpenInbox}
          aria-label="Messages">

          <Icon name="message-circle" size={18} />
          {unread > 0 && <span className="badge">{unread > 9 ? "9+" : unread}</span>}
        </button>
        }
      </div>
    </div>);

}

// ─── Detail nav header ───────────────────────────────────────
function DetailBar({ title, onBack, solid = false, right = null }) {
  return (
    <div className={`detail-bar ${solid ? "solid" : ""}`}>
      <button className="back" onClick={onBack} aria-label="Back">
        <Icon name="arrow-left" size={18} />
      </button>
      <span className="ttl">{title}</span>
      <div style={{ width: 40 }}>{right}</div>
    </div>);

}

// ─── Tab bar with center quick-action ────────────────────────
function TabBar({ active, onChange, onQuickAction, unread = 0, language = "en" }) {
  const labels = {
    en: { home: "Home", hub: "Hub", quick: "Ask", facility: "Book", stay: "Stay" },
    de: { home: "Start", hub: "Hub", quick: "Frag", facility: "Buchen", stay: "Wohnen" },
    fr: { home: "Accueil", hub: "Hub", quick: "Demander", facility: "Réserver", stay: "Séjour" },
    es: { home: "Inicio", hub: "Hub", quick: "Pedir", facility: "Reservar", stay: "Estancia" },
    it: { home: "Casa", hub: "Hub", quick: "Chiedi", facility: "Prenota", stay: "Soggiorno" },
  };
  const L = labels[language] || labels.en;
  const items = [
  { k: "home", i: "home", l: L.home },
  { k: "hub", i: "wifi", l: L.hub },
  { k: "quick", i: "plus", l: L.quick, fab: true },
  { k: "facility", i: "calendar", l: L.facility },
  { k: "stay", i: "user-round", l: L.stay }];

  return (
    <nav className="tabbar">
      {items.map((it) =>
      it.fab ?
      <div
        key={it.k}
        className="tab fab"
        onClick={onQuickAction}
        aria-label="Quick actions">
        
            <div className="ring">
              <Icon name={it.i} size={24} strokeWidth={2.4} />
            </div>
            <span className="lbl">{it.l}</span>
          </div> :

      <div
        key={it.k}
        className={`tab ${active === it.k ? "on" : ""}`}
        onClick={() => onChange(it.k)}>
        
            <span className="tab-icon">
              <Icon
                name={it.i}
                size={20}
                strokeWidth={active === it.k ? 2.2 : 1.8} />
              {it.badge > 0 && <span className="tab-badge">{it.badge > 9 ? "9+" : it.badge}</span>}
            </span>
            <span className="lbl">{it.l}</span>
          </div>

      )}
    </nav>);

}

// ─── Bottom sheet ────────────────────────────────────────────
function Sheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab" />
        {children}
      </div>
    </React.Fragment>);

}

// ─── Toast ───────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast">
      <div className="ic">
        <Icon name={toast.icon || "check"} size={16} color="var(--us-navy-900)" strokeWidth={3} />
      </div>
      <div className="body">
        <div className="t">{toast.title}</div>
        {toast.body && <div className="s">{toast.body}</div>}
      </div>
    </div>);

}

// ─── Progress ring (for hero) ─────────────────────────────────
function ProgressRing({ value, max, size = 78, stroke = 6, color = "#ff7236", track = "rgba(255,255,255,0.12)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / max));
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.2, 0.7, 0.2, 1)" }} />
      
    </svg>);

}

// ─── Event card (motion-graphic backgrounds) ─────────────────
function EventCard({ event, onOpen, going = false, favorited = false, onToggleFav }) {
  return (
    <div className={`event ${event.kind}`} onClick={() => onOpen(event)}>
      <div className="bg" />
      {going &&
      <span className="going-pill">
          <Icon name="check" size={11} strokeWidth={3} /> Going
        </span>
      }
      {onToggleFav &&
      <button
        className={`fav-heart ${favorited ? "on" : ""}`}
        onClick={(e) => {e.stopPropagation();onToggleFav(event.id);}}
        aria-label="Favorite">

          <Icon name="heart" size={16} strokeWidth={favorited ? 0 : 2} style={favorited ? { fill: "currentColor" } : {}} />
        </button>
      }
      {event.kind === "lounge" && <div className="gfx-disc" />}
      {event.kind === "run" &&
      <div className="gfx-path">
          <svg className="line" viewBox="0 0 360 168" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rg" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(255,114,54,0.2)" />
                <stop offset="1" stopColor="rgba(255,114,54,0.6)" />
              </linearGradient>
            </defs>
            <path
            d="M 0 130 C 60 80, 140 180, 200 100 S 320 60, 360 120"
            fill="none"
            stroke="url(#rg)"
            strokeWidth="2"
            strokeDasharray="3 5" />
          
          </svg>
          <span className="dot" />
        </div>
      }
      {event.kind === "movie" &&
      <React.Fragment>
          <div className="gfx-spot" />
          <div className="gfx-film" />
        </React.Fragment>
      }
      {event.kind === "gym" &&
      <React.Fragment>
          <span className="gfx-dumbbell">F</span>
          <div className="gfx-reps">
            <span /><span /><span /><span /><span />
          </div>
        </React.Fragment>
      }
      {event.kind === "kitchen" &&
      <div className="gfx-steam">
          <span /><span /><span />
        </div>
      }
      <div className="grain" />
      <div className="pad">
        <span className="when">
          <Icon name="calendar" size={11} strokeWidth={2.4} /> {event.when}
        </span>
        <div className="t">{event.title}</div>
        <div className="foot">
          <div className="place">
            <Icon name="map-pin" size={11} /> {event.place}
          </div>
          <div className="going">
            <div className="a">M</div>
            <div className="a b">J</div>
            <div className="a c">C</div>
            <div className="a more">+{event.going - 3}</div>
          </div>
        </div>
      </div>
    </div>);

}

// ─── Pull-to-refresh tracker ─────────────────────────────────
function usePullToRefresh(onRefresh) {
  const ref = React.useRef(null);
  const [pull, setPull] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const startY = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onStart = (e) => {
      if (el.scrollTop <= 0) startY.current = e.touches?.[0]?.clientY ?? e.clientY;
    };
    const onMove = (e) => {
      if (startY.current === null || refreshing) return;
      const y = e.touches?.[0]?.clientY ?? e.clientY;
      const d = Math.min(120, Math.max(0, y - startY.current));
      setPull(d);
    };
    const onEnd = () => {
      if (pull > 70 && !refreshing) {
        setRefreshing(true);
        onRefresh?.(() => {
          setRefreshing(false);
          setPull(0);
        });
      } else {
        setPull(0);
      }
      startY.current = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mousedown", onStart);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseup", onEnd);
    el.addEventListener("mouseleave", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseup", onEnd);
      el.removeEventListener("mouseleave", onEnd);
    };
  }, [pull, refreshing, onRefresh]);

  return { ref, pull, refreshing };
}

// ─── Confetti burst ──────────────────────────────────────────
function Confetti() {
  const pieces = React.useMemo(() => {
    const cols = ["#ff7236", "#0e2233", "#ffd2bc", "#3a5f6b", "#ffffff", "#238823"];
    return Array.from({ length: 60 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.6 + Math.random() * 1.2,
      bg: cols[i % cols.length],
      rot: Math.random() * 360
    }));
  }, []);
  return (
    <div className="confetti">
      {pieces.map((p, i) =>
      <span
        key={i}
        style={{
          left: `${p.left}%`,
          background: p.bg,
          transform: `rotate(${p.rot}deg)`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`
        }} />

      )}
    </div>);

}

// ─── UpNext focal card ───────────────────────────────────────
// Surfaces the SINGLE next thing the user should care about right now.
// Priority: rent (if due in <7d) > next booking > next RSVP'd event > next public event > welcome.
function UpNext({ rent, reservations, events, going, daysLeft, onOpenRent, onOpenEvent, onCancelReservation, onOpenAllEvents }) {
  // Build candidates and pick winner
  const now = new Date();
  const nextRSVP = (events || []).find((e) => going?.[e.id]);
  const nextBooking = (reservations || [])[0];
  // "due in 16 days" — rent is due if state is "due"
  const rentDue = rent?.history?.some((h) => h.state === "due");
  const rentSoon = rentDue; // We don't have a date but data says due in 16 — show urgently when no RSVP

  const card = (() => {
    if (nextRSVP) return {
      kind: "event",
      tone: nextRSVP.kind,
      ek: "Up next",
      ekSub: "you're going",
      when: nextRSVP.when,
      title: nextRSVP.title,
      place: nextRSVP.place,
      meta: `${nextRSVP.going} going · ${nextRSVP.capacity - nextRSVP.going} spots left`,
      cta: { label: "See plan", onClick: () => onOpenEvent?.(nextRSVP) },
      ghost: { label: "Cancel", onClick: () => onOpenEvent?.(nextRSVP), icon: "x" },
      icon: "calendar-check",
    };
    if (nextBooking) return {
      kind: "booking",
      tone: "navy",
      ek: "Up next",
      ekSub: "your booking",
      when: `${nextBooking.dayLabel} · ${nextBooking.time}`,
      title: nextBooking.facility.name,
      place: nextBooking.facility.sub?.split(" · ")[0],
      meta: "Cancel up to 30 min before",
      cta: { label: "Get directions", onClick: () => {}, icon: "map-pin" },
      ghost: { label: "Cancel", onClick: () => onCancelReservation?.(nextBooking.id), icon: "x" },
      icon: nextBooking.facility.ic,
    };
    if (rentSoon) return {
      kind: "rent",
      tone: "warm",
      ek: "Up next",
      ekSub: "rent",
      when: "Due in 16 days",
      title: `December rent · €${rent.amount}`,
      place: "SEPA autopay armed",
      meta: "No action needed — we'll handle it",
      cta: { label: "Pay early", onClick: onOpenRent, icon: "credit-card" },
      ghost: { label: "Breakdown", onClick: onOpenRent, icon: "chevron-right" },
      icon: "credit-card",
    };
    return {
      kind: "events",
      tone: "warm",
      ek: "Up next",
      ekSub: "this week",
      when: "Open evening",
      title: "Browse what's on at Haslangstraße",
      place: `${(events || []).length} events queued`,
      meta: "Drop in, RSVP, or skip — all good",
      cta: { label: "See events", onClick: onOpenAllEvents, icon: "calendar" },
      icon: "calendar",
    };
  })();

  return (
    <div className={`upnext upnext-${card.tone}`} onClick={card.cta?.onClick}>
      <div className="upnext-ek">
        <span className="dot" /> {card.ek}
        {card.ekSub && <span className="upnext-ek-sub"> · {card.ekSub}</span>}
      </div>
      <div className="upnext-row">
        <div className="upnext-ic">
          <Icon name={card.icon} size={20} strokeWidth={2.2} />
        </div>
        <div className="upnext-body">
          <div className="upnext-when">{card.when}</div>
          <div className="upnext-title">{card.title}</div>
          <div className="upnext-place">
            <Icon name="map-pin" size={11} /> {card.place}
          </div>
        </div>
      </div>
      <div className="upnext-meta">{card.meta}</div>
      <div className="upnext-foot" onClick={(e) => e.stopPropagation()}>
        <button className="upnext-cta" onClick={card.cta?.onClick}>
          {card.cta?.icon && <Icon name={card.cta.icon} size={14} strokeWidth={2.4} />}
          {card.cta?.label}
        </button>
        {card.ghost && (
          <button className="upnext-ghost" onClick={card.ghost.onClick} aria-label={card.ghost.label}>
            {card.ghost.icon && <Icon name={card.ghost.icon} size={14} />}
            <span>{card.ghost.label}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Ask Magda — quick Claude-powered concierge ──────────────
function ConciergeAsk({ resident, onToast }) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const suggestions = [
    "When is rubbish collected?",
    "Quiet places to study nearby?",
    "What's a good cheap dinner?",
    "How do I report a leak?",
  ];

  const ask = async (text) => {
    const question = (text || q).trim();
    if (!question) return;
    setLoading(true);
    setAnswer("");
    setQ(question);
    try {
      const reply = await window.claude.complete({
        messages: [{
          role: "user",
          content: `You are Magda, the warm-but-direct building manager at Uni-Stays Haslangstraße 12 in Ingolstadt, Germany. The resident is ${resident?.firstName || "Lena"}, a student at Technische Hochschule Ingolstadt. Reply to their question in 2-3 short sentences, conversational tone, no formatting, sign off occasionally with "— Magda" but not always. If the question is about the building, answer as if you know it well. If it's about Ingolstadt, give honest local advice. Question: ${question}`,
        }],
      });
      setAnswer(reply || "Hmm, no signal — try again in a bit.");
    } catch (e) {
      setAnswer("I'm offline at the moment. Try the front desk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="concierge">
      <div className="concierge-head">
        <div className="concierge-av">
          <span>M</span>
        </div>
        <div className="concierge-meta">
          <div className="concierge-name">Magda · building manager</div>
          <div className="concierge-sub">
            <span className="dot" /> Usually replies in 30 min · live answers now
          </div>
        </div>
      </div>
      {answer && !loading && (
        <div className="concierge-bubble">{answer}</div>
      )}
      {loading && (
        <div className="concierge-bubble concierge-loading">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
      )}
      <div className="concierge-input">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
          placeholder="Ask anything about the building or Ingolstadt…"
        />
        <button className="concierge-send" onClick={() => ask()} disabled={!q.trim() || loading} aria-label="Send">
          <Icon name="send" size={14} strokeWidth={2.4} />
        </button>
      </div>
      <div className="concierge-chips">
        {suggestions.map((s) => (
          <button key={s} className="concierge-chip" onClick={() => ask(s)} disabled={loading}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, AppBar, DetailBar, TabBar, Sheet, Toast, ProgressRing, EventCard,
  usePullToRefresh, Confetti, UpNext, ConciergeAsk
});