// Detail views — Event, Announcement, Rent (sheet), Maintenance (sheet), QuickActions (sheet)

// ─── Event Detail ────────────────────────────────────────────
function EventDetail({ event, onBack, onRSVP, going }) {
  const ref = React.useRef(null);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="screen screen-enter" ref={ref}>
      <DetailBar title={scrolled ? event.title : ""} onBack={onBack} solid={scrolled} />

      <div className={`event-hero ${event.kind}`} style={{ marginTop: -64 }}>
        <div className={`event ${event.kind}`} style={{ position: "absolute", inset: 0, borderRadius: 0, height: "100%", flex: "none" }}>
          <div className="bg" style={{ filter: "saturate(110%)" }} />
          {event.kind === "lounge" && <div className="gfx-disc" style={{ width: 360, height: 360, right: -120, bottom: -160, animationDuration: "26s" }} />}
          {event.kind === "run" && (
            <div className="gfx-path">
              <svg className="line" viewBox="0 0 360 280" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <defs>
                  <linearGradient id="rgd" x1="0" x2="1">
                    <stop offset="0" stopColor="rgba(255,114,54,0.2)" />
                    <stop offset="1" stopColor="rgba(255,114,54,0.6)" />
                  </linearGradient>
                </defs>
                <path d="M 0 220 C 60 130, 140 270, 200 170 S 320 100, 360 200"
                  fill="none" stroke="url(#rgd)" strokeWidth="2" strokeDasharray="3 5" />
              </svg>
              <span className="dot" style={{
                offsetPath: "path('M 0 220 C 60 130, 140 270, 200 170 S 320 100, 360 200')",
              }} />
            </div>
          )}
          {event.kind === "movie" && (
            <React.Fragment>
              <div className="gfx-spot" />
              <div className="gfx-film" />
            </React.Fragment>
          )}
          {event.kind === "kitchen" && (
            <div className="gfx-steam">
              <span /><span /><span />
            </div>
          )}
          {event.kind === "gym" && (
            <React.Fragment>
              <span className="gfx-dumbbell" style={{ fontSize: 320, right: -80, top: -50 }}>F</span>
              <div className="gfx-reps">
                <span /><span /><span /><span /><span />
              </div>
            </React.Fragment>
          )}
          <div className="grain" />
        </div>
        <div className="pad">
          <div className="when">{event.when}</div>
          <h1>{event.title}</h1>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {event.blocks.map((b) => (
            <span key={b} style={{
              fontSize: 11, fontWeight: 700, padding: "6px 10px",
              borderRadius: 999, background: "var(--us-navy-100)", color: "var(--us-navy-700)",
              letterSpacing: "0.02em",
            }}>{b}</span>
          ))}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--us-fg)", textWrap: "pretty", marginBottom: 18 }}>
          {event.desc}
        </p>

        <div style={{
          background: "var(--us-bg-elevated, white)",
          borderRadius: 16, padding: 14,
          boxShadow: "0 1px 2px rgba(14,34,51,0.04), 0 8px 18px -10px rgba(14,34,51,0.1)",
          marginBottom: 12,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "var(--us-mustard-100)", color: "var(--us-mustard-700)",
            display: "grid", placeItems: "center",
          }}>
            <Icon name="map-pin" size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--us-navy-900)" }}>{event.place}</div>
            <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>2-minute walk from Studio 4B</div>
          </div>
          <Icon name="chevron-right" size={16} color="var(--us-ink-400)" />
        </div>

        <div style={{
          background: "var(--us-bg-elevated, white)",
          borderRadius: 16, padding: 14,
          boxShadow: "0 1px 2px rgba(14,34,51,0.04), 0 8px 18px -10px rgba(14,34,51,0.1)",
          marginBottom: 18,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--us-fg-muted)" }}>
              Going
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--us-navy-900)" }}>
              {event.going + (going ? 1 : 0)} / {event.capacity}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            {["M", "J", "C", "T", "A", "Y"].map((l, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: "50%",
                marginLeft: i === 0 ? 0 : -10,
                border: "2.5px solid var(--us-bg-elevated, white)",
                background: ["linear-gradient(135deg,#ffb594,#e35418)", "linear-gradient(135deg,#b3c5cb,#2c4953)", "linear-gradient(135deg,#ffd2bc,#ff7236)", "linear-gradient(135deg,#dde4e7,#3a5f6b)", "linear-gradient(135deg,#ffb594,#e35418)", "linear-gradient(135deg,#dde4e7,#3a5f6b)"][i],
                color: "white", fontWeight: 700, fontSize: 12,
                display: "grid", placeItems: "center",
                boxShadow: "0 2px 4px rgba(14,34,51,0.08)",
              }}>{l}</div>
            ))}
            <div style={{ marginLeft: -10, height: 32, padding: "0 10px", borderRadius: 16, border: "2.5px solid var(--us-bg-elevated, white)", background: "var(--us-ink-100)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "var(--us-navy-700)" }}>
              +{event.going - 6}
            </div>
          </div>
          <div style={{
            height: 6, borderRadius: 3,
            background: "var(--us-ink-100)",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${Math.min(100, ((event.going + (going ? 1 : 0)) / event.capacity) * 100)}%`,
              height: "100%",
              background: "linear-gradient(90deg, var(--us-mustard-500), var(--us-mustard-700))",
              transition: "width 600ms cubic-bezier(0.2, 0.7, 0.2, 1)",
            }} />
          </div>
        </div>

        <button
          className={`btn-primary ${going ? "dark" : ""}`}
          onClick={() => onRSVP(event.id)}
        >
          {going ? (
            <React.Fragment>
              <Icon name="check" size={16} strokeWidth={2.6} /> You're going
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Icon name="plus" size={16} strokeWidth={2.6} /> Count me in
            </React.Fragment>
          )}
        </button>

        <button className="btn-ghost" style={{ marginTop: 8 }}>
          <Icon name="share-2" size={14} /> Share with a friend
        </button>
      </div>
    </div>
  );
}

// ─── Announcement Detail ─────────────────────────────────────
function AnnouncementDetail({ annc, onBack, onReply }) {
  const [reactions, setReactions] = React.useState({ thanks: 12, useful: 7, heart: 3 });
  const [picked, setPicked] = React.useState(null);
  const toggle = (k) => {
    setReactions((r) => {
      const n = { ...r };
      if (picked === k) { n[k] = Math.max(0, n[k] - 1); setPicked(null); }
      else { n[k] = n[k] + 1; if (picked) n[picked] = Math.max(0, n[picked] - 1); setPicked(k); }
      return n;
    });
  };

  return (
    <div className="screen screen-enter">
      <DetailBar title="From the building" onBack={onBack} />

      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div className={`badge ${annc.kind}`} style={{
            width: 48, height: 48, borderRadius: 14,
            display: "grid", placeItems: "center",
            background: annc.kind === "warm" ? "var(--us-mustard-100)" : annc.kind === "cool" ? "var(--us-teal-100)" : "var(--us-navy-100)",
            color: annc.kind === "warm" ? "var(--us-mustard-700)" : annc.kind === "cool" ? "var(--us-teal-700)" : "var(--us-navy-700)",
          }}>
            <Icon name={annc.icon} size={22} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--us-mustard-700)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {annc.from}
            </div>
            <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>{annc.time}</div>
          </div>
        </div>

        <h1 style={{
          fontFamily: "var(--us-font-display)",
          fontWeight: 800, fontSize: 26,
          color: "var(--us-navy-900)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: "0 0 12px",
          textWrap: "pretty",
        }}>{annc.title}</h1>

        <p style={{
          fontSize: 14.5, lineHeight: 1.55,
          color: "var(--us-fg)",
          textWrap: "pretty",
          margin: "0 0 8px",
        }}>{annc.body}</p>

        <div className="reactions">
          {[
            { id: "thanks", emoji: "🙏", label: "Thanks" },
            { id: "useful", emoji: "💡", label: "Useful" },
            { id: "heart",  emoji: "❤️", label: "Love it" },
          ].map((r) => (
            <button
              key={r.id}
              className={`reaction ${picked === r.id ? "on" : ""}`}
              onClick={() => toggle(r.id)}
            >
              <span className="emoji">{r.emoji}</span>
              <span>{r.label}</span>
              <span className="count">{reactions[r.id]}</span>
            </button>
          ))}
        </div>

        <div className="message-thread" style={{ padding: 0, marginTop: 16 }}>
          <div className="msg them">
            <div className="who">Magda</div>
            Anything else I can help with?
            <div className="ts">14:24</div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="btn-primary dark" onClick={() => onReply?.(annc.from || "Magda")}>
            <Icon name="reply" size={14} /> Reply to Magda
          </button>
          <button className="btn-ghost" style={{ marginTop: 8 }}>
            <Icon name="check" size={14} /> Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Rent pay sheet ──────────────────────────────────────────
function RentSheet({ rent, onPay, onClose }) {
  const [paying, setPaying] = React.useState(false);
  const [paid, setPaid] = React.useState(false);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaid(true); }, 1400);
    setTimeout(() => { onPay(); }, 2400);
  };

  return (
    <React.Fragment>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
      }}>
        <h2 style={{
          fontFamily: "var(--us-font-display)",
          fontWeight: 700, fontSize: 20,
          color: "var(--us-navy-900)",
          margin: 0, letterSpacing: "-0.02em",
        }}>December rent</h2>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer",
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      {paid ? (
        <div style={{ textAlign: "center", padding: "30px 20px", position: "relative" }}>
          <Confetti />
          <div style={{
            width: 72, height: 72, margin: "0 auto 16px",
            borderRadius: "50%",
            background: "var(--us-success-100)", color: "var(--us-success-700)",
            display: "grid", placeItems: "center",
            animation: "screen-in 280ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative", zIndex: 1,
          }}>
            <Icon name="check" size={36} strokeWidth={3} />
          </div>
          <div style={{
            fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 24,
            color: "var(--us-navy-900)", letterSpacing: "-0.02em",
            marginBottom: 6, position: "relative", zIndex: 1,
          }}>You're sorted for December</div>
          <div style={{ fontSize: 13, color: "var(--us-fg-muted)", position: "relative", zIndex: 1 }}>
            €{rent.amount} · receipt sent to your inbox
          </div>
        </div>
      ) : paying ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{
            width: 72, height: 72, margin: "0 auto 16px",
            borderRadius: "50%",
            background: "var(--us-mustard-100)", color: "var(--us-mustard-700)",
            display: "grid", placeItems: "center",
            animation: "spin 1s linear infinite",
          }}>
            <Icon name="loader-2" size={32} strokeWidth={2.5} />
          </div>
          <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 18, color: "var(--us-navy-900)" }}>Talking to your bank…</div>
        </div>
      ) : (
        <React.Fragment>
          <div className="invoice" style={{ margin: 0, marginBottom: 14 }}>
            {rent.breakdown.map((b) => (
              <div key={b.k} className="row">
                <div className="k">
                  {b.k}
                  <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>{b.kind}</div>
                </div>
                <div className="v">{b.v === 0 ? "free" : `€${b.v}`}</div>
              </div>
            ))}
            <div className="row total">
              <div className="k">Total due 1 Dec</div>
              <div className="v">€{rent.amount}</div>
            </div>
          </div>

          <div style={{
            background: "var(--us-bg-elevated, white)", borderRadius: 14, padding: 14,
            display: "flex", alignItems: "center", gap: 12,
            border: "1.5px solid var(--us-mustard-500)",
            marginBottom: 14,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "var(--us-mustard-100)", color: "var(--us-mustard-700)",
              display: "grid", placeItems: "center",
            }}>
              <Icon name="landmark" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--us-navy-900)" }}>SEPA direct debit</div>
              <div style={{ fontSize: 11, color: "var(--us-fg-muted)" }}>{rent.method}</div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "4px 8px",
              borderRadius: 999, background: "var(--us-mustard-500)", color: "var(--us-navy-900)",
            }}>Default</span>
          </div>

          <button className="btn-primary dark" onClick={handlePay}>
            <Icon name="credit-card" size={16} /> Pay €{rent.amount}
          </button>
          <p style={{ fontSize: 11, color: "var(--us-fg-muted)", textAlign: "center", margin: "10px 0 0" }}>
            We'll only charge once and email you a receipt
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

// ─── Maintenance sheet ───────────────────────────────────────
function MaintenanceSheet({ types, onSubmit, onClose }) {
  const [type, setType] = React.useState(null);
  const [body, setBody] = React.useState("");
  const [where, setWhere] = React.useState("Bathroom");
  const [urgency, setUrgency] = React.useState("normal");
  const [photos, setPhotos] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const addPhoto = () => {
    // Simulated capture — append a placeholder pattern tagged with location
    setPhotos((ps) => ps.length >= 3 ? ps : [...ps, { id: Date.now() + Math.random(), tag: where.toLowerCase() }]);
  };
  const removePhoto = (id) => setPhotos((ps) => ps.filter((p) => p.id !== id));

  const send = () => {
    if (!type) { setErr("Pick what's not working"); return; }
    if (body.trim().length < 8) { setErr("Tell us a bit more — at least 8 characters"); return; }
    setErr(null);
    setSubmitted(true);
    setTimeout(() => onSubmit({ type, body, where, urgency, photoCount: photos.length }), 1600);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "20px 10px 10px" }}>
        <div style={{
          width: 72, height: 72, margin: "0 auto 16px",
          borderRadius: "50%",
          background: "var(--us-success-100)", color: "var(--us-success-700)",
          display: "grid", placeItems: "center",
        }}>
          <Icon name="check" size={36} strokeWidth={3} />
        </div>
        <div style={{
          fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 22,
          color: "var(--us-navy-900)", letterSpacing: "-0.02em", marginBottom: 6,
        }}>We're on it</div>
        <div style={{ fontSize: 13, color: "var(--us-fg-muted)" }}>
          Magda will swing by within 2 hours · we'll text you first
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{
          fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 20,
          color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em",
        }}>Something not working?</h2>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer",
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--us-fg-muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          What's up?
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              style={{
                background: type === t.id ? "var(--us-action)" : "var(--us-bg-elevated, white)",
                color: type === t.id ? "var(--us-action-fg)" : "var(--us-navy-900)",
                border: `1.5px solid ${type === t.id ? "var(--us-action)" : "var(--us-border)"}`,
                borderRadius: 12, padding: "12px 6px", cursor: "pointer",
                fontFamily: "inherit", fontWeight: 600, fontSize: 12,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                transition: "all 180ms",
              }}
            >
              <Icon name={t.ic} size={18} />
              {t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginBottom: 14 }}>
        <label>Where</label>
        <div className="chips">
          {["Bathroom", "Kitchen", "Bedroom", "Common area", "Other"].map((w) => (
            <span key={w} className={`chip ${where === w ? "on" : ""}`} onClick={() => setWhere(w)}>{w}</span>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginBottom: 14 }}>
        <label>Tell us a bit more</label>
        <textarea
          placeholder="e.g. The shower's lukewarm even on full red. Worse in the morning."
          value={body}
          onChange={(e) => { setBody(e.target.value); setErr(null); }}
        />
        {err && <span className="err"><Icon name="alert-circle" size={12} /> {err}</span>}
      </div>

      <div className="field" style={{ marginBottom: 14 }}>
        <label>Add a photo (helps a lot)</label>
        <div className="photo-row">
          {photos.map((p) => (
            <div key={p.id} className={`photo-thumb has-image ${p.tag}`}>
              <div className="ph-pattern" />
              <button className="remove" onClick={() => removePhoto(p.id)} aria-label="Remove">
                <Icon name="x" size={10} strokeWidth={3} />
              </button>
              <span className="photo-label">{where}</span>
            </div>
          ))}
          {photos.length < 3 && (
            <button
              type="button"
              className="photo-thumb"
              onClick={addPhoto}
              aria-label="Add photo"
              style={{ background: "transparent" }}
            >
              <Icon name="camera" size={20} />
            </button>
          )}
        </div>
        <span style={{ fontSize: 10.5, color: "var(--us-fg-muted)", marginTop: 4 }}>
          {photos.length === 0 ? "Up to 3 — pick from camera or gallery" : `${photos.length} of 3 attached`}
        </span>
      </div>

      <div className="field" style={{ marginBottom: 18 }}>
        <label>How urgent?</label>
        <div className="chips">
          {[
            { id: "low", l: "When you can" },
            { id: "normal", l: "Today" },
            { id: "high", l: "Now — flooding / no heat" },
          ].map((u) => (
            <span key={u.id} className={`chip ${urgency === u.id ? "on" : ""}`} onClick={() => setUrgency(u.id)}>
              {u.l}
            </span>
          ))}
        </div>
      </div>

      <button className="btn-primary" onClick={send}>
        <Icon name="send" size={16} /> Drop a line to Magda
      </button>
    </React.Fragment>
  );
}

// ─── Quick action sheet (FAB) ────────────────────────────────
function QuickSheet({ onPick, onClose }) {
  const items = [
    { id: "maint",    ic: "wrench",          l: "Report something",  s: "Leaks, heat, lock, Wi-Fi" },
    { id: "facility", ic: "calendar",        l: "Book a space",      s: "Gym, lounge, seminar room" },
    { id: "concierge", ic: "message-circle", l: "Chat with Magda",   s: "Building manager · online" },
    { id: "guest",    ic: "user-plus",       l: "Sign in a guest",   s: "QR code, 24h pass" },
    { id: "lockout",  ic: "key-round",       l: "Locked out?",       s: "Master key, 24/7" },
  ];
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{
          fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 20,
          color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em",
        }}>How can we help?</h2>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, border: 0,
          background: "var(--us-ink-100)", color: "var(--us-navy-900)",
          display: "grid", placeItems: "center", cursor: "pointer",
        }}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onPick(it.id)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "var(--us-bg-elevated, white)", border: 0, borderRadius: 14, padding: 14,
              boxShadow: "0 1px 2px rgba(14,34,51,0.04), 0 6px 14px -8px rgba(14,34,51,0.1)",
              cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              transition: "transform 180ms",
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.99)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: it.id === "maint" ? "var(--us-mustard-100)" : it.id === "lockout" ? "var(--us-danger-100)" : "var(--us-navy-100)",
              color: it.id === "maint" ? "var(--us-mustard-700)" : it.id === "lockout" ? "var(--us-danger-700)" : "var(--us-navy-700)",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <Icon name={it.ic} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--us-navy-900)" }}>{it.l}</div>
              <div style={{ fontSize: 11, color: "var(--us-fg-muted)", marginTop: 2 }}>{it.s}</div>
            </div>
            <Icon name="chevron-right" size={16} color="var(--us-ink-400)" />
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

// ─── Compose (reply with keyboard) ───────────────────────────
function Compose({ to, placeholder, onClose, onSend }) {
  const [text, setText] = React.useState("");
  const taRef = React.useRef(null);

  React.useEffect(() => { taRef.current?.focus(); }, []);

  const keyTap = (k) => {
    if (k === "⌫") setText((t) => t.slice(0, -1));
    else if (k === "↵") send();
    else if (k === "shift") {/* no-op */}
    else if (k === "123") {/* no-op */}
    else if (k === "space") setText((t) => t + " ");
    else setText((t) => t + k);
  };

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];

  return (
    <div className="compose-overlay">
      <div className="filler" onClick={onClose} />
      <div className="compose-bar" onClick={(e) => e.stopPropagation()}>
        <div className="to">
          <Icon name="user-round" size={11} strokeWidth={2.4} /> To {to}
        </div>
        <button className="attach" aria-label="Attach">
          <Icon name="paperclip" size={16} />
        </button>
        <textarea
          ref={taRef}
          placeholder={placeholder || "Write a quick message"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }}
        />
        <button className="send" disabled={!text.trim()} onClick={send} aria-label="Send">
          <Icon name="arrow-up" size={16} strokeWidth={2.6} color={text.trim() ? "var(--us-fg-inverse, white)" : undefined} />
        </button>
      </div>

      <div className="compose-keyboard" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          {row1.map((k) => (
            <div key={k} className="key" onClick={() => keyTap(k)}>{k}</div>
          ))}
        </div>
        <div className="row" style={{ padding: "0 20px" }}>
          {row2.map((k) => (
            <div key={k} className="key" onClick={() => keyTap(k)}>{k}</div>
          ))}
        </div>
        <div className="row">
          <div className="key special" onClick={() => keyTap("shift")}>⇧</div>
          {row3.map((k) => (
            <div key={k} className="key" onClick={() => keyTap(k)}>{k}</div>
          ))}
          <div className="key special" onClick={() => keyTap("⌫")}>⌫</div>
        </div>
        <div className="row">
          <div className="key special" onClick={() => keyTap("123")}>123</div>
          <div className="key space" onClick={() => keyTap("space")}>space</div>
          <div className="key special" style={{ background: "var(--us-mustard-500)", color: "#0a1320" }} onClick={() => keyTap("↵")}>↵</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EventDetail, AnnouncementDetail, RentSheet, MaintenanceSheet, QuickSheet, Compose });
