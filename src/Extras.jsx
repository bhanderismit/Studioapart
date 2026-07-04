// Additional sheets and pushed screens.

// ─── Settings (pushed screen) ────────────────────────────────
function SettingsScreen({ prefs, onChange, onBack, theme, onSetTheme }) {
  const toggle = (k) => onChange({ ...prefs, [k]: !prefs[k] });

  return (
    <div className="screen screen-enter">
      <DetailBar title="Settings" onBack={onBack} />

      <div className="set-section">Appearance</div>
      <div className="settings-list">
        <div className="set-row">
          <div className="ic" style={{ background: "var(--us-mustard-100)", color: "var(--us-mustard-700)" }}>
            <Icon name={theme === "dark" ? "moon" : "sun"} size={16} />
          </div>
          <div className="body">
            <div className="l">Theme</div>
            <div className="s">Match the mood of your stay</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, padding: "0 16px 14px" }}>
          {[
          { v: "light", l: "Light", ic: "sun" },
          { v: "dark", l: "Dark", ic: "moon" },
          { v: "auto", l: "Auto", ic: "monitor" }].
          map((t) =>
          <button
            key={t.v}
            onClick={() => onSetTheme(t.v)}
            style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 4, padding: "10px 4px",
              borderRadius: 10,
              border: `1.5px solid ${theme === t.v ? "var(--us-mustard-500)" : "var(--us-border)"}`,
              background: theme === t.v ? "var(--us-mustard-100)" : "transparent",
              color: theme === t.v ? "var(--us-mustard-700)" : "var(--us-fg-muted)",
              fontFamily: "inherit", fontWeight: 600, fontSize: 11,
              cursor: "pointer", transition: "all 180ms"
            }}>
            
              <Icon name={t.ic} size={16} />
              {t.l}
            </button>
          )}
        </div>
      </div>

      <div className="set-section">Get a ping for</div>
      <div className="settings-list">
        <div className="set-row" onClick={() => toggle("events")}>
          <div className="ic"><Icon name="calendar" size={16} /></div>
          <div className="body">
            <div className="l">Events & community</div>
            <div className="s">Wine pours, movie nights, runs, dinners</div>
          </div>
          <button className={`switch ${prefs.events ? "on" : ""}`} aria-pressed={prefs.events} />
        </div>
        <div className="set-row" onClick={() => toggle("building")}>
          <div className="ic"><Icon name="building-2" size={16} /></div>
          <div className="body">
            <div className="l">Building updates</div>
            <div className="s">Hot water, lifts, deliveries</div>
          </div>
          <button className={`switch ${prefs.building ? "on" : ""}`} aria-pressed={prefs.building} />
        </div>
        <div className="set-row" onClick={() => toggle("rent")}>
          <div className="ic"><Icon name="credit-card" size={16} /></div>
          <div className="body">
            <div className="l">Rent reminders</div>
            <div className="s">7 / 3 / 1 days before charge</div>
          </div>
          <button className={`switch ${prefs.rent ? "on" : ""}`} aria-pressed={prefs.rent} />
        </div>
        <div className="set-row" onClick={() => toggle("chat")}>
          <div className="ic"><Icon name="message-circle" size={16} /></div>
          <div className="body">
            <div className="l">Direct messages</div>
            <div className="s">Magda, floor chat, mentions</div>
          </div>
          <button className={`switch ${prefs.chat ? "on" : ""}`} aria-pressed={prefs.chat} />
        </div>
        <div className="set-row" onClick={() => toggle("marketing")}>
          <div className="ic"><Icon name="megaphone" size={16} /></div>
          <div className="body">
            <div className="l">From Studioapart HQ</div>
            <div className="s">Other buildings, new openings</div>
          </div>
          <button className={`switch ${prefs.marketing ? "on" : ""}`} aria-pressed={prefs.marketing} />
        </div>
      </div>

      <div className="set-section">Quiet hours</div>
      <div className="settings-list">
        <div className="set-row" onClick={() => toggle("quiet")}>
          <div className="ic"><Icon name="moon" size={16} /></div>
          <div className="body">
            <div className="l">Do not disturb</div>
            <div className="s">{prefs.quiet ? "22:00 → 07:00 · weekdays" : "Off"}</div>
          </div>
          <button className={`switch ${prefs.quiet ? "on" : ""}`} aria-pressed={prefs.quiet} />
        </div>
      </div>

      <div className="set-section">Privacy</div>
      <div className="settings-list">
        <div className="set-row" onClick={() => toggle("showFloor")}>
          <div className="ic"><Icon name="users-round" size={16} /></div>
          <div className="body">
            <div className="l">Show me on the floor map</div>
            <div className="s">Other residents can see your unit</div>
          </div>
          <button className={`switch ${prefs.showFloor ? "on" : ""}`} aria-pressed={prefs.showFloor} />
        </div>
        <div className="set-row" onClick={() => toggle("eventsPublic")}>
          <div className="ic"><Icon name="eye" size={16} /></div>
          <div className="body">
            <div className="l">Show what I'm going to</div>
            <div className="s">Friends see your RSVPs on the event card</div>
          </div>
          <button className={`switch ${prefs.eventsPublic ? "on" : ""}`} aria-pressed={prefs.eventsPublic} />
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <button className="btn-primary dark" onClick={onBack}>
          <Icon name="check" size={16} /> Done
        </button>
      </div>
    </div>);

}

