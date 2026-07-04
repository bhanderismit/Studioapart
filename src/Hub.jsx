// Hub — guest-facing helpers (Wi-Fi share, 24h guest pass, door code, house info)

function Hub({ resident, onSharePass, onCopy }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [guestName, setGuestName] = React.useState("");
  const [passLive, setPassLive] = React.useState(false);
  const [copied, setCopied] = React.useState(null);     // last copied label, for transient highlight
  const [hours, setHours] = React.useState(24);

  const wifi = { ssid: "Uni-Stays Resident", password: "haslang2026", channel: "5 GHz" };
  const door = { code: "4127", lift: "4B" };

  const copy = (text, label) => {
    try { navigator.clipboard?.writeText(text); } catch (e) {}
    setCopied(label);
    setTimeout(() => setCopied(null), 1600);
    onCopy?.(label);
  };

  const issueGuestPass = () => {
    if (!guestName.trim()) return;
    setPassLive(true);
    onSharePass?.(guestName.trim());
    setTimeout(() => setPassLive(false), 6000);
  };

  const floorNum = (resident.floor || "").match(/\d+/)?.[0] || "4";

  return (
    <React.Fragment>
      <div className="hello">
        <span className="eyebrow">Hub</span>
        <h1>Quick-share with whoever stops by.</h1>
        <div className="sub">
          <span className="dot" style={{ background: "var(--us-success-500)" }} />
          Wi-Fi up · door buzzer working · lift online
        </div>
      </div>

      {/* Wi-Fi share card */}
      <div className="sec-head">
        <h2 className="t">Wi-Fi for guests</h2>
        <span className="l">{wifi.channel}</span>
      </div>
      <div className="wifi-card">
        <div className="wifi-left">
          <div className="wifi-ssid">
            <Icon name="wifi" size={16} color="var(--us-mustard-500)" />
            <span>{wifi.ssid}</span>
          </div>
          <div className="wifi-pw">
            <span className="pw-label">Password</span>
            <div className="pw-row">
              <span className="pw-val">{showPassword ? wifi.password : "•".repeat(wifi.password.length)}</span>
              <button className="pw-toggle" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide" : "Reveal"}>
                <Icon name={showPassword ? "eye-off" : "eye"} size={14} />
              </button>
            </div>
          </div>
          <div className="wifi-actions">
            <button
              className={`chip-btn ${copied === "Wi-Fi password" ? "done" : ""}`}
              onClick={() => copy(wifi.password, "Wi-Fi password")}>
              <Icon name={copied === "Wi-Fi password" ? "check" : "copy"} size={12} strokeWidth={2.6} />
              {copied === "Wi-Fi password" ? "Copied" : "Copy"}
            </button>
            <button className="chip-btn" onClick={() => copy(`WIFI:S:${wifi.ssid};T:WPA;P:${wifi.password};;`, "share link")}>
              <Icon name="share-2" size={12} /> Send link
            </button>
          </div>
        </div>
        <div className="wifi-qr">
          <div className="qr-frame">
            <QRSvg seed={wifi.ssid + wifi.password} />
          </div>
          <span className="qr-cap">Scan to join</span>
        </div>
      </div>

      {/* Guest pass — 24h */}
      <div className="sec-head">
        <h2 className="t">24-hour guest pass</h2>
        <span className="l">{passLive ? "Live now" : "Front door + lift"}</span>
      </div>
      <div className="guest-card">
        <div className="guest-art">
          {passLive ?
            <div className="qr-frame light">
              <QRSvg seed={`guest-${guestName}-${Date.now()}`} />
            </div>
           :
            <div className="guest-placeholder">
              <Icon name="ticket" size={26} />
              <span>QR appears here</span>
            </div>
          }
        </div>
        <div className="guest-form">
          <label>{passLive ? "Visiting" : "Visiting"}</label>
          <input
            type="text"
            placeholder="Friend's name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && guestName.trim()) issueGuestPass(); }}
          />
          <div className="guest-hours">
            {[6, 12, 24].map((h) => (
              <button
                key={h}
                className={`hr-chip ${hours === h ? "on" : ""}`}
                onClick={() => setHours(h)}>{h} h</button>
            ))}
          </div>
          <p className="guest-hint">
            Front door + lift to floor {floorNum} for {hours} h · we let the desk know.
          </p>
          <button
            className="btn-primary"
            style={{ height: 44, marginTop: 4 }}
            disabled={!guestName.trim() || passLive}
            onClick={issueGuestPass}>
            <Icon name={passLive ? "check" : "ticket"} size={16} strokeWidth={2.4} />
            {passLive ? `Live — show ${guestName.split(" ")[0]}` : `Issue ${hours}h pass`}
          </button>
        </div>
      </div>

      {/* Quick info — door code, lift, bin day */}
      <div className="sec-head">
        <h2 className="t">Tap to copy</h2>
        <span className="l">Door & lift</span>
      </div>
      <div className="quick-info">
        <div className={`qi ${copied === "Door code" ? "copied" : ""}`} onClick={() => copy(door.code, "Door code")}>
          <div className="qi-ic"><Icon name="door-open" size={18} /></div>
          <div className="qi-body">
            <div className="qi-l">Front door</div>
            <div className="qi-v">{door.code}</div>
          </div>
          <Icon name={copied === "Door code" ? "check" : "copy"} size={14} color={copied === "Door code" ? "var(--us-mustard-500)" : "var(--us-fg-muted)"} strokeWidth={copied === "Door code" ? 2.6 : 2} />
        </div>
        <div className={`qi ${copied === "Lift PIN" ? "copied" : ""}`} onClick={() => copy(door.lift, "Lift PIN")}>
          <div className="qi-ic"><Icon name="arrow-up-from-line" size={18} /></div>
          <div className="qi-body">
            <div className="qi-l">Lift PIN · floor {floorNum}</div>
            <div className="qi-v">{door.lift}</div>
          </div>
          <Icon name={copied === "Lift PIN" ? "check" : "copy"} size={14} color={copied === "Lift PIN" ? "var(--us-mustard-500)" : "var(--us-fg-muted)"} strokeWidth={copied === "Lift PIN" ? 2.6 : 2} />
        </div>
        <div className="qi static">
          <div className="qi-ic"><Icon name="trash-2" size={18} /></div>
          <div className="qi-body">
            <div className="qi-l">Bin night</div>
            <div className="qi-v">Sun · Wed</div>
          </div>
        </div>
        <div className="qi static">
          <div className="qi-ic"><Icon name="moon-star" size={18} /></div>
          <div className="qi-body">
            <div className="qi-l">Quiet hours</div>
            <div className="qi-v">22 → 07</div>
          </div>
        </div>
      </div>

      {/* Local recs around Haslangstraße */}
      <div className="sec-head">
        <h2 className="t">Closest, on foot</h2>
        <span className="l">Map <Icon name="chevron-right" size={12} /></span>
      </div>
      <div className="recs">
        {[
          { name: "Café Lichtenberg",      sub: "Coffee · open till 18:00",   d: "180 m",  walk: "2 min", ic: "coffee",         tone: "warm" },
          { name: "Edeka am Rathausplatz", sub: "Groceries · open till 22:00", d: "320 m",  walk: "4 min", ic: "shopping-cart",  tone: "navy" },
          { name: "Döner Anatolia",        sub: "Late-night · open till 03:00", d: "240 m", walk: "3 min", ic: "utensils",       tone: "warm" },
          { name: "Klenzepark",            sub: "Sunset spot by the Danube",  d: "650 m",  walk: "8 min", ic: "trees",          tone: "cool" },
        ].map((r) => (
          <div key={r.name} className="rec">
            <div className={`rec-ic ${r.tone}`}><Icon name={r.ic} size={18} /></div>
            <div className="rec-body">
              <div className="rec-n">{r.name}</div>
              <div className="rec-s">{r.sub}</div>
            </div>
            <div className="rec-dist">
              <span className="rd-w">{r.walk}</span>
              <span className="rd-d">{r.d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="sec-head">
        <h2 className="t">If something's wrong</h2>
      </div>
      <div className="emergency-row">
        <button className="emerg primary">
          <div className="emerg-ic"><Icon name="key-round" size={18} /></div>
          <div className="emerg-body">
            <div className="el">Locked out</div>
            <div className="es">Magda · front desk</div>
          </div>
        </button>
        <button className="emerg">
          <div className="emerg-ic"><Icon name="phone" size={18} /></div>
          <div className="emerg-body">
            <div className="el">Emergency</div>
            <div className="es">112</div>
          </div>
        </button>
      </div>

      <div style={{ height: 12 }} />
    </React.Fragment>
  );
}

Object.assign(window, { Hub });
