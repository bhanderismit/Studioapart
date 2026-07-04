// Home screen — the resident dashboard.

function Home({
  resident, rent, pulse, events, announcements, facilities, mates,
  reservations, going,
  onOpenEvent, onOpenAnnouncement, onOpenRent, onOpenFacility, onTabChange,
  onCancelReservation, onWaveMate, onRefresh, onOpenAutopay,
  onOpenAllEvents, onOpenMap,
  waved, greeting: greetingText,
  pulseAccent
}) {
  const stayPct = Math.round(resident.stayDay / resident.stayLength * 100);
  const daysLeft = resident.stayLength - resident.stayDay;
  const onlineMates = mates.filter((m) => m.state === "online").length;
  const homeMates = mates.filter((m) => m.state !== "off").length;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return "Late night";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const [filter, setFilter] = React.useState("all");
  const [favorited, setFavorited] = React.useState({});

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    if (filter === "tonight") return e.when.toLowerCase().startsWith("tonight");
    if (filter === "tomorrow") return e.when.toLowerCase().startsWith("tomorrow");
    if (filter === "week") return !e.when.toLowerCase().startsWith("tonight");
    if (filter === "going") return !!going[e.id];
    if (filter === "favs") return !!favorited[e.id];
    return true;
  });

  // Build "Your week" agenda: bookings + RSVP'd events, sorted
  const goingEvents = events.filter((e) => going[e.id]);
  const agenda = [
  ...reservations.map((r) => ({
    type: "booking",
    id: r.id,
    title: r.facility.name,
    when: `${r.dayLabel} · ${r.time}`,
    where: r.facility.sub.split(" · ")[0],
    icon: r.facility.ic
  })),
  ...goingEvents.map((e) => ({
    type: "event",
    id: e.id,
    eventRef: e,
    title: e.title,
    when: e.when,
    where: e.place,
    icon: "calendar"
  }))];


  return (
    <React.Fragment>
      <div className="hello hello-v2">
        <div className="hello-row">
          <div className="hello-text">
            <span className="eyebrow">{greeting}, {resident.firstName}</span>
            <h1>{greetingText || `Forty-seven days in. A quiet winter at Haslangstraße.`}</h1>
            <div className="sub">
              <span className="dot" style={{ background: homeMates > 0 ? "var(--us-success-500)" : "var(--us-ink-400)" }} />
              {homeMates > 0 ?
              `${homeMates} on your floor · ${onlineMates} active right now` :
              "Floor's quiet — nobody around"}
            </div>
          </div>
          <div className="hello-day" aria-label={`Day ${resident.stayDay} of ${resident.stayLength}`}>
            <span className="hd-num">{resident.stayDay}</span>
            <span className="hd-tot">/ {resident.stayLength}</span>
            <span className="hd-lbl">day of stay</span>
          </div>
        </div>
      </div>

      {/* Up next — the ONE thing that matters next */}
      <UpNext
        rent={rent}
        reservations={reservations}
        events={events}
        going={going}
        daysLeft={daysLeft}
        onOpenRent={onOpenRent}
        onOpenEvent={onOpenEvent}
        onCancelReservation={onCancelReservation}
        onOpenAllEvents={onOpenAllEvents}
      />

      {/* Stay hero — dark navy with progress ring */}
      <div className="stay-hero" onClick={() => onTabChange("stay")}>
        <div className="top">
          <span className="ek">
            <span className="live" />
            Your stay
          </span>
          <span className="key">
            <Icon name="key-round" size={11} /> Key #4B
          </span>
        </div>
        <div className="body">
          <div className="ring">
            <ProgressRing value={resident.stayDay} max={resident.stayLength} size={84} />
            <div className="num">
              {daysLeft}
              <small>left</small>
            </div>
          </div>
          <div className="txt">
            <div className="t1">{resident.unit} · {resident.floor}</div>
            <div className="t2">
              Moved in {resident.moveIn} · Keys back {resident.moveOut}
            </div>
          </div>
        </div>
        <div className="meta">
          <div className="m">
            <span className="k">Keys back</span>
            <span className="v">31 Mar <small>2026</small></span>
          </div>
          <div className="m">
            <span className="k">Deposit</span>
            <span className="v">€1 098 <small>held</small></span>
          </div>
          <div className="m">
            <span className="k">Rating</span>
            <span className="v">4.9 <small>★</small></span>
          </div>
        </div>
      </div>

      {/* Your week — bookings + RSVPs */}
      {agenda.length > 0 &&
      <React.Fragment>
          <div className="sec-head">
            <h2 className="t">Your week</h2>
            <span className="l">{agenda.length} confirmed</span>
          </div>
          <div className="week hide-scroll">
            {agenda.map((a) =>
          <div
            key={`${a.type}-${a.id}`}
            className={`agenda ${a.type === "booking" ? "booking" : ""}`}
            onClick={() => {
              if (a.type === "event") onOpenEvent(a.eventRef);
            }}>
            
                {a.type === "booking" &&
            <button
              className="cancel"
              onClick={(e) => {e.stopPropagation();onCancelReservation(a.id);}}
              aria-label="Cancel">
              
                    <Icon name="x" size={12} />
                  </button>
            }
                <div className="when">
                  <Icon name={a.icon} size={11} /> {a.when}
                </div>
                <div className="t">{a.title}</div>
                <div className="s">
                  <Icon name="map-pin" size={11} /> {a.where}
                </div>
              </div>
          )}
          </div>
        </React.Fragment>
      }

      {/* Rent card */}
      <div className="sec-head">
        <h2 className="t">December rent</h2>
        <span className="l" onClick={onOpenRent}>
          See breakdown <Icon name="chevron-right" size={12} />
        </span>
      </div>
      <div className="rent" onClick={onOpenRent}>
        <div className="head">
          <span className="lbl">Due in 16 days</span>
          <span className="status">
            <span className="d" /> Autopay ready
          </span>
        </div>
        <div className="amount">
          <span className="cur">€</span>
          {rent.amount}
          <span className="unit"> / month</span>
        </div>
        <div className="break">
          <span>€{rent.breakdown[0].v} base</span>·
          <span>€{rent.breakdown[1].v} utilities</span>·
          <span>€{rent.breakdown[2].v} Wi-Fi</span>·
          <span>€{rent.breakdown[3].v} community</span>
        </div>
        <div className="timeline">
          {rent.history.map((m, i) =>
          <div key={i} className={`cell ${m.state}`}>
              {m.month}
              <span className="yr">'{m.year}</span>
            </div>
          )}
        </div>
        <div className="foot" onClick={(e) => e.stopPropagation()}>
          <button className="pay" onClick={onOpenRent}>
            <Icon name="credit-card" size={14} /> Pay €{rent.amount} now
          </button>
          <button className="auto" onClick={(e) => { e.stopPropagation(); onOpenAutopay?.(); }} aria-label="Autopay settings">
            <Icon name="settings-2" size={14} />
          </button>
        </div>
      </div>

      {/* Pulse */}
      <div className="sec-head">
        <h2 className="t">Building pulse</h2>
        <span className="l">
          Now · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <div className="pulse">
        {pulse.map((p, i) =>
        <div key={i} className={`stat ${p.tone === "cool" ? "cool" : p.tone === "navy" ? "navy" : ""}`}>
            <div className="ic"><Icon name={p.ic} size={14} /></div>
            <div className="v">{p.v}<small>{p.suf || ""}</small></div>
            <div className="lbl">{p.lbl}</div>
          </div>
        )}
      </div>

      {/* Events */}
      <div className="sec-head">
        <h2 className="t">Tonight at home</h2>
        <span className="l" onClick={onOpenAllEvents}>
          All events <Icon name="chevron-right" size={12} />
        </span>
      </div>
      <div className="evfilter hide-scroll">
        {[
        { id: "all", l: "All" },
        { id: "tonight", l: "Tonight" },
        { id: "tomorrow", l: "Tomorrow" },
        { id: "week", l: "This week" },
        { id: "going", l: `Going · ${Object.values(going).filter(Boolean).length}` },
        ...(Object.values(favorited).filter(Boolean).length > 0 ? [{ id: "favs", l: `♥ ${Object.values(favorited).filter(Boolean).length}` }] : [])].
        map((c) =>
        <span key={c.id} className={`chip ${filter === c.id ? "on" : ""}`} onClick={() => setFilter(c.id)}>
            {c.l}
          </span>
        )}
      </div>
      <div className="events hide-scroll">
        {filteredEvents.length > 0 ?
        filteredEvents.map((e) =>
        <EventCard
          key={e.id}
          event={e}
          going={!!going[e.id]}
          favorited={!!favorited[e.id]}
          onToggleFav={(id) => setFavorited((f) => ({ ...f, [id]: !f[id] }))}
          onOpen={onOpenEvent} />

        ) :

        <div style={{ flex: 1, padding: "20px 16px", color: "var(--us-fg-muted)", fontSize: 12 }}>
            Nothing matches "{filter}" — try another filter.
          </div>
        }
      </div>

      {/* Announcements */}
      <div className="sec-head">
        <h2 className="t">From the front desk</h2>
        <span className="l" onClick={() => onTabChange("messages")}>
          Inbox <Icon name="chevron-right" size={12} />
        </span>
      </div>
      <div className="annc-row">
        {announcements.slice(0, 3).map((a) =>
        <div key={a.id} className="annc" onClick={() => onOpenAnnouncement(a)}>
            <div className={`badge ${a.kind}`}>
              <Icon name={a.icon} size={18} />
            </div>
            <div className="body">
              <div className="t">{a.title}</div>
              <div className="s">{a.sub} · {a.time}</div>
            </div>
            {a.unread && <div className="unread" />}
            <div className="chev"><Icon name="chevron-right" size={16} /></div>
          </div>
        )}
      </div>

      {/* Living together */}
      <div className="sec-head">
        <h2 className="t">Living together</h2>
        <span className="l" onClick={() => onTabChange("facility")}>
          Reserve <Icon name="chevron-right" size={12} />
        </span>
      </div>
      <div className="tiles">
        {facilities.slice(0, 4).map((f) => {
          const reservedCount = reservations.filter((r) => r.facility.id === f.id).length;
          return (
            <div key={f.id} className={`tile ${f.tone}`} onClick={() => onOpenFacility(f)}>
              {reservedCount > 0 &&
              <span className="reserved">
                  {reservedCount === 1 ? "Booked" : `${reservedCount} booked`}
                </span>
              }
              <div className="head">
                <div className="ic"><Icon name={f.ic} size={18} /></div>
                <span className={`open ${f.openClass || ""}`}>
                  <span className="d" /> {f.open}
                </span>
              </div>
              <div className="tile-mid">
                <div className="n">{f.name}</div>
                <div className="s">{f.sub}</div>
              </div>
              <div className="occ">
                {f.occ.map((h, i) =>
                <span key={i} className="b" style={{ height: 4 + h * 1.6 + "px", opacity: 0.4 + h * 0.08 }} />
                )}
              </div>
            </div>);

        })}
      </div>

      {/* Floor neighbours */}
      <div className="sec-head">
        <h2 className="t">On your floor</h2>
        <span className="l" onClick={onOpenMap}>
          Building map <Icon name="chevron-right" size={12} />
        </span>
      </div>
      <div className="mates hide-scroll">
        {mates.map((m, i) =>
        <div
          key={i}
          className={`mate ${m.state} ${waved && waved[m.name] ? "waved" : ""}`}
          onClick={() => onWaveMate(m)}>
          
            <div className="av" style={{ background: m.color }}>{m.init}</div>
            <div className="n">{m.name}</div>
            <div className="r">{m.role}</div>
            {waved && waved[m.name] &&
          <span className="wave-bubble">WAVED</span>
          }
          </div>
        )}
      </div>

      {/* Ask Magda — AI concierge */}
      <div className="sec-head">
        <h2 className="t">Ask the building</h2>
        <span className="l">Powered by Magda</span>
      </div>
      <div style={{ padding: "0 20px" }}>
        <ConciergeAsk resident={resident} />
      </div>

      <div className="home-foot">
        <span className="sig">—</span>
        Studioapart · {resident.building}, {resident.city}
      </div>
    </React.Fragment>);

}

Object.assign(window, { Home });