// ─── Resident Pass sheet (QR) ────────────────────────────────
function PassSheet({ resident, onClose }) {
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 18, color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em" }}>Show at the front desk</h2>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer"
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="qr-card">
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--us-mustard-300)" }}>Resident pass</div>
            <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 18, marginTop: 6 }}>{resident.firstName} {resident.lastName}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{resident.unit} · valid until {resident.moveOut}</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--us-mustard-500)", border: "1px solid rgba(255,114,54,0.5)", borderRadius: 999, padding: "4px 8px" }}>LIVE</div>
        </div>

        <div className="qr-art">
          <QRSvg seed="4B-2026-LV" />
        </div>

        <div style={{ position: "relative", textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>
          #4B-2026-LV · refreshes every 60 sec
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        <button className="btn-ghost">
          <Icon name="user-plus" size={14} /> Add guest
        </button>
        <button className="btn-ghost">
          <Icon name="share-2" size={14} /> Share
        </button>
      </div>
    </React.Fragment>);

}

// Deterministic-ish QR-like SVG (decorative)
function QRSvg({ seed = "x" }) {
  // 21×21 grid with finder patterns + pseudo-random body cells from seed
  const N = 21;
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) | 0;
  const rnd = () => {h = h * 1103515245 + 12345 | 0;return (h >>> 16 & 0x7fff) / 0x7fff;};
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) grid[y][x] = rnd() > 0.52 ? 1 : 0;
  // Finder patterns at 3 corners
  const stamp = (px, py) => {
    for (let dy = 0; dy < 7; dy++) for (let dx = 0; dx < 7; dx++) {
      const onBorder = dx === 0 || dy === 0 || dx === 6 || dy === 6;
      const inCenter = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      grid[py + dy][px + dx] = onBorder || inCenter ? 1 : 0;
    }
  };
  stamp(0, 0);stamp(14, 0);stamp(0, 14);
  const cell = 7;
  return (
    <svg width={N * cell} height={N * cell} viewBox={`0 0 ${N * cell} ${N * cell}`}>
      {grid.map((row, y) =>
      row.map((v, x) =>
      v ? <rect key={`${x}-${y}`} x={x * cell + 0.4} y={y * cell + 0.4} width={cell - 0.8} height={cell - 0.8} rx={1.2} fill="#0e2233" /> : null
      )
      )}
    </svg>);

}

