// All Events page (full list + start your own) + Building Map page

function EventsAll({ events, going, onOpenEvent, onBack, onHost, onToggleFav, favorited = {} }) {
  // Group events by their "when" string's first part (Tonight / Tomorrow / Sat / Sun / etc.)
  const groups = [];
  events.forEach((e) => {
    const day = e.when.split("·")[0].trim();
    let g = groups.find((x) => x.day === day);
    if (!g) { g = { day, items: [] }; groups.push(g); }
    g.items.push(e);
  });

  return (
    <div className="screen screen-enter">
      <DetailBar title="What's on" onBack={onBack} right={
        <button className="back" onClick={onHost} aria-label="Host" style={{ background: "var(--us-mustard-500)", color: "#0a1320" }}>
          <Icon name="plus" size={18} strokeWidth={2.6} />
        </button>
      } />

      <div className="events-page">
        <button className="host-cta" onClick={onHost}>
          <div className="ic">
            <Icon name="sparkles" size={22} />
          </div>
          <div className="body">
            <div className="ht">Host your own</div>
            <div className="hs">Pizza, board games, study group — your call</div>
          </div>
          <Icon name="chevron-right" size={18} />
        </button>

        {groups.map((g) => (
          <div key={g.day} className="day-group">
            <div className="day-label">{g.day}</div>
            {g.items.map((e) => {
              const time = (e.when.match(/\d{1,2}:\d{2}/) || [""])[0];
              const [hh, mm] = time ? time.split(":") : ["", ""];
              return (
                <div key={e.id} className="ev-row" onClick={() => onOpenEvent(e)}>
                  <div className="ev-time">
                    <div className="h">{hh || "—"}</div>
                    <div className="m">{mm || ""}</div>
                  </div>
                  <div className="ev-body">
                    <h3 className="t">{e.title}</h3>
                    <div className="s">
                      <Icon name="map-pin" size={11} /> {e.place} · {e.host}
                    </div>
                    <div className="ev-going">
                      {["M","J","C"].map((l, i) => (
                        <span key={i} className="a" style={{ background: ["linear-gradient(135deg,#ffb594,#e35418)","linear-gradient(135deg,#b3c5cb,#2c4953)","linear-gradient(135deg,#ffd2bc,#ff7236)"][i] }}>{l}</span>
                      ))}
                      <span className="count">{e.going} going · {e.capacity - e.going} left</span>
                    </div>
                  </div>
                  <div className="ev-status">
                    {going[e.id] ? (
                      <Icon name="check-circle-2" size={20} strokeWidth={2.4} />
                    ) : (
                      <Icon name="chevron-right" size={18} color="var(--us-ink-400)" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "var(--us-fg-muted)" }}>
          New events drop every Sunday evening
        </div>
      </div>
    </div>
  );
}

// ─── Host new event sheet ────────────────────────────────────
function HostSheet({ onClose, onCreate }) {
  const [name, setName] = React.useState("");
  const [where, setWhere] = React.useState("Lounge");
  const [when, setWhen] = React.useState("Tonight · 20:00");
  const [cap, setCap] = React.useState(12);
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontFamily: "var(--us-font-display)", fontWeight: 700, fontSize: 20, color: "var(--us-navy-900)", margin: 0, letterSpacing: "-0.02em" }}>Host something</h2>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, border: 0, background: "var(--us-ink-100)", color: "var(--us-navy-900)", display: "grid", placeItems: "center", cursor: "pointer" }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="field" style={{ marginBottom: 12 }}>
        <label>What are you hosting?</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Pasta night · board games · study group…" />
      </div>

      <div className="field" style={{ marginBottom: 12 }}>
        <label>Where</label>
        <div className="chips">
          {["Lounge", "Kitchen", "Seminar room", "Roof terrace", "Your room"].map((w) => (
            <span key={w} className={`chip ${where === w ? "on" : ""}`} onClick={() => setWhere(w)}>{w}</span>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginBottom: 12 }}>
        <label>When</label>
        <div className="chips">
          {["Tonight · 20:00", "Tomorrow · 19:00", "Sat · 21:00", "Sun · 13:00"].map((w) => (
            <span key={w} className={`chip ${when === w ? "on" : ""}`} onClick={() => setWhen(w)}>{w}</span>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginBottom: 18 }}>
        <label>Cap (so it doesn't get wild)</label>
        <div className="chips">
          {[4, 8, 12, 20, 40].map((n) => (
            <span key={n} className={`chip ${cap === n ? "on" : ""}`} onClick={() => setCap(n)}>{n} people</span>
          ))}
        </div>
      </div>

      <button className="btn-primary" disabled={!name.trim()} style={{ opacity: name.trim() ? 1 : 0.55 }} onClick={() => onCreate({ name: name.trim(), where, when, cap })}>
        <Icon name="sparkles" size={16} /> Publish to the building
      </button>
      <p style={{ fontSize: 11, color: "var(--us-fg-muted)", textAlign: "center", margin: "10px 0 0" }}>
        Goes to floor chats first, then full building if there's room
      </p>
    </React.Fragment>
  );
}

// ─── Building Map ────────────────────────────────────────────
function BuildingMap({ resident, onBack, onPoiTap }) {
  const [floor, setFloor] = React.useState("campus");
  const [activePoi, setActivePoi] = React.useState(null);

  const tap = (poi) => {
    setActivePoi(poi);
    onPoiTap?.(poi);
  };

  // Campus view — building + surrounding grounds
  const campusView = (
    <svg className="map-svg map-svg-tall" viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,114,54,0.08)" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
        <pattern id="grass" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#f3f0e8" />
          <circle cx="3" cy="4" r="0.8" fill="#cbd9c6" />
          <circle cx="9" cy="10" r="0.8" fill="#cbd9c6" />
          <circle cx="12" cy="3" r="0.8" fill="#cbd9c6" />
        </pattern>
        <pattern id="path-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#e7e1d3" />
        </pattern>
      </defs>
      <rect width="400" height="540" fill="url(#sky)" />

      {/* Outer plot — grass */}
      <rect x="8" y="8" width="384" height="524" rx="20" fill="url(#grass)" stroke="#0e2233" strokeWidth="2.5" />

      {/* Paths */}
      <rect x="180" y="380" width="40" height="155" fill="url(#path-pattern)" stroke="#0e2233" strokeWidth="1.5" />
      <rect x="8" y="240" width="384" height="36" fill="url(#path-pattern)" stroke="#0e2233" strokeWidth="1.5" />

      {/* Garden / front lawn (top of plot) */}
      <g onClick={() => tap({ label: "Front lawn", desc: "Sun all afternoon · picnic blankets in the shed" })} style={{ cursor: "pointer" }}>
        <ellipse cx="120" cy="80" rx="64" ry="34" fill="#cbd9c6" stroke="#0e2233" strokeWidth="2" />
        {[40, 90, 140, 180].map((x, i) => (
          <g key={x} transform={`translate(${50 + i * 32}, ${56})`}>
            <ellipse cx="0" cy="14" rx="10" ry="14" fill="#3a5f6b" stroke="#0e2233" strokeWidth="1.5" />
            <rect x="-1.5" y="22" width="3" height="8" fill="#0e2233" />
          </g>
        ))}
        <text x="120" y="118" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle" letterSpacing="0.06em">GARDEN</text>
      </g>

      {/* Playground / Court */}
      <g onClick={() => tap({ label: "Basketball court", desc: "Open 06–23 · floodlit after dark" })} style={{ cursor: "pointer" }}>
        <rect x="252" y="44" width="116" height="84" rx="6" fill="#ff7236" stroke="#0e2233" strokeWidth="2.5" />
        <line x1="310" y1="44" x2="310" y2="128" stroke="white" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="310" cy="86" r="14" fill="none" stroke="white" strokeWidth="2" />
        <rect x="256" y="48" width="108" height="76" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
        <text x="310" y="148" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle" letterSpacing="0.06em">COURT</text>
      </g>

      {/* Bike rack */}
      <g onClick={() => tap({ label: "Bike rack", desc: "60 slots · use your key for the cover" })} style={{ cursor: "pointer" }}>
        <rect x="28" y="180" width="80" height="44" rx="4" fill="white" stroke="#0e2233" strokeWidth="2" />
        {[34, 50, 66, 82, 98].map((x) => (
          <g key={x}>
            <circle cx={x} cy="202" r="5" fill="none" stroke="#0e2233" strokeWidth="1.5" />
            <circle cx={x} cy="216" r="5" fill="none" stroke="#0e2233" strokeWidth="1.5" />
            <line x1={x} y1="197" x2={x} y2="221" stroke="#0e2233" strokeWidth="1.5" />
          </g>
        ))}
        <text x="68" y="245" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle" letterSpacing="0.06em">BIKES</text>
      </g>

      {/* Parking */}
      <g onClick={() => tap({ label: "Parking", desc: "12 spots · visitor pass at reception" })} style={{ cursor: "pointer" }}>
        <rect x="292" y="180" width="80" height="44" rx="4" fill="white" stroke="#0e2233" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={300 + i * 22} y="186" width="18" height="32" fill="none" stroke="#0e2233" strokeWidth="1.5" strokeDasharray="2 2" />
        ))}
        <text x="332" y="245" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle" letterSpacing="0.06em">PARKING</text>
      </g>

      {/* THE BUILDING (middle) */}
      <g>
        {/* HOSTEL sign */}
        <rect x="155" y="294" width="120" height="28" rx="6" fill="#ff7236" stroke="#0e2233" strokeWidth="2.5" />
        <text x="215" y="313" fontSize="14" fontWeight="900" fill="#0e2233" textAnchor="middle" letterSpacing="0.12em">STUDIOAPART</text>
        <line x1="200" y1="322" x2="200" y2="330" stroke="#0e2233" strokeWidth="2" strokeLinecap="round" />
        <line x1="230" y1="322" x2="230" y2="330" stroke="#0e2233" strokeWidth="2" strokeLinecap="round" />

        {/* Mass */}
        <rect x="60" y="330" width="280" height="180" rx="6" fill="white" stroke="#0e2233" strokeWidth="3" />
        <rect x="60" y="330" width="280" height="14" fill="#ff7236" />

        {/* Floor dividers */}
        <line x1="60" y1="372" x2="340" y2="372" stroke="#0e2233" strokeWidth="2" />
        <line x1="60" y1="410" x2="340" y2="410" stroke="#0e2233" strokeWidth="2" />
        <line x1="60" y1="448" x2="340" y2="448" stroke="#0e2233" strokeWidth="2" />

        {/* Windows */}
        {[352, 388, 426].map((y, fi) => (
          <React.Fragment key={fi}>
            {[80, 130, 180, 230, 280].map((x, wi) => (
              <g key={wi}>
                <rect x={x} y={y} width="36" height="20" rx="2" fill="none" stroke="#0e2233" strokeWidth="1.8" />
                <line x1={x + 18} y1={y} x2={x + 18} y2={y + 20} stroke="#0e2233" strokeWidth="1.2" />
              </g>
            ))}
          </React.Fragment>
        ))}

        {/* Lena's window */}
        <g onClick={() => tap({ label: "Studio 4B", desc: "Your spot · 28 m² · 4th floor" })} style={{ cursor: "pointer" }}>
          <rect x="130" y="352" width="36" height="20" rx="2" fill="#ff7236" stroke="#0e2233" strokeWidth="2" />
          <text x="148" y="367" fontSize="9" fontWeight="900" fill="#0e2233" textAnchor="middle">4B</text>
        </g>

        {/* Ground-floor spaces */}
        <g onClick={() => tap({ label: "Lounge & bar", desc: "17–01 · pop in anytime" })} style={{ cursor: "pointer" }}>
          <rect x="70" y="458" width="78" height="46" rx="3" fill="#ff7236" stroke="#0e2233" strokeWidth="2.5" />
          <text x="109" y="479" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle">LOUNGE</text>
          <text x="109" y="492" fontSize="8" fontWeight="700" fill="#0e2233" textAnchor="middle" opacity="0.7">& BAR</text>
        </g>
        <g onClick={() => tap({ label: "Main entry", desc: "Tap-in 24/7 with your pass" })} style={{ cursor: "pointer" }}>
          <rect x="178" y="452" width="44" height="58" rx="3" fill="white" stroke="#0e2233" strokeWidth="3" />
          <rect x="184" y="458" width="32" height="46" fill="none" stroke="#0e2233" strokeWidth="2" />
          <line x1="200" y1="458" x2="200" y2="504" stroke="#0e2233" strokeWidth="2" />
          <circle cx="195" cy="481" r="1.5" fill="#0e2233" />
          <circle cx="205" cy="481" r="1.5" fill="#0e2233" />
        </g>
        <g onClick={() => tap({ label: "Canteen & shop", desc: "07–22 · breakfast included" })} style={{ cursor: "pointer" }}>
          <rect x="252" y="458" width="78" height="46" rx="3" fill="white" stroke="#0e2233" strokeWidth="2.5" />
          <text x="291" y="479" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle">CANTEEN</text>
          <text x="291" y="492" fontSize="8" fontWeight="700" fill="#0e2233" textAnchor="middle" opacity="0.7">& SHOP</text>
        </g>

        {/* Fire exits */}
        <g onClick={() => tap({ label: "Fire exit (west)", desc: "Sounds an alarm — use in emergency only" })} style={{ cursor: "pointer" }}>
          <circle cx="60" cy="481" r="6" fill="#0e2233" />
        </g>
        <g onClick={() => tap({ label: "Fire exit (east)", desc: "Sounds an alarm — use in emergency only" })} style={{ cursor: "pointer" }}>
          <circle cx="340" cy="481" r="6" fill="#0e2233" />
        </g>
      </g>
    </svg>
  );

  const floorPlan = (
    <svg className="map-svg" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floor-grid-4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" stroke="rgba(14,34,51,0.08)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect x="36" y="36" width="328" height="248" rx="8" fill="url(#floor-grid-4)" stroke="#0e2233" strokeWidth="3" />
      <rect x="184" y="148" width="32" height="48" fill="white" stroke="#0e2233" strokeWidth="2" strokeDasharray="3 3" rx="3" />
      <text x="200" y="176" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle">LIFT</text>

      <g onClick={() => tap({ label: "4A · Mira", desc: "Online · 'pop by if you're up'" })} style={{ cursor: "pointer" }}>
        <rect x="50" y="60" width="120" height="80" rx="4" fill="white" stroke="#0e2233" strokeWidth="2.5" />
        <text x="110" y="98" fontSize="11" fontWeight="800" fill="#0e2233" textAnchor="middle">4A</text>
        <text x="110" y="114" fontSize="9" fontWeight="600" fill="#0e2233" textAnchor="middle" opacity="0.6">Mira</text>
      </g>
      <g onClick={() => tap({ label: "Studio 4B — yours", desc: "28 m² · west-facing window · sun till 18:00" })} style={{ cursor: "pointer" }}>
        <rect x="50" y="148" width="120" height="80" rx="4" fill="#ff7236" stroke="#0e2233" strokeWidth="3" />
        <text x="110" y="186" fontSize="11" fontWeight="800" fill="#0e2233" textAnchor="middle">4B · YOU</text>
        <text x="110" y="202" fontSize="9" fontWeight="700" fill="#0e2233" textAnchor="middle" opacity="0.85">Studio · 28 m²</text>
        <g transform="translate(160, 130)">
          <path d="M 0 0 C -7 0 -12 5 -12 12 C -12 22 0 32 0 32 C 0 32 12 22 12 12 C 12 5 7 0 0 0 Z" fill="#0e2233" />
          <circle cx="0" cy="12" r="4" fill="#ff7236" />
        </g>
      </g>
      <g onClick={() => tap({ label: "4C · Jonas", desc: "Online · run club tomorrow 06:30" })} style={{ cursor: "pointer" }}>
        <rect x="230" y="60" width="120" height="80" rx="4" fill="white" stroke="#0e2233" strokeWidth="2.5" />
        <text x="290" y="98" fontSize="11" fontWeight="800" fill="#0e2233" textAnchor="middle">4C</text>
        <text x="290" y="114" fontSize="9" fontWeight="600" fill="#0e2233" textAnchor="middle" opacity="0.6">Jonas</text>
      </g>
      <g onClick={() => tap({ label: "4D · Theo", desc: "Movie night Saturday · S2" })} style={{ cursor: "pointer" }}>
        <rect x="230" y="148" width="120" height="80" rx="4" fill="white" stroke="#0e2233" strokeWidth="2.5" />
        <text x="290" y="186" fontSize="11" fontWeight="800" fill="#0e2233" textAnchor="middle">4D</text>
        <text x="290" y="202" fontSize="9" fontWeight="600" fill="#0e2233" textAnchor="middle" opacity="0.6">Theo</text>
      </g>
      <g onClick={() => tap({ label: "Shared bathrooms", desc: "Two showers, two stalls · cleaned daily 11:00" })} style={{ cursor: "pointer" }}>
        <rect x="50" y="240" width="300" height="34" rx="4" fill="white" stroke="#0e2233" strokeWidth="2" strokeDasharray="6 4" />
        <text x="200" y="262" fontSize="9" fontWeight="800" fill="#0e2233" textAnchor="middle" letterSpacing="0.08em">SHARED BATHROOMS</text>
      </g>
    </svg>
  );

  return (
    <div className="screen screen-enter">
      <DetailBar title="Building map" onBack={onBack} />

      <div className="map-page">
        <div className="map-floor-pick">
          <button className={`fp ${floor === "campus" ? "on" : ""}`} onClick={() => { setFloor("campus"); setActivePoi(null); }}>
            <Icon name="map" size={13} strokeWidth={2.4} /> Campus
          </button>
          <button className={`fp ${floor === "4" ? "on" : ""}`} onClick={() => { setFloor("4"); setActivePoi(null); }}>
            <Icon name="building-2" size={13} strokeWidth={2.4} /> Floor 4
          </button>
        </div>

        <div className="map-frame">
          {floor === "campus" ? campusView : floorPlan}
        </div>

        {activePoi && (
          <div className="poi-card">
            <div className="poi-ic">
              <Icon name="map-pin" size={16} />
            </div>
            <div className="poi-body">
              <div className="poi-t">{activePoi.label}</div>
              <div className="poi-s">{activePoi.desc}</div>
            </div>
            <button className="poi-close" onClick={() => setActivePoi(null)} aria-label="Close">
              <Icon name="x" size={14} />
            </button>
          </div>
        )}

        <div className="map-legend">
          <div className="lg"><span className="sw" style={{ background: "#ff7236" }} /> Your spot</div>
          <div className="lg"><span className="sw" style={{ background: "white", border: "2px solid #0e2233" }} /> Shared</div>
          <div className="lg"><span className="sw" style={{ background: "#cbd9c6", border: "1.5px solid #0e2233" }} /> Garden / grass</div>
          <div className="lg"><span className="sw" style={{ background: "#0e2233" }} /> Exit / service</div>
        </div>

        <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--us-mustard-100)", color: "var(--us-mustard-700)", borderRadius: 12, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="info" size={16} />
          <span>Tap any spot to see hours, capacity & who's there now.</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EventsAll, HostSheet, BuildingMap });
