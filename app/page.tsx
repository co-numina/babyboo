"use client";
import { useState, useEffect, useRef } from "react";

const ca = "PASTE_CA_HERE";

/* ── Symptom Tracker Viz ── */
function SymptomTracker() {
  const [cases, setCases] = useState(847291);
  const [states, setStates] = useState(47);
  const [rate, setRate] = useState(12.4);

  useEffect(() => {
    const id = setInterval(() => {
      setCases(c => c + Math.floor(Math.random() * 30) + 5);
      if (Math.random() > 0.95) setStates(s => Math.min(50, s + 1));
      setRate(r => Math.round((r + (Math.random() - 0.4) * 0.3) * 10) / 10);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {[
        { label: "Confirmed Cases", value: cases.toLocaleString(), color: "#dc2626" },
        { label: "States Affected", value: `${states}/50`, color: "#d97706" },
        { label: "Growth Rate", value: `${rate}%/day`, color: "#2563eb" },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 8, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Jitter Animation ── */
function JitterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const W = 600, H = 200;
    let stickFigures: { x: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < 8; i++) {
      stickFigures.push({ x: 40 + i * 70, phase: Math.random() * Math.PI * 2, speed: 2 + Math.random() * 3 });
    }

    const draw = () => {
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, W, H);

      stickFigures.forEach(fig => {
        const t = Date.now() / 1000;
        const jx = Math.sin(t * fig.speed + fig.phase) * 8;
        const jy = Math.cos(t * fig.speed * 1.3 + fig.phase) * 5;
        const armAngle = Math.sin(t * fig.speed * 0.7 + fig.phase) * 0.6;
        const legAngle = Math.cos(t * fig.speed * 0.9 + fig.phase) * 0.4;

        const cx = fig.x + jx;
        const cy = 60 + jy;

        ctx.strokeStyle = "#374151";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        // head
        ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.stroke();
        // body
        ctx.beginPath(); ctx.moveTo(cx, cy + 10); ctx.lineTo(cx, cy + 50); ctx.stroke();
        // arms
        ctx.beginPath();
        ctx.moveTo(cx, cy + 20);
        ctx.lineTo(cx - 25 * Math.cos(armAngle), cy + 20 + 25 * Math.sin(armAngle));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + 20);
        ctx.lineTo(cx + 25 * Math.cos(-armAngle), cy + 20 + 25 * Math.sin(-armAngle));
        ctx.stroke();
        // legs
        ctx.beginPath();
        ctx.moveTo(cx, cy + 50);
        ctx.lineTo(cx - 20 * Math.cos(legAngle), cy + 50 + 30 * Math.sin(Math.abs(legAngle) + 0.5));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + 50);
        ctx.lineTo(cx + 20 * Math.cos(-legAngle), cy + 50 + 30 * Math.sin(Math.abs(legAngle) + 0.5));
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return <canvas ref={ref} width={600} height={200} style={{ width: "100%", maxWidth: 600, height: "auto" }} />;
}

/* ── Copy CA ── */
function CopyCA() {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(ca); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: copied ? "#dc2626" : "transparent", border: "1px solid #e5e7eb", color: copied ? "white" : "#6b7280", padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all .2s" }}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── Timeline ── */
const TIMELINE = [
  { date: "Sep 2025", event: "NBA YoungBoy 'What You Is' dance trend goes viral on TikTok", type: "origin" },
  { date: "Jan 2026", event: "Remixing escalates — every song gets the Baby Boo treatment", type: "spread" },
  { date: "Feb 6, 2026", event: "@kkingmf posts 'White Ferrari' × 'What You Is' remix, invents the jitter", type: "key" },
  { date: "Feb 10, 2026", event: "First 'Baby Boo Syndrome' video: 'Caught this girl with babyboo syndrome sitting alone'", type: "key" },
  { date: "Feb 12, 2026", event: "Fake news report compiling clips goes mega-viral", type: "spread" },
  { date: "Feb 15, 2026", event: "KYM confirms entry. Baby Boo Syndrome officially documented.", type: "confirmed" },
  { date: "Feb 20, 2026", event: "$BABYBOO launches. Fund the cure.", type: "token" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif" }}>

      {/* Alert Banner */}
      <div style={{ background: "#dc2626", color: "white", padding: "10px 24px", fontSize: 13, textAlign: "center", fontWeight: 600, letterSpacing: "0.02em" }}>
        ⚠ PUBLIC HEALTH ADVISORY — BABY BOO SYNDROME — LEVEL 3 MEMETIC OUTBREAK ⚠
      </div>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 28px", borderBottom: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.95)", position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 16 }}>!</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>$BABYBOO</span>
          <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, background: "#fef2f2", padding: "2px 8px", borderRadius: 4, border: "1px solid #fecaca" }}>ACTIVE OUTBREAK</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "6px 14px", borderRadius: 6, position: "absolute", left: "50%", transform: "translateX(-50%)", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>CA</span>
          <code style={{ fontSize: 12, color: "#111827" }}>{ca}</code>
          <CopyCA />
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#6b7280" }}>
          <a href="#timeline" style={{ color: "#6b7280", textDecoration: "none" }}>Timeline</a>
          <a href="#symptoms" style={{ color: "#6b7280", textDecoration: "none" }}>Symptoms</a>
          <a href="#faq" style={{ color: "#6b7280", textDecoration: "none" }}>FAQ</a>
          <a href="https://knowyourmeme.com/memes/baby-boo-syndrome" target="_blank" rel="noopener" style={{ color: "#6b7280", textDecoration: "none" }}>KYM</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem 3rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "#dc2626", fontWeight: 600, marginBottom: 24 }}>
          TikTok Memetic Pathogen — Feb 2026
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#111827" }}>
          Baby Boo<br /><span style={{ color: "#dc2626" }}>Syndrome</span>
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 560, margin: "1.5rem auto 0", lineHeight: 1.7 }}>
          An involuntary condition where victims begin jittering, half-dancing, and moving erratically 
          to NBA YoungBoy × Frank Ocean remixes. No known cure. Spreading rapidly across all 50 states.
        </p>
        <p style={{ fontSize: 15, color: "#dc2626", fontWeight: 600, marginTop: 12 }}>
          $BABYBOO funds the research. Buy to support awareness.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: "2rem" }}>
          <a href="#tracker" style={{ padding: "12px 24px", background: "#dc2626", color: "white", fontWeight: 600, textDecoration: "none", fontSize: 14, borderRadius: 6 }}>View outbreak tracker</a>
          <a href="https://knowyourmeme.com/memes/baby-boo-syndrome" target="_blank" rel="noopener" style={{ padding: "12px 24px", border: "1px solid #e5e7eb", color: "#111827", textDecoration: "none", fontSize: 14, borderRadius: 6 }}>Read KYM entry</a>
        </div>
      </section>

      {/* Jitter Visualization */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem 3rem", textAlign: "center" }}>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.5rem", background: "white", overflow: "hidden" }}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>Live symptom visualization — affected individuals exhibiting involuntary Baby Boo movements</div>
          <JitterCanvas />
        </div>
      </section>

      {/* Outbreak Tracker */}
      <section id="tracker" style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Outbreak tracker</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Real-time monitoring of Baby Boo Syndrome spread across the United States.</p>
        <SymptomTracker />
      </section>

      {/* What Is It */}
      <section id="symptoms" style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>What is Baby Boo Syndrome?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { title: "Symptoms", desc: "Involuntary jittering, erratic half-dancing, zombie-like movements, inability to stop Babybooing. Triggered by hearing any NBA YoungBoy × Frank Ocean remix.", color: "#dc2626" },
            { title: "Transmission", desc: "Highly memetic. Spreads through TikTok FYP exposure. One viewing of the White Ferrari × What You Is remix is enough for full onset. No physical contact required.", color: "#d97706" },
            { title: "Prognosis", desc: "No known cure. Symptoms may subside when trending cycle ends (estimated Q2 2026). Some patients report brief remission between remix drops.", color: "#2563eb" },
            { title: "Demographics", desc: "Primarily affects ages 14-25. College campuses are hotspots. Lunch tables identified as primary outbreak sites. Saferooms being established.", color: "#059669" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: 10, background: "white" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginBottom: 12 }} />
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>Outbreak timeline</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 20 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.type === "key" ? "#dc2626" : item.type === "token" ? "#2563eb" : "#d4d4d8", border: "2px solid white", boxShadow: "0 0 0 1px #e5e7eb" }} />
                {i < TIMELINE.length - 1 && <div style={{ width: 2, flexGrow: 1, background: "#e5e7eb", marginTop: 4 }} />}
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4, fontWeight: 500 }}>{item.date}</div>
                <div style={{ fontSize: 14, color: item.type === "token" ? "#2563eb" : "#111827", fontWeight: item.type === "key" || item.type === "token" ? 600 : 400 }}>{item.event}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Origin / Attribution */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "2rem", background: "white" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Origin & attribution</h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
            Baby Boo Syndrome originated from the <strong style={{ color: "#111827" }}>NBA YoungBoy</strong> &quot;What You Is&quot; dance trend on TikTok (Sep 2025). 
            The syndrome variant was created by TikToker <strong style={{ color: "#111827" }}>@kkingmf</strong> who posted the White Ferrari × What You Is remix on Feb 6, 2026. 
            The term &quot;Baby Boo Syndrome&quot; was coined by <strong style={{ color: "#111827" }}>@yazimenz</strong> and first appeared on Feb 10, 2026. 
            Documented on <a href="https://knowyourmeme.com/memes/baby-boo-syndrome" target="_blank" rel="noopener" style={{ color: "#dc2626", textDecoration: "none" }}>Know Your Meme</a> on Feb 15, 2026.
          </p>
          <p style={{ fontSize: 15, color: "#111827", fontWeight: 600, marginTop: 12 }}>
            The meme is theirs. The awareness campaign is ours.
          </p>
        </div>
      </section>

      {/* Why Token */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>Why a token?</h2>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
          Baby Boo Syndrome is spreading faster than any meme in 2026. There is no cure. There is no treatment. 
          There is only <span style={{ color: "#dc2626", fontWeight: 600 }}>$BABYBOO</span> — funding awareness, tracking the outbreak, 
          and building the world&apos;s first memetic disease surveillance network on Solana.
        </p>
      </section>

      {/* Utility */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>What $BABYBOO funds</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { title: "Outbreak tracking", desc: "Real-time surveillance of Baby Boo Syndrome spread across TikTok, Instagram, and X. State-by-state heat maps." },
            { title: "Remix research", desc: "Cataloging every Baby Boo remix variant. Identifying which combinations are most virulent. White Ferrari × What You Is remains Patient Zero." },
            { title: "Awareness campaigns", desc: "Warning labels on high-risk TikTok content. PSA distribution. College campus alert systems." },
            { title: "Cure development", desc: "Experimental treatments including controlled exposure therapy, noise-canceling headphones, and touching grass." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: 10, background: "white" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24 }}>FAQ</h2>
        {[
          { q: "Is Baby Boo Syndrome real?", a: "Baby Boo Syndrome is a memetic condition documented on Know Your Meme. It is not a medical illness. However, the involuntary urge to Babyboo when hearing the remix is very real and affects millions." },
          { q: "How do I know if I have it?", a: "Symptoms include: involuntary jittering when hearing NBA YoungBoy, erratic arm movements, the inability to sit still at lunch tables, and humming 'She Gon' Call Me Baby Boo' in public." },
          { q: "Is there a cure?", a: "No known cure exists. Experimental treatments include deleting TikTok, extended outdoor exposure, and listening to classical music for 72 consecutive hours. Results vary." },
          { q: "What does $BABYBOO do?", a: "Funds awareness, outbreak tracking, and remix research. Also trades on Raydium because awareness isn't free." },
          { q: "Who started this?", a: "The Baby Boo dance: @dabigback. The White Ferrari remix: @kkingmf. The syndrome framing: @yazimenz. The token: us. Credit where it's due." },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#111827" }}>{item.q}</h3>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "2rem 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 10 }}>!</div>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>$BABYBOO — Baby Boo Syndrome Awareness</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
          <a href="https://knowyourmeme.com/memes/baby-boo-syndrome" target="_blank" rel="noopener" style={{ color: "#6b7280", textDecoration: "none" }}>KYM</a>
          <a href="https://www.tiktok.com/tag/babyboo" target="_blank" rel="noopener" style={{ color: "#6b7280", textDecoration: "none" }}>TikTok</a>
        </div>
      </footer>
    </div>
  );
}