// ─── Document Sheet ──────────────────────────────────────────
function DocumentSheet({ docId, resident, rent, onClose }) {
  const docs = {
    agreement: {
      title: "Stay agreement",
      eyebrow: "Signed 18 Sep 2025 · 4 pages",
      body: `Between Studioapart GmbH and ${resident.firstName} ${resident.lastName}, this agreement covers Studio 4B at Haslangstraße 12, Ingolstadt, for the period ${resident.moveIn} through ${resident.moveOut}.\n\nMonthly rate: €${rent.amount} all-inclusive (base rent, utilities, internet, community fund).\n\nDeposit: €1 098, held in a separated trust account at Sparkasse Ingolstadt, returned within 30 days of move-out.\n\nNotice period: 30 days, in writing, via the app's inbox.`,
      ic: "file-text"
    },
    enrolment: {
      title: "Enrolment certificate",
      eyebrow: "Verified by Magda · expires 31 Mar 2027",
      body: `This certifies that ${resident.firstName} ${resident.lastName} is enrolled at ${resident.uni}, course ${resident.course}, for the winter semester 2026/27.\n\nDocument matched against THI's student portal on 18 Sep 2025. Auto-renews when a new semester certificate is uploaded.`,
      ic: "badge-check"
    },
    receipts: {
      title: "Rent receipts",
      eyebrow: "4 of 6 issued",
      body: `Aug 2026 · €${rent.amount} · SEPA · paid 28 Jul 2026\nSep 2026 · €${rent.amount} · SEPA · paid 27 Aug 2026\nOct 2026 · €${rent.amount} · SEPA · paid 26 Sep 2026\nNov 2026 · €${rent.amount} · SEPA · paid 27 Oct 2026\n\nReceipts are tax-deductible in Germany under Werbungskosten if you're claiming a second residence.`,
      ic: "receipt"
    }
  };
  const d = docs[docId];
  if (!d) return null;

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--us-navy-100)", color: "var(--us-navy-700)", display: "grid", placeItems: "center" }}>
            <Icon name={d.ic} size={20} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 18, color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em" }}>{d.title}</h2>
            <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>{d.eyebrow}</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer"
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div style={{
        background: "var(--us-bg-elevated, white)",
        borderRadius: 14,
        padding: 18,
        fontSize: 13,
        lineHeight: 1.55,
        color: "var(--us-fg)",
        whiteSpace: "pre-line",
        boxShadow: "0 1px 2px rgba(14,34,51,0.04)",
        marginBottom: 14,
        maxHeight: 280,
        overflowY: "auto"
      }}>
        {d.body}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <button className="btn-ghost">
          <Icon name="download" size={14} /> Save PDF
        </button>
        <button className="btn-ghost">
          <Icon name="share-2" size={14} /> Share
        </button>
      </div>
    </React.Fragment>);

}

// ─── Language Sheet ──────────────────────────────────────────
function LanguageSheet({ value, onPick, onClose }) {
  const langs = [
  { code: "en", name: "English", sub: "default" },
  { code: "de", name: "Deutsch", sub: "Auf Deutsch verfügbar" },
  { code: "fr", name: "Français", sub: "Bêta" },
  { code: "es", name: "Español", sub: "Beta" },
  { code: "it", name: "Italiano", sub: "Beta" }];

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 20, color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em" }}>Language</h2>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer"
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="settings-list">
        {langs.map((l) =>
        <div key={l.code} className="set-row" onClick={() => onPick(l.code)}>
            <div className="ic" style={{ background: "var(--us-mustard-100)", color: "var(--us-mustard-700)" }}>
              <Icon name="languages" size={16} />
            </div>
            <div className="body">
              <div className="l">{l.name}</div>
              <div className="s">{l.sub}</div>
            </div>
            {value === l.code &&
          <div style={{ color: "var(--us-mustard-500)" }}>
                <Icon name="check" size={20} strokeWidth={2.6} />
              </div>
          }
          </div>
        )}
      </div>
    </React.Fragment>);

}

// ─── Sign-out confirmation ───────────────────────────────────
function SignOutSheet({ onConfirm, onClose }) {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center", padding: "8px 0 0" }}>
        <div style={{
          width: 64, height: 64, margin: "0 auto 14px",
          borderRadius: "50%",
          background: "var(--us-danger-100)", color: "var(--us-danger-700)",
          display: "grid", placeItems: "center"
        }}>
          <Icon name="log-out" size={28} />
        </div>
        <h2 style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 22, color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em" }}>Sign out of Studioapart?</h2>
        <p style={{ fontSize: 13, color: "var(--us-fg-muted)", margin: "8px 28px 18px", lineHeight: 1.5 }}>
          You'll be signed out on this device. You can come back in with your stay email and the 6-digit code we sent you on move-in day.
        </p>
        <button className="btn-primary" style={{ background: "var(--us-danger-500)", boxShadow: "0 10px 22px -10px rgba(210,34,45,0.55)" }} onClick={onConfirm}>
          <Icon name="log-out" size={16} /> Sign out
        </button>
        <button className="btn-ghost" style={{ marginTop: 8 }} onClick={onClose}>
          Stay signed in
        </button>
      </div>
    </React.Fragment>);

}

