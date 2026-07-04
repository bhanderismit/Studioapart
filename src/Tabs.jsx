// Inbox + Booking + Stay (profile) — tab screens.

// ─── Inbox: announcement list, then thread ───────────────────
function Inbox({ announcements, tickets, onOpen, onOpenTicket, onMarkAllRead }) {
  const [q, setQ] = React.useState("");
  const [kbOpen, setKbOpen] = React.useState(false);
  const Q = q.trim().toLowerCase();
  const searchRef = React.useRef(null);
  // Note: we intentionally do NOT auto-focus on mount — the keyboard only
  // opens when the resident taps the search field.

  const keyTap = (k) => {
    if (k === "⌫") setQ((t) => t.slice(0, -1));
    else if (k === "↵") setKbOpen(false);
    else if (k === "shift" || k === "123") {/* noop */}
    else if (k === "space") setQ((t) => t + " ");
    else setQ((t) => t + k);
  };
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];

  const matches = (str) => !Q || (str || "").toLowerCase().includes(Q);
  const filteredAnnc = announcements.filter((a) =>
    matches(a.title) || matches(a.sub) || matches(a.from) || matches(a.body));
  const filteredTickets = (tickets || []).filter((t) =>
    matches(t.title) || matches(t.body) || matches(t.where));

  const hl = (text) => {
    if (!Q) return text;
    const idx = text.toLowerCase().indexOf(Q);
    if (idx < 0) return text;
    return (
      <React.Fragment>
        {text.slice(0, idx)}
        <span className="match-highlight">{text.slice(idx, idx + Q.length)}</span>
        {text.slice(idx + Q.length)}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="hello">
        <span className="eyebrow">Inbox</span>
        <h1>News from the building.</h1>
        <div className="sub">{announcements.filter((a) => a.unread).length} unread · concierge usually replies within 30 min</div>
      </div>

      <div className={`searchbar-inbox${kbOpen ? " kb-lift" : ""}`}>
        <Icon name="search" size={16} />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search announcements, requests…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setKbOpen(true)}
          onClick={() => setKbOpen(true)}
        />
        {q && (
          <button
            onClick={() => setQ("")}
            style={{ background: "transparent", border: 0, color: "var(--us-fg-muted)", cursor: "pointer", padding: 0, display: "grid", placeItems: "center" }}
            aria-label="Clear"
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>

      {/* Your maintenance tickets */}
      {filteredTickets.length > 0 && (
        <React.Fragment>
          <div className="sec-head">
            <h2 className="t">Your requests</h2>
            <span className="l">{filteredTickets.filter((t) => t.status !== "done").length} open</span>
          </div>
          <div className="annc-row">
            {filteredTickets.map((t) => (
              <div key={t.id} className="ticket-row" onClick={() => onOpenTicket(t)}>
                <div className="ic">
                  <Icon name={t.icon} size={18} />
                </div>
                <div className="body">
                  <div className="t">{hl(t.title)}</div>
                  <div className="s">#{t.id.slice(-4).toUpperCase()} · {t.where} · {t.timeAgo}</div>
                </div>
                <span className={`status ${t.status}`}>
                  {t.status === "open" ? "Open" : t.status === "progress" ? "On it" : "Done"}
                </span>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}

      <div className="sec-head">
        <h2 className="t">{Q ? `Results · ${filteredAnnc.length}` : "Today"}</h2>
        {!Q && <span className="l" onClick={onMarkAllRead}>Mark all read</span>}
      </div>
      {filteredAnnc.length > 0 ? (
        <div className="annc-row">
          {filteredAnnc.map((a) => (
            <div key={a.id} className="annc" onClick={() => onOpen(a)}>
              <div className={`badge ${a.kind}`}>
                <Icon name={a.icon} size={18} />
              </div>
              <div className="body">
                <div className="t">{hl(a.title)}</div>
                <div className="s">{a.sub} · {a.time}</div>
              </div>
              {a.unread && <div className="unread" />}
              <div className="chev"><Icon name="chevron-right" size={16} /></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty" style={{ margin: "0 20px", background: "var(--us-bg-elevated, white)", borderRadius: 18 }}>
          <div className="ic"><Icon name="search-x" size={20} /></div>
          <div className="t">Nothing matches "{q}"</div>
          <div>Try a shorter search, or clear the field to see everything.</div>
        </div>
      )}

      <div className="sec-head">
        <h2 className="t">Direct line</h2>
      </div>
      <div className="annc-row">
        <div className="annc">
          <div className="badge ink">
            <Icon name="user-round" size={18} />
          </div>
          <div className="body">
            <div className="t">Magda — Building manager</div>
            <div className="s">"All sorted, see you tomorrow." · 1d</div>
          </div>
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
        <div className="annc">
          <div className="badge warm">
            <Icon name="users-round" size={18} />
          </div>
          <div className="body">
            <div className="t">Floor 4 chat</div>
            <div className="s">Mira: "anyone got cling film?" · 3h</div>
          </div>
          <div className="unread" />
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
      </div>

      {kbOpen && (
        <div className="kb-overlay">
          <div className="kb-scrim" onClick={() => setKbOpen(false)} />
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
              <div className="key special" style={{ background: "var(--us-mustard-500)", color: "#0a1320" }} onClick={() => keyTap("↵")}>search</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// ─── Booking: facility availability calendar ─────────────────
function Booking({ facilities, reservations, onReserve, onCancel }) {
  const [selected, setSelected] = React.useState(facilities[0]);
  const slots = ["07:00", "08:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
  const [picked, setPicked] = React.useState(null);

  // Simulated load per slot — orange-tone bar
  const load = [0.2, 0.4, 0.6, 0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4];

  // Slots already reserved by me for this facility today
  const mySlots = (reservations || [])
    .filter((r) => r.facility.id === selected.id)
    .map((r) => r.time);

  return (
    <React.Fragment>
      <div className="hello">
        <span className="eyebrow">Book a space</span>
        <h1>What do you need tonight?</h1>
        <div className="sub">Free for residents · 2-hour limit during peak</div>
      </div>

      {reservations && reservations.length > 0 && (
        <React.Fragment>
          <div className="sec-head">
            <h2 className="t">Your bookings</h2>
            <span className="l">{reservations.length} upcoming</span>
          </div>
          <div className="annc-row">
            {reservations.map((r) => (
              <div key={r.id} className="annc">
                <div className="badge ink"><Icon name={r.facility.ic} size={18} /></div>
                <div className="body">
                  <div className="t">{r.facility.name}</div>
                  <div className="s">{r.dayLabel} · {r.time}</div>
                </div>
                <button
                  onClick={() => onCancel(r.id)}
                  style={{
                    background: "transparent", border: 0,
                    color: "var(--us-fg-muted)",
                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                    padding: "6px 10px", borderRadius: 6,
                  }}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}

      <div className="sec-head">
        <h2 className="t">Choose space</h2>
      </div>
      <div className="tiles">
        {facilities.map((f) => (
          <div
            key={f.id}
            className={`tile ${f.tone}`}
            onClick={() => { setSelected(f); setPicked(null); }}
            style={
              selected.id === f.id
                ? { boxShadow: "0 0 0 2px var(--us-navy-900), 0 14px 26px -12px rgba(14,34,51,0.18)" }
                : undefined
            }
          >
            <div className="head">
              <div className="ic"><Icon name={f.ic} size={18} /></div>
              <span className={`open ${f.openClass || ""}`}>
                <span className="d" /> {f.open}
              </span>
            </div>
            <div className="n">{f.name}</div>
            <div className="s">{f.sub}</div>
          </div>
        ))}
      </div>

      <div className="sec-head">
        <h2 className="t">Pick a slot</h2>
        <span className="l">Today, Sun 22 Nov</span>
      </div>
      <div style={{ margin: "0 20px", background: "var(--us-bg-elevated, white)", borderRadius: 18, padding: 16, boxShadow: "0 1px 2px rgba(14,34,51,0.04), 0 8px 18px -10px rgba(14,34,51,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {slots.map((s, i) => {
            const isOn = picked === s;
            const mine = mySlots.includes(s);
            const busy = load[i] > 0.7 && !mine;
            return (
              <button
                key={s}
                disabled={busy || mine}
                onClick={() => setPicked(s)}
                style={{
                  height: 50,
                  border: 0,
                  borderRadius: 10,
                  cursor: busy || mine ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: 13,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  background: mine ? "var(--us-mustard-500)" : isOn ? "var(--us-action)" : busy ? "var(--us-ink-100)" : "var(--us-bg-elevated, white)",
                  color: mine ? "var(--us-fg-inverse, white)" : isOn ? "var(--us-action-fg)" : busy ? "var(--us-ink-400)" : "var(--us-navy-900)",
                  border: `1.5px solid ${mine ? "var(--us-mustard-500)" : isOn ? "var(--us-action)" : busy ? "transparent" : "var(--us-border)"}`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 180ms cubic-bezier(0.2, 0.7, 0.2, 1)",
                }}
              >
                <span>{s}</span>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", opacity: mine || isOn ? 1 : 0.6 }}>
                  {mine ? "YOURS" : busy ? "FULL" : isOn ? "PICKED" : ""}
                </span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, fontSize: 11, color: "var(--us-fg-muted)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--us-bg-elevated, white)", border: "1.5px solid var(--us-border)" }} />
            Free
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--us-mustard-500)" }} />
            Yours
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--us-ink-300)" }} />
            Full
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <button
          className="btn-primary"
          disabled={!picked}
          style={{
            opacity: picked ? 1 : 0.55,
            cursor: picked ? "pointer" : "not-allowed",
          }}
          onClick={() => picked && onReserve(selected, picked)}
        >
          {picked
            ? `Reserve ${selected.name} · ${picked}`
            : "Pick a time"}
        </button>
        <p style={{ fontSize: 11, color: "var(--us-fg-muted)", textAlign: "center", margin: "10px 0 0" }}>
          Cancel anytime up to 30 min before · Added to your calendar
        </p>
      </div>
    </React.Fragment>
  );
}

// ─── Stay (profile) ──────────────────────────────────────────
function Stay({ resident, rent, tickets, onOpenPass, onOpenDoc, onOpenSettings, onOpenLanguage, onSignOut, onOpenTicket }) {
  return (
    <React.Fragment>
      <div className="hello">
        <span className="eyebrow">Your stay</span>
        <h1>{resident.firstName} {resident.lastName}</h1>
        <div className="resident-tags">
          <span className="rt school">
            <Icon name="graduation-cap" size={12} strokeWidth={2.2} />
            {resident.uni}
          </span>
          <span className="rt course">
            <Icon name="book-open" size={12} strokeWidth={2.2} />
            {resident.course}
          </span>
        </div>
      </div>

      <div style={{ padding: "0 20px", marginTop: 8 }} onClick={onOpenPass}>
        <div style={{
          background: "linear-gradient(165deg, #0e2233 0%, #050d18 80%)",
          borderRadius: 18, padding: 18, color: "white", position: "relative", overflow: "hidden",
          boxShadow: "0 16px 30px -16px rgba(14,34,51,0.5)",
          cursor: "pointer",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,114,54,0.35), transparent 70%)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--us-mustard-300)" }}>Resident pass · tap for QR</div>
              <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 22, marginTop: 8, letterSpacing: "-0.02em" }}>{resident.firstName} {resident.lastName}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{resident.unit} · {resident.building}</div>
            </div>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: "var(--us-mustard-500)", display: "grid", placeItems: "center", color: "var(--us-navy-900)", fontFamily: "var(--us-font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>
              {resident.initials}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14, position: "relative" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Stay from</div>
              <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 13, marginTop: 4 }}>{resident.moveIn}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Stay until</div>
              <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 13, marginTop: 4 }}>{resident.moveOut}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pass</div>
              <div style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 13, marginTop: 4 }}>#4B-2026-LV</div>
            </div>
          </div>
        </div>
      </div>

      {/* Open tickets */}
      {tickets && tickets.length > 0 && (
        <React.Fragment>
          <div className="sec-head">
            <h2 className="t">Your requests</h2>
            <span className="l">{tickets.filter((t) => t.status !== "done").length} open</span>
          </div>
          <div className="annc-row">
            {tickets.map((t) => (
              <div key={t.id} className="ticket-row" onClick={() => onOpenTicket(t)}>
                <div className="ic">
                  <Icon name={t.icon} size={18} />
                </div>
                <div className="body">
                  <div className="t">{t.title}</div>
                  <div className="s">#{t.id.slice(-4).toUpperCase()} · {t.where} · {t.timeAgo}</div>
                </div>
                <span className={`status ${t.status}`}>
                  {t.status === "open" ? "Open" : t.status === "progress" ? "On it" : "Done"}
                </span>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}

      <div className="sec-head">
        <h2 className="t">Documents</h2>
        <span className="l">Vault</span>
      </div>
      <div className="annc-row">
        <div className="annc" onClick={() => onOpenDoc("agreement")}>
          <div className="badge ink"><Icon name="file-text" size={18} /></div>
          <div className="body">
            <div className="t">Stay agreement</div>
            <div className="s">Signed 18 Sep · 4 pages · PDF</div>
          </div>
          <div className="chev"><Icon name="download" size={16} /></div>
        </div>
        <div className="annc" onClick={() => onOpenDoc("enrolment")}>
          <div className="badge cool"><Icon name="badge-check" size={18} /></div>
          <div className="body">
            <div className="t">Enrolment certificate</div>
            <div className="s">Verified · expires 31 Mar 2027</div>
          </div>
          <div className="chev"><Icon name="check" size={16} /></div>
        </div>
        <div className="annc" onClick={() => onOpenDoc("receipts")}>
          <div className="badge warm"><Icon name="receipt" size={18} /></div>
          <div className="body">
            <div className="t">Rent receipts</div>
            <div className="s">4 of 6 issued · €{rent.amount * 4} so far</div>
          </div>
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
      </div>

      <div className="sec-head">
        <h2 className="t">Preferences</h2>
      </div>
      <div className="annc-row">
        <div className="annc" onClick={onOpenSettings}>
          <div className="badge ink"><Icon name="bell" size={18} /></div>
          <div className="body">
            <div className="t">Notifications</div>
            <div className="s">Events on · building on · rent off</div>
          </div>
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
        <div className="annc" onClick={onOpenLanguage}>
          <div className="badge ink"><Icon name="languages" size={18} /></div>
          <div className="body">
            <div className="t">Language</div>
            <div className="s">English · Deutsch available</div>
          </div>
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
        <div className="annc" onClick={onSignOut}>
          <div className="badge ink" style={{ background: "var(--us-danger-100)", color: "var(--us-danger-700)" }}>
            <Icon name="log-out" size={18} />
          </div>
          <div className="body">
            <div className="t" style={{ color: "var(--us-danger-700)" }}>Sign out</div>
            <div className="s">You'll need your stay code to come back in</div>
          </div>
          <div className="chev"><Icon name="chevron-right" size={16} /></div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "var(--us-fg-muted)" }}>
        Uni-Stays · v2.4 · {resident.building}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Inbox, Booking, Stay });
