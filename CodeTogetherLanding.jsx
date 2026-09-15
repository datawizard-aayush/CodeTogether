import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Small utilities                                                    */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Mascot — Bramble the octopus                                       */
/*  An original, geometric, friendly mark. Rounded mantle, two calm    */
/*  eyes, six curling arms. No relation to any existing mascot.        */
/* ------------------------------------------------------------------ */

function OctopusDefs() {
  return (
    <defs>
      <linearGradient id="mantleFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3EE8CF" />
        <stop offset="100%" stopColor="#1FA98F" />
      </linearGradient>
      <linearGradient id="armFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2FD9C4" />
        <stop offset="100%" stopColor="#17967F" />
      </linearGradient>
    </defs>
  );
}

/* Mark used in the nav / footer — small, quick to render */
function OctopusMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <OctopusDefs />
      <path
        d="M14 30c0-11 8-19 18-19s18 8 18 19c0 8-6 13-18 13S14 38 14 30Z"
        fill="url(#mantleFill)"
      />
      <circle cx="25.5" cy="27" r="3.4" fill="#0A0F12" />
      <circle cx="38.5" cy="27" r="3.4" fill="#0A0F12" />
      <circle cx="24.4" cy="25.8" r="1" fill="#EDF3F2" />
      <circle cx="37.4" cy="25.8" r="1" fill="#EDF3F2" />
      <path d="M27 35c2 1.6 8 1.6 10 0" stroke="#0A0F12" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M18 40c-3 3-3 8 1 10" stroke="url(#armFill)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M32 43c0 4 0 8 3 10" stroke="url(#armFill)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M46 40c3 3 3 8-1 10" stroke="url(#armFill)" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* Large hero illustration — mantle + six arms, each arm reaching
   toward a floating UI chip that is rendered separately in Hero(). */
function OctopusHero({ tilt }) {
  return (
    <svg
      className="octopus-hero__svg"
      viewBox="0 0 600 600"
      fill="none"
      role="img"
      aria-label="Bramble, the CodeTogether octopus, reaching six arms toward a code editor, a chat thread, a cursor, and a call panel"
    >
      <OctopusDefs />
      <radialGradient id="heroGlow" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stopColor="#1FA98F" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#1FA98F" stopOpacity="0" />
      </radialGradient>
      <circle cx="300" cy="300" r="290" fill="url(#heroGlow)" />

      {/* arms group — subtle parallax toward cursor */}
      <g
        className="octopus-hero__arms"
        style={{
          transform: `translate(${tilt.x * 0.6}px, ${tilt.y * 0.6}px)`,
        }}
      >
        <path className="arm arm--draw" style={{ animationDelay: "0.55s" }}
          d="M235,300 C176,336 132,356 146,408 C154,438 116,430 84,430"
          stroke="url(#armFill)" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path className="arm arm--draw" style={{ animationDelay: "0.7s" }}
          d="M270,328 C226,378 186,416 190,468 C192,500 168,520 166,542"
          stroke="url(#armFill)" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path className="arm arm--draw" style={{ animationDelay: "0.4s" }}
          d="M300,332 C300,398 258,438 300,478 C330,500 274,520 296,558"
          stroke="url(#armFill)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path className="arm arm--draw" style={{ animationDelay: "0.7s" }}
          d="M330,328 C374,378 414,416 410,468 C408,500 432,520 434,542"
          stroke="url(#armFill)" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path className="arm arm--draw" style={{ animationDelay: "0.55s" }}
          d="M365,300 C424,336 468,356 454,408 C446,438 484,430 516,430"
          stroke="url(#armFill)" strokeWidth="15" strokeLinecap="round" fill="none" />

        {/* suckers — small texture dots along two of the arms */}
        <circle cx="176" cy="352" r="5" fill="#12786A" />
        <circle cx="150" cy="392" r="4.5" fill="#12786A" />
        <circle cx="420" cy="352" r="5" fill="#12786A" />
        <circle cx="446" cy="392" r="4.5" fill="#12786A" />
      </g>

      {/* mantle */}
      <g className="octopus-hero__mantle">
        <path
          d="M220,258 C214,166 251,104 300,100 C349,104 386,166 380,258 C378,300 349,330 300,332 C251,330 222,300 220,258 Z"
          fill="url(#mantleFill)"
        />
        <path
          d="M228,150 C238,126 260,110 282,106"
          stroke="#8FF0DF" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55"
        />
        <circle cx="263" cy="214" r="17" fill="#0A0F12" />
        <circle cx="337" cy="214" r="17" fill="#0A0F12" />
        <circle cx="260.5" cy="211" r="4" fill="#EDF3F2" />
        <circle cx="334.5" cy="211" r="4" fill="#EDF3F2" />
        <path d="M278,254 Q300,266 322,254" stroke="#0A0F12" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* Small octopus used in the collaboration section, ringed by teammates */
function OctopusOrbit() {
  const nodes = [
    { label: "Priya", role: "Frontend", angle: -100 },
    { label: "Sam", role: "Backend", angle: -28 },
    { label: "Elena", role: "DevOps", angle: 40 },
    { label: "Marcus", role: "Design", angle: 118 },
    { label: "You", role: "Reviewing", angle: 190 },
  ];
  const R = 230;
  const cx = 300, cy = 300;

  return (
    <svg viewBox="0 0 600 600" className="octopus-orbit__svg" role="img" aria-label="Bramble at the center, connected to five teammates working around it">
      <OctopusDefs />
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const nx = cx + R * Math.cos(rad);
        const ny = cy + R * Math.sin(rad) * 0.78;
        const midx = cx + (R * 0.5) * Math.cos(rad + 0.25);
        const midy = cy + (R * 0.5) * Math.sin(rad + 0.25) * 0.78;
        return (
          <g key={n.label}>
            <path
              d={`M${cx},${cy} Q${midx},${midy} ${nx},${ny}`}
              stroke="#1FA98F" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" fill="none" opacity="0.7"
            />
          </g>
        );
      })}

      <path
        d="M255,268 C250,196 273,148 300,145 C327,148 350,196 345,268 C343,300 324,318 300,319 C276,318 257,300 255,268 Z"
        fill="url(#mantleFill)"
      />
      <circle cx="284" cy="222" r="10" fill="#0A0F12" />
      <circle cx="316" cy="222" r="10" fill="#0A0F12" />
      <circle cx="282" cy="220" r="2.4" fill="#EDF3F2" />
      <circle cx="314" cy="220" r="2.4" fill="#EDF3F2" />

      {nodes.map((n) => {
        const rad = (n.angle * Math.PI) / 180;
        const nx = cx + R * Math.cos(rad);
        const ny = cy + R * Math.sin(rad) * 0.78;
        return (
          <g key={n.label + "-node"} transform={`translate(${nx}, ${ny})`} className="orbit-node">
            <circle r="34" fill="#101820" stroke="#233038" strokeWidth="1.5" />
            <circle r="34" fill="none" />
            <text textAnchor="middle" y="-4" className="orbit-node__initial">{n.label[0]}</text>
            <text textAnchor="middle" y="14" className="orbit-node__role">{n.role}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <OctopusMark size={30} />
          <span>CodeTogether</span>
        </a>
        <nav className="nav__links">
          <a href="#code">Code</a>
          <a href="#chat">Chat</a>
          <a href="#calls">Calls</a>
          <a href="#collaboration">Team</a>
        </nav>
        <a href="#top" className="btn btn--primary btn--small">Start Building</a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 22, y: py * 16 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className={`hero__copy${loaded ? " hero__copy--in" : ""}`}>
          <h1 className="hero__title">
            <span className="hero__title-line">CODE</span>
            <span className="hero__title-line">TOGETHER.</span>
          </h1>
          <p className="hero__sub">
            A collaborative workspace where developers can code, communicate and
            solve problems together — without switching between multiple platforms.
          </p>
          <div className="hero__actions">
            <a href="#code" className="btn btn--primary">Start Building</a>
            <a href="#collaboration" className="btn btn--ghost">Explore Workspace</a>
          </div>
        </div>

        <div
          className={`hero__visual${loaded ? " hero__visual--in" : ""}`}
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <OctopusHero tilt={tilt} />

          <div className="chip chip--code" style={{ left: "13%", top: "70%" }}>
            <div className="chip__dot" style={{ background: "#2FD9C4" }} />
            <code>const room = joinSession()</code>
          </div>

          <div className="chip chip--chat" style={{ left: "26%", top: "91%" }}>
            <span className="chip__avatar">P</span>
            <span>ship it, tests are green</span>
          </div>

          <div className="chip chip--cursor" style={{ left: "74%", top: "91%" }}>
            <span className="chip__cursor" />
            <span>elena is typing…</span>
          </div>

          <div className="chip chip--call" style={{ left: "87%", top: "70%" }}>
            <span className="chip__live" />
            <span>Live · 3 in call</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Code                                                      */
/* ------------------------------------------------------------------ */

function CodeSection() {
  const files = ["merge.ts", "session.ts", "cursor.ts", "presence.ts"];
  const lines = [
    { n: 1, t: "import", c: "session", rest: " from './core'" },
    { n: 2, t: "", c: "", rest: "" },
    { n: 3, t: "export function", c: " mergeChanges", rest: "(a, b) {" },
    { n: 4, t: "  return", c: " session", rest: ".resolve(a, b)" },
    { n: 5, t: "}", c: "", rest: "" },
  ];
  return (
    <section id="code" className="section">
      <div className="section__inner section__inner--split">
        <Reveal className="section__copy">
          <h2 className="section__title">Write code together.</h2>
          <p className="section__text">
            Open a file and see teammates arrive with you — every cursor, edit
            and selection appears the instant it happens. No pull request
            required just to think out loud.
          </p>
          <p className="section__text">
            The file explorer, the terminal and the diff view stay in the same
            window as the conversation about them, so context never gets lost
            between tools.
          </p>
        </Reveal>

        <Reveal className="section__visual" delay={100}>
          <div className="code-window">
            <div className="code-window__bar">
              <span className="dot dot--r" /><span className="dot dot--y" /><span className="dot dot--g" />
              <span className="code-window__tab">merge.ts</span>
            </div>
            <div className="code-window__body">
              <div className="file-explorer">
                {files.map((f, i) => (
                  <div key={f} className={`file-explorer__item${i === 0 ? " file-explorer__item--active" : ""}`}>{f}</div>
                ))}
              </div>
              <div className="code-lines">
                {lines.map((l) => (
                  <div key={l.n} className="code-line">
                    <span className="code-line__n">{l.n}</span>
                    <span className="code-line__kw">{l.t}</span>
                    <span className="code-line__id">{l.c}</span>
                    <span className="code-line__rest">{l.rest}</span>
                  </div>
                ))}
                <div className="cursor-flag" style={{ top: "62px", left: "168px" }}>
                  <span className="cursor-flag__caret" />
                  <span className="cursor-flag__label">priya</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Chat                                                      */
/* ------------------------------------------------------------------ */

function ChatSection() {
  const messages = [
    { who: "Marcus", msg: "pushed the auth refactor, can someone take a look?", me: false },
    { who: "You", msg: "on it — pulling the branch now", me: true },
    { who: "Elena", msg: "the token refresh logic looks solid 👍", me: false },
  ];
  const members = [
    { name: "Marcus", online: true },
    { name: "Elena", online: true },
    { name: "Sam", online: false },
    { name: "Priya", online: true },
  ];
  return (
    <section id="chat" className="section section--tint">
      <div className="section__inner section__inner--split section__inner--reverse">
        <Reveal className="section__visual" delay={100}>
          <div className="chat-panel">
            <div className="chat-panel__main">
              {messages.map((m, i) => (
                <div key={i} className={`msg${m.me ? " msg--me" : ""}`}>
                  <span className="msg__avatar">{m.who[0]}</span>
                  <div className="msg__bubble">
                    <span className="msg__who">{m.who}</span>
                    <span className="msg__text">{m.msg}</span>
                  </div>
                </div>
              ))}
              <div className="typing">
                <span className="msg__avatar msg__avatar--ghost">S</span>
                <div className="typing__dots"><i /><i /><i /></div>
              </div>
            </div>
            <div className="chat-panel__members">
              <span className="chat-panel__members-label">Online</span>
              {members.map((m) => (
                <div key={m.name} className="member">
                  <span className={`member__dot${m.online ? " member__dot--on" : ""}`} />
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="section__copy">
          <h2 className="section__title">Talk while you build.</h2>
          <p className="section__text">
            The conversation happens right beside the code, not in a separate
            app you have to alt-tab to find. Mention a file and the thread
            keeps it attached.
          </p>
          <p className="section__text">
            See who's online, who's heads-down, and who just fixed the bug
            you were about to ask about.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Calls                                                     */
/* ------------------------------------------------------------------ */

function CallsSection() {
  const participants = ["Elena", "Priya", "Marcus", "You"];
  return (
    <section id="calls" className="section">
      <div className="section__inner section__inner--stack">
        <Reveal className="section__copy section__copy--center">
          <h2 className="section__title">See the problem. Solve it together.</h2>
          <p className="section__text section__text--center">
            Jump on a call without leaving the workspace. Share a screen,
            point at a line of code, and keep typing the fix while you talk.
          </p>
        </Reveal>

        <Reveal className="section__visual" delay={100}>
          <div className="calls-panel">
            <div className="calls-panel__bar">
              <span className="live-dot" /> Live — screen sharing "session.ts"
            </div>
            <div className="calls-panel__body">
              <div className="calls-panel__screen">
                <div className="calls-panel__screen-line" style={{ width: "70%" }} />
                <div className="calls-panel__screen-line" style={{ width: "45%" }} />
                <div className="calls-panel__screen-line" style={{ width: "85%" }} />
                <div className="calls-panel__screen-line" style={{ width: "30%" }} />
                <div className="calls-panel__screen-line calls-panel__screen-line--accent" style={{ width: "55%" }} />
              </div>
              <div className="calls-panel__people">
                {participants.map((p, i) => (
                  <div key={p} className={`participant${i === 0 ? " participant--speaking" : ""}`}>
                    <span className="participant__avatar">{p[0]}</span>
                    <span className="participant__name">{p}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="participant__mic">
                      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Collaboration                                             */
/* ------------------------------------------------------------------ */

function CollabSection() {
  return (
    <section id="collaboration" className="section section--tint">
      <div className="section__inner section__inner--stack">
        <Reveal className="octopus-orbit">
          <OctopusOrbit />
        </Reveal>
        <Reveal className="section__copy section__copy--center" delay={80}>
          <h2 className="section__title">One project. One workspace. One team.</h2>
          <p className="section__text section__text--center">
            Bramble keeps every arm on something different — a file, a
            conversation, a call — so your team never has to be. Everyone
            works from the same source of truth, at the same time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA + Footer                                                 */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="final">
      <svg className="final__blob" viewBox="0 0 800 400" aria-hidden="true">
        <path
          d="M50,200 C50,90 180,30 340,40 C520,52 620,110 700,200 C620,290 520,348 340,360 C180,370 50,310 50,200 Z"
          fill="#1FA98F" opacity="0.14"
        />
      </svg>
      <Reveal className="final__inner">
        <h2 className="final__title">Build together. Ship together.</h2>
        <a href="#top" className="btn btn--primary btn--large">Start Building</a>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="nav__brand">
          <OctopusMark size={24} />
          <span>CodeTogether</span>
        </a>
        <p className="footer__tag">Code, talk and ship in one workspace.</p>
        <p className="footer__copy">© {new Date().getFullYear()} CodeTogether. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                                */
/* ------------------------------------------------------------------ */

export default function CodeTogetherLanding() {
  return (
    <div className="site">
      <GlobalStyles />
      <Nav />
      <Hero />
      <CodeSection />
      <ChatSection />
      <CallsSection />
      <CollabSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

      :root {
        --ink: #0A0F12;
        --ink-2: #10171B;
        --ink-3: #141C21;
        --line: #212B30;
        --paper: #EAF0EF;
        --paper-dim: #9DACAA;
        --kelp: #2FD9C4;
        --kelp-deep: #1FA98F;
        --signal: #FF8A54;
        --signal-deep: #E56E3A;
      }

      * { box-sizing: border-box; }

      .site {
        background: var(--ink);
        color: var(--paper);
        font-family: 'Inter', sans-serif;
        line-height: 1.5;
        overflow-x: hidden;
      }

      .site h1, .site h2 {
        font-family: 'Space Grotesk', sans-serif;
        margin: 0;
        color: var(--paper);
      }

      a { color: inherit; text-decoration: none; }

      /* ---------- reveal ---------- */
      .reveal {
        opacity: 0;
        transform: translateY(22px);
        transition: opacity 0.7s cubic-bezier(.16,.84,.44,1), transform 0.7s cubic-bezier(.16,.84,.44,1);
      }
      .reveal--visible { opacity: 1; transform: translateY(0); }

      /* ---------- buttons ---------- */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 26px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: 0.01em;
        transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        border: 1px solid transparent;
        cursor: pointer;
      }
      .btn--primary { background: var(--signal); color: #1A0D05; }
      .btn--primary:hover { background: var(--signal-deep); transform: translateY(-2px); }
      .btn--ghost { border-color: var(--line); color: var(--paper); }
      .btn--ghost:hover { border-color: var(--kelp); color: var(--kelp); transform: translateY(-2px); }
      .btn--small { padding: 9px 18px; font-size: 0.85rem; }
      .btn--large { padding: 18px 36px; font-size: 1.05rem; }

      /* ---------- nav ---------- */
      .nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 50;
        padding: 20px 0;
        transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
        border-bottom: 1px solid transparent;
      }
      .nav--scrolled {
        background: rgba(10,15,18,0.86);
        backdrop-filter: blur(10px);
        padding: 14px 0;
        border-color: var(--line);
      }
      .nav__inner {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }
      .nav__brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1.05rem;
      }
      .nav__links { display: flex; gap: 28px; }
      .nav__links a { color: var(--paper-dim); font-size: 0.92rem; transition: color 0.2s ease; }
      .nav__links a:hover { color: var(--paper); }
      @media (max-width: 760px) { .nav__links { display: none; } }

      /* ---------- hero ---------- */
      .hero {
        padding: 168px 28px 120px;
        max-width: 1280px;
        margin: 0 auto;
      }
      .hero__inner {
        display: grid;
        grid-template-columns: 1fr 1.05fr;
        gap: 40px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .hero__inner { grid-template-columns: 1fr; }
      }

      .hero__copy { opacity: 0; transform: translateY(18px); transition: opacity 0.8s ease, transform 0.8s ease; }
      .hero__copy--in { opacity: 1; transform: translateY(0); }

      .hero__title {
        font-size: clamp(3.4rem, 8vw, 6.6rem);
        font-weight: 700;
        line-height: 0.98;
        letter-spacing: -0.02em;
      }
      .hero__title-line { display: block; }

      .hero__sub {
        margin: 28px 0 36px;
        max-width: 46ch;
        font-size: 1.12rem;
        color: var(--paper-dim);
      }

      .hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }

      .hero__visual {
        position: relative;
        aspect-ratio: 1 / 1;
        max-width: 620px;
        margin: 0 auto;
        opacity: 0;
        transform: scale(0.94);
        transition: opacity 1s ease 0.15s, transform 1s ease 0.15s;
      }
      .hero__visual--in { opacity: 1; transform: scale(1); }
      .octopus-hero__svg { width: 100%; height: 100%; }

      .arm--draw {
        stroke-dasharray: 420;
        stroke-dashoffset: 420;
        animation: draw-arm 1.1s cubic-bezier(.2,.8,.2,1) forwards;
      }
      @keyframes draw-arm { to { stroke-dashoffset: 0; } }

      .octopus-hero__arms { animation: sway 7s ease-in-out infinite; transition: transform 0.4s ease-out; transform-origin: 300px 300px; }
      @keyframes sway {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(0.6deg); }
      }

      .chip {
        position: absolute;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--ink-2);
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 9px 13px;
        font-size: 0.8rem;
        color: var(--paper);
        white-space: nowrap;
        box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        opacity: 0;
        animation: chip-in 0.6s ease forwards;
      }
      .chip--code { animation-delay: 1.5s; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; }
      .chip--chat { animation-delay: 1.7s; }
      .chip--cursor { animation-delay: 1.85s; }
      .chip--call { animation-delay: 2s; }
      @keyframes chip-in {
        from { opacity: 0; transform: translate(-50%, -40%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
      }
      .chip__dot { width: 7px; height: 7px; border-radius: 50%; }
      .chip__avatar {
        width: 20px; height: 20px; border-radius: 50%;
        background: var(--kelp-deep); color: #06211C;
        font-size: 0.66rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
      }
      .chip__cursor { width: 8px; height: 8px; background: var(--signal); border-radius: 2px 50% 50% 50%; display: inline-block; }
      .chip__live { width: 8px; height: 8px; border-radius: 50%; background: #FF5C5C; box-shadow: 0 0 0 0 rgba(255,92,92,0.6); animation: pulse-dot 1.8s ease-out infinite; }
      @keyframes pulse-dot {
        0% { box-shadow: 0 0 0 0 rgba(255,92,92,0.5); }
        70% { box-shadow: 0 0 0 8px rgba(255,92,92,0); }
        100% { box-shadow: 0 0 0 0 rgba(255,92,92,0); }
      }

      /* ---------- generic section ---------- */
      .section { padding: 110px 28px; }
      .section--tint { background: var(--ink-2); }
      .section__inner { max-width: 1180px; margin: 0 auto; }
      .section__inner--split {
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        gap: 64px;
        align-items: center;
      }
      .section__inner--reverse { grid-template-columns: 1.15fr 0.85fr; }
      @media (max-width: 900px) {
        .section__inner--split, .section__inner--reverse { grid-template-columns: 1fr; }
        .section__inner--reverse .section__copy { order: 2; }
      }
      .section__inner--stack { display: flex; flex-direction: column; align-items: center; gap: 48px; text-align: center; }

      .section__title {
        font-size: clamp(1.9rem, 3.4vw, 2.7rem);
        font-weight: 600;
        letter-spacing: -0.01em;
        margin-bottom: 20px;
      }
      .section__text { color: var(--paper-dim); font-size: 1.02rem; max-width: 42ch; margin: 0 0 14px; }
      .section__text--center { max-width: 52ch; margin-left: auto; margin-right: auto; }
      .section__copy--center { max-width: 640px; }

      /* ---------- code window ---------- */
      .code-window {
        background: var(--ink-3);
        border: 1px solid var(--line);
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 30px 60px rgba(0,0,0,0.35);
      }
      .code-window__bar {
        display: flex; align-items: center; gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--line);
      }
      .dot { width: 9px; height: 9px; border-radius: 50%; }
      .dot--r { background: #FF5F57; }
      .dot--y { background: #FEBC2E; }
      .dot--g { background: #28C840; }
      .code-window__tab { margin-left: 12px; font-size: 0.78rem; color: var(--paper-dim); font-family: 'JetBrains Mono', monospace; }
      .code-window__body { display: grid; grid-template-columns: 130px 1fr; min-height: 240px; }
      .file-explorer { border-right: 1px solid var(--line); padding: 14px 0; }
      .file-explorer__item { padding: 8px 16px; font-size: 0.8rem; color: var(--paper-dim); font-family: 'JetBrains Mono', monospace; cursor: default; }
      .file-explorer__item--active { color: var(--kelp); background: rgba(47,217,196,0.08); border-right: 2px solid var(--kelp); }
      .code-lines { position: relative; padding: 18px 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; }
      .code-line { display: flex; gap: 14px; padding: 3px 0; }
      .code-line__n { color: #445056; width: 14px; }
      .code-line__kw { color: #6FC7FF; }
      .code-line__id { color: var(--kelp); }
      .code-line__rest { color: var(--paper-dim); }
      .cursor-flag { position: absolute; display: flex; flex-direction: column; align-items: flex-start; }
      .cursor-flag__caret { width: 2px; height: 18px; background: var(--signal); animation: blink 1s step-end infinite; }
      .cursor-flag__label { margin-top: 2px; background: var(--signal); color: #1A0D05; font-size: 0.62rem; padding: 1px 6px; border-radius: 4px; font-family: 'Inter', sans-serif; font-weight: 600; }
      @keyframes blink { 50% { opacity: 0; } }

      /* ---------- chat ---------- */
      .chat-panel {
        background: var(--ink-3);
        border: 1px solid var(--line);
        border-radius: 14px;
        display: grid;
        grid-template-columns: 1fr 160px;
        min-height: 300px;
        box-shadow: 0 30px 60px rgba(0,0,0,0.35);
        overflow: hidden;
      }
      .chat-panel__main { padding: 22px; display: flex; flex-direction: column; gap: 16px; }
      .msg { display: flex; gap: 10px; align-items: flex-start; }
      .msg--me { flex-direction: row-reverse; }
      .msg--me .msg__bubble { background: rgba(47,217,196,0.12); align-items: flex-end; text-align: right; }
      .msg__avatar {
        width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
        background: var(--kelp-deep); color: #06211C; font-size: 0.72rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
      }
      .msg__avatar--ghost { background: var(--ink-2); border: 1px dashed var(--line); color: var(--paper-dim); }
      .msg__bubble { display: flex; flex-direction: column; background: var(--ink-2); border-radius: 10px; padding: 8px 12px; max-width: 320px; }
      .msg__who { font-size: 0.68rem; color: var(--paper-dim); margin-bottom: 2px; }
      .msg__text { font-size: 0.9rem; }
      .typing { display: flex; align-items: center; gap: 10px; }
      .typing__dots { display: flex; gap: 4px; background: var(--ink-2); padding: 8px 12px; border-radius: 10px; }
      .typing__dots i { width: 5px; height: 5px; border-radius: 50%; background: var(--paper-dim); display: inline-block; animation: typing 1.2s infinite; }
      .typing__dots i:nth-child(2) { animation-delay: 0.15s; }
      .typing__dots i:nth-child(3) { animation-delay: 0.3s; }
      @keyframes typing { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
      .chat-panel__members { border-left: 1px solid var(--line); padding: 20px 16px; display: flex; flex-direction: column; gap: 12px; }
      .chat-panel__members-label { font-size: 0.7rem; color: var(--paper-dim); margin-bottom: 4px; }
      .member { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }
      .member__dot { width: 7px; height: 7px; border-radius: 50%; background: #445056; }
      .member__dot--on { background: #35D67C; }

      /* ---------- calls ---------- */
      .calls-panel {
        background: var(--ink-3);
        border: 1px solid var(--line);
        border-radius: 14px;
        width: 100%;
        max-width: 900px;
        overflow: hidden;
        box-shadow: 0 30px 60px rgba(0,0,0,0.35);
      }
      .calls-panel__bar { display: flex; align-items: center; gap: 8px; padding: 12px 18px; border-bottom: 1px solid var(--line); font-size: 0.8rem; color: var(--paper-dim); }
      .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #FF5C5C; animation: pulse-dot 1.8s ease-out infinite; }
      .calls-panel__body { display: grid; grid-template-columns: 1fr 150px; }
      .calls-panel__screen { padding: 26px; display: flex; flex-direction: column; gap: 12px; justify-content: center; min-height: 220px; }
      .calls-panel__screen-line { height: 8px; border-radius: 4px; background: var(--ink-2); }
      .calls-panel__screen-line--accent { background: rgba(47,217,196,0.4); }
      .calls-panel__people { border-left: 1px solid var(--line); padding: 18px 14px; display: flex; flex-direction: column; gap: 16px; }
      .participant { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--paper-dim); }
      .participant--speaking .participant__avatar { box-shadow: 0 0 0 2px var(--kelp); }
      .participant__avatar { width: 26px; height: 26px; border-radius: 50%; background: var(--ink-2); border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: var(--paper); }
      .participant__name { flex: 1; }
      .participant__mic { color: var(--paper-dim); }

      /* ---------- collaboration orbit ---------- */
      .octopus-orbit { width: 100%; max-width: 640px; }
      .octopus-orbit__svg { width: 100%; height: auto; }
      .orbit-node__initial { fill: var(--paper); font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; }
      .orbit-node__role { fill: var(--paper-dim); font-family: 'Inter', sans-serif; font-size: 9px; }

      /* ---------- final CTA ---------- */
      .final { position: relative; padding: 150px 28px; text-align: center; overflow: hidden; }
      .final__blob { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
      .final__inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 34px; }
      .final__title { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 700; max-width: 16ch; letter-spacing: -0.01em; }

      /* ---------- footer ---------- */
      .footer { border-top: 1px solid var(--line); padding: 48px 28px; }
      .footer__inner { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
      .footer__tag { color: var(--paper-dim); font-size: 0.9rem; margin: 4px 0; }
      .footer__copy { color: #5A6669; font-size: 0.78rem; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}