// ─── Goodbye screen after sign-out ───────────────────────────
function SignedOutScreen({ onSignIn }) {
  return (
    <div className="screen screen-enter" style={{ display: "flex", flexDirection: "column", padding: "80px 20px 40px" }}>
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: "#050d18",
          display: "grid", placeItems: "center",
          color: "var(--us-mustard-500)",
          fontFamily: "var(--us-font-display)", fontWeight: 800, fontSize: 32,
          position: "relative",
          marginBottom: 24,
          boxShadow: "0 18px 30px -16px rgba(14,34,51,0.5)"
        }}>
          U
          <span style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: "var(--us-mustard-500)", right: 10, bottom: 10, boxShadow: "0 0 14px rgba(255,114,54,0.7)" }} />
        </div>
        <h1 style={{
          fontFamily: "var(--us-font-display)",
          fontWeight: 800, fontSize: 28,
          color: "var(--us-navy-900)",
          margin: 0, letterSpacing: "-0.025em",
          textAlign: "center"
        }}>See you back at Haslangstraße.</h1>
        <p style={{
          fontSize: 13, color: "var(--us-fg-muted)",
          margin: "10px 16px 0",
          textWrap: "pretty"
        }}>You're signed out. Your stay continues — your room, your community fund, your friends down the hall are all still here.</p>
      </div>
      <div>
        <button className="btn-primary" onClick={onSignIn}>
          <Icon name="key-round" size={16} /> Sign back in
        </button>
        <p style={{ fontSize: 11, color: "var(--us-fg-muted)", textAlign: "center", margin: "10px 0 0" }}>
          Lost your code? Drop a line to Magda at the front desk.
        </p>
      </div>
    </div>);

}

// ─── Ticket detail (pushed) ──────────────────────────────────
function TicketDetail({ ticket, onBack, onReply, extraMessages = [] }) {
  const messages = [
  { who: "you", text: ticket.body, time: ticket.timeAgo },
  ...(ticket.status === "progress" || ticket.status === "done" ?
  [{ who: "magda", text: `Hi ${ticket.resident || "Lena"}, picked this up — I'll swing by at ${ticket.eta || "14:30"} today. If that doesn't work, ping back.`, time: "8 min after" }] :
  []),
  ...(ticket.status === "done" ?
  [{ who: "magda", text: "Sorted! Let me know if the issue comes back.", time: "1 h later" }] :
  [])];


  return (
    <div className="screen screen-enter">
      <DetailBar title={`Request #${ticket.id.slice(-4).toUpperCase()}`} onBack={onBack} />

      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "var(--us-mustard-100)", color: "var(--us-mustard-700)",
            display: "grid", placeItems: "center"
          }}>
            <Icon name={ticket.icon} size={22} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "var(--us-font-display)", fontWeight: 700,
              fontSize: 20, color: "var(--us-navy-900)",
              margin: 0, letterSpacing: "-0.02em"
            }}>{ticket.title}</h1>
            <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>
              {ticket.where} · opened {ticket.timeAgo}
            </div>
          </div>
        </div>

        {/* Status track */}
        <div style={{
          background: "var(--us-bg-elevated, white)",
          borderRadius: 14,
          padding: 14,
          marginBottom: 16,
          boxShadow: "0 1px 2px rgba(14,34,51,0.04)"
        }}>
          {[
          { k: "open", l: "Received", s: "Right away" },
          { k: "progress", l: "Magda's on it", s: ticket.status !== "open" ? "8 min later" : "Pending" },
          { k: "done", l: "Sorted", s: ticket.status === "done" ? "1 h later" : "Soon" }].
          map((step, i, arr) => {
            const order = { open: 0, progress: 1, done: 2 };
            const done = order[ticket.status] >= i;
            return (
              <div key={step.k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: done ? "var(--us-mustard-500)" : "var(--us-ink-100)",
                  color: done ? "white" : "var(--us-ink-400)",
                  display: "grid", placeItems: "center", flexShrink: 0,
                  position: "relative", zIndex: 1
                }}>
                  {done ? <Icon name="check" size={14} strokeWidth={3} /> : <span style={{ width: 6, height: 6, borderRadius: 3, background: "currentColor" }} />}
                  {i < arr.length - 1 &&
                  <div style={{
                    position: "absolute",
                    width: 2, height: 24, top: 24, left: 12,
                    background: order[ticket.status] > i ? "var(--us-mustard-500)" : "var(--us-ink-100)",
                    zIndex: -1
                  }} />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: done ? "var(--us-navy-900)" : "var(--us-ink-400)" }}>{step.l}</div>
                  <div style={{ fontSize: 11, color: "var(--us-fg-muted)" }}>{step.s}</div>
                </div>
              </div>);

          })}
        </div>

        <div className="message-thread" style={{ padding: 0, marginBottom: 14 }}>
          {[...messages, ...extraMessages].map((m, i) =>
          <div key={i} className={`msg ${m.who === "you" ? "me" : "them"}`}>
              <div className="who">{m.who === "you" ? "You" : "Magda"}</div>
              {m.text}
              <div className="ts">{m.time}</div>
            </div>
          )}
        </div>

        <button className="btn-primary dark" onClick={() => onReply?.("Magda")}>
          <Icon name="message-circle" size={16} /> Reply to Magda
        </button>
      </div>
    </div>);

}

// ─── Autopay settings sheet ──────────────────────────────────
function AutopaySheet({ rent, onClose, onSave }) {
  const [enabled, setEnabled] = React.useState(rent.autopay);
  const [day, setDay] = React.useState(1);
  const [method, setMethod] = React.useState("sepa");
  const [reminders, setReminders] = React.useState({ d7: true, d3: false, d1: true });

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{
            fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 20,
            color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em"
          }}>Autopay & reminders</h2>
          <p style={{ fontSize: 12, color: "var(--us-fg-muted)", margin: "2px 0 0" }}>
            Sort rent without thinking about it
          </p>
        </div>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer"
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="settings-list" style={{ margin: 0, marginBottom: 14 }}>
        <div className="set-row" onClick={() => setEnabled((e) => !e)}>
          <div className="ic" style={{ background: "var(--us-mustard-100)", color: "var(--us-mustard-700)" }}>
            <Icon name="zap" size={16} />
          </div>
          <div className="body">
            <div className="l">Autopay rent</div>
            <div className="s">Charge {rent.method} on the 1st</div>
          </div>
          <button className={`switch ${enabled ? "on" : ""}`} />
        </div>
      </div>

      {enabled &&
      <React.Fragment>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--us-fg-muted)", textTransform: "uppercase", margin: "10px 0 8px" }}>
          Charge on
        </div>
        <div className="chips" style={{ marginBottom: 16 }}>
          {[1, 5, 15, 25].map((d) =>
          <span key={d} className={`chip ${day === d ? "on" : ""}`} onClick={() => setDay(d)}>
            {d === 1 ? "1st" : d === 5 ? "5th" : d === 15 ? "15th" : "25th"} of month
          </span>
          )}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--us-fg-muted)", textTransform: "uppercase", margin: "0 0 8px" }}>
          Payment method
        </div>
        <div className="settings-list" style={{ margin: 0, marginBottom: 16 }}>
          <div className="set-row" onClick={() => setMethod("sepa")}>
            <div className="ic"><Icon name="landmark" size={16} /></div>
            <div className="body">
              <div className="l">SEPA · DE89 ··· 4172</div>
              <div className="s">Default · Sparkasse Ingolstadt</div>
            </div>
            {method === "sepa" && <Icon name="check" size={18} color="var(--us-mustard-500)" strokeWidth={2.6} />}
          </div>
          <div className="set-row" onClick={() => setMethod("card")}>
            <div className="ic"><Icon name="credit-card" size={16} /></div>
            <div className="body">
              <div className="l">Card · ···· 4042</div>
              <div className="s">Visa · 0.4% surcharge</div>
            </div>
            {method === "card" && <Icon name="check" size={18} color="var(--us-mustard-500)" strokeWidth={2.6} />}
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--us-fg-muted)", textTransform: "uppercase", margin: "0 0 8px" }}>
          Remind me
        </div>
        <div className="settings-list" style={{ margin: 0, marginBottom: 18 }}>
          {[
          { k: "d7", l: "7 days before", s: "Heads-up nudge" },
          { k: "d3", l: "3 days before", s: "Sanity check" },
          { k: "d1", l: "1 day before", s: "Last chance to cancel" }].
          map((r) =>
          <div key={r.k} className="set-row" onClick={() => setReminders((rs) => ({ ...rs, [r.k]: !rs[r.k] }))}>
            <div className="ic"><Icon name="bell" size={16} /></div>
            <div className="body">
              <div className="l">{r.l}</div>
              <div className="s">{r.s}</div>
            </div>
            <button className={`switch ${reminders[r.k] ? "on" : ""}`} />
          </div>
          )}
        </div>
      </React.Fragment>
      }

      <button className="btn-primary dark" onClick={() => onSave({ enabled, day, method, reminders })}>
        <Icon name="check" size={16} strokeWidth={2.6} /> Save changes
      </button>
    </React.Fragment>);

}

Object.assign(window, {
  SettingsScreen, PassSheet, QRSvg, DocumentSheet, LanguageSheet,
  SignOutSheet, SignedOutScreen, TicketDetail, AutopaySheet
});