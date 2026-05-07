import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const accent = "#ff6363";
const bg = "#07080a";
const surface2 = "#17191b";
const fg = "#f9f9f9";
const muted = "#9c9c9d";
const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", "Segoe UI", system-ui, sans-serif';

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fit = (frame: number, start: number, end: number, from: number, to: number) =>
  interpolate(frame, [start, end], [from, to], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fade = (frame: number, start: number, end: number) => fit(frame, start, end, 0, 1);

const Background = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.28;
  const glow = interpolate(Math.sin(frame / 32), [-1, 1], [0.05, 0.18]);

  return (
    <AbsoluteFill
      style={{
        background:
          `radial-gradient(circle at 50% 48%, rgba(255,99,99,${glow}) 0, transparent 34%), ` +
          `linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 ${drift}px/96px 96px, ` +
          `linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) ${drift}px 0/96px 96px, ${bg}`,
        overflow: "hidden",
        color: fg,
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75), transparent 20%, transparent 80%, rgba(0,0,0,0.75))",
        }}
      />
      <StripeWall side="left" frame={frame} />
      <StripeWall side="right" frame={frame} />
    </AbsoluteFill>
  );
};

const StripeWall = ({ side, frame }: { side: "left" | "right"; frame: number }) => {
  const x = side === "left" ? -30 + Math.sin(frame / 35) * 12 : 30 - Math.sin(frame / 35) * 12;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: 0,
        width: 360,
        opacity: 0.42,
        transform: `translateX(${x}px) ${side === "right" ? "scaleX(-1)" : ""}`,
        background:
          "repeating-linear-gradient(135deg, rgba(255,99,99,0.95) 0 3px, transparent 3px 22px)",
        maskImage: "linear-gradient(90deg, black, transparent)",
      }}
    />
  );
};

const Brand = ({ scale = 1 }: { scale?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, transform: `scale(${scale})`, transformOrigin: "left" }}>
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 9,
        background:
          "linear-gradient(135deg, transparent 42%, #ff6363 42% 56%, transparent 56%), #1b1c1e",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.14), 0 0 0 1px rgba(255,255,255,.1)",
      }}
    />
    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.3 }}>
      noCode<span style={{ color: muted }}>/</span>Human
    </div>
  </div>
);

const Badge = ({ size = 260, frameOffset = 0 }: { size?: number; frameOffset?: number }) => {
  const frame = useCurrentFrame() + frameOffset;
  const ring = frame * 0.55;
  const pulse = interpolate(Math.sin(frame / 18), [-1, 1], [0.94, 1.02]);
  return (
    <div style={{ position: "relative", width: size, height: size, transform: `scale(${pulse})` }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 20 + i * 18,
            borderRadius: "50%",
            border: `${i === 1 ? 2 : 1}px ${i === 1 ? "dashed" : "solid"} rgba(255,99,99,${0.42 - i * 0.1})`,
            transform: `rotate(${ring * (i % 2 === 0 ? 1 : -1)}deg)`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 42,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 46%, #17191b, #08090b 74%)",
          boxShadow: "0 26px 60px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.08)",
        }}
      />
      <Img
        src={staticFile("logo-badge.png")}
        style={{
          position: "absolute",
          inset: size * 0.25,
          width: size * 0.5,
          height: size * 0.5,
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const TerminalPanel = ({ frame }: { frame: number }) => {
  const lines = [
    ["$", "noch init landing-redesign"],
    [">", "Detecting stack . astro . convex . remotion"],
    [">", "Human verification . passed"],
    [">", "Templates ready . short clips . iOS factory"],
    [">", "AI handles mundane tasks . human signs off"],
  ];
  return (
    <div style={panelStyle({ width: 760, height: 360, padding: 0 })}>
      <div style={{ height: 52, borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 10, padding: "0 22px" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 14, height: 14, borderRadius: 99, background: c }} />
        ))}
        <span style={{ marginLeft: 12, font: `14px ${mono}`, color: muted }}>~/nocode-human - promo</span>
      </div>
      <div style={{ padding: 28, font: `20px ${mono}`, lineHeight: 1.72 }}>
        {lines.map((line, i) => {
          const on = frame > 8 + i * 12;
          return (
            <div key={line[1]} style={{ opacity: on ? 1 : 0.08, color: i > 1 ? accent : "#d7d7d7" }}>
              <span style={{ color: muted }}>{line[0]}</span> {line[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const panelStyle = ({ width, height, padding = 36 }: { width: number; height?: number; padding?: number }): React.CSSProperties => ({
  width,
  height,
  padding,
  borderRadius: 22,
  background: "linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.01)), #101111",
  border: "1px solid rgba(255,255,255,.09)",
  boxShadow: "0 34px 90px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04)",
});

const Intro = () => {
  const frame = useCurrentFrame();
  const title = fit(frame, 6, 46, 40, 0);
  const alpha = fade(frame, 0, 26);
  return (
    <AbsoluteFill style={{ padding: "88px 148px" }}>
      <div style={{ opacity: alpha }}>
        <Brand />
      </div>
      <div style={{ position: "absolute", top: 250, left: 260, right: 260, textAlign: "center" }}>
        <div style={{ font: `16px ${mono}`, color: muted, marginBottom: 32, opacity: fade(frame, 18, 46) }}>
          v0.3 . PUBLIC WAITLIST NOW OPEN
        </div>
        <div
          style={{
            fontSize: 118,
            lineHeight: 0.98,
            fontWeight: 750,
            letterSpacing: -4,
            transform: `translateY(${title}px)`,
            opacity: fade(frame, 10, 50),
          }}
        >
          Build with AI.
          <br />
          Stay <span style={{ color: accent }}>human</span>.
        </div>
        <div style={{ marginTop: 42, fontSize: 34, lineHeight: 1.35, color: "#d8d8d8", opacity: fade(frame, 52, 82) }}>
          Let AI do the mundane tasks.
          <br />
          Keep your judgment, taste, and name on the work.
        </div>
      </div>
      <div style={{ position: "absolute", right: 180, bottom: 90, opacity: fade(frame, 68, 98), transform: `translateY(${fit(frame, 68, 105, 40, 0)}px)` }}>
        <Badge size={250} />
      </div>
    </AbsoluteFill>
  );
};

const Verification = () => {
  const frame = useCurrentFrame();
  const checks = ["Identity attested", "Human-review checklist", "Public proof", "Revocable badge"];
  return (
    <AbsoluteFill style={{ padding: "104px 145px" }}>
      <SceneTitle kicker="01 - Human verification" title="A real person stands behind the ship." frame={frame} />
      <div style={{ position: "absolute", left: 150, bottom: 126, opacity: fade(frame, 25, 55), transform: `translateX(${fit(frame, 25, 55, -70, 0)}px)` }}>
        <TerminalPanel frame={frame} />
      </div>
      <div style={{ position: "absolute", right: 210, top: 250, opacity: fade(frame, 5, 45) }}>
        <Badge size={390} />
      </div>
      <div style={{ position: "absolute", right: 170, bottom: 130, display: "grid", gap: 16, width: 480 }}>
        {checks.map((check, i) => (
          <div
            key={check}
            style={{
              ...rowStyle,
              opacity: fade(frame, 44 + i * 9, 66 + i * 9),
              transform: `translateY(${fit(frame, 44 + i * 9, 66 + i * 9, 28, 0)}px)`,
            }}
          >
            <span style={checkBoxStyle}>✓</span>
            <span>{check}</span>
            <span style={{ marginLeft: "auto", color: muted, font: `14px ${mono}` }}>0{i + 1}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const rowStyle: React.CSSProperties = {
  height: 66,
  borderRadius: 12,
  background: surface2,
  border: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  alignItems: "center",
  gap: 18,
  padding: "0 20px",
  fontSize: 22,
};

const checkBoxStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  background: accent,
  display: "grid",
  placeItems: "center",
  color: "#200606",
  fontWeight: 800,
  boxShadow: "0 0 24px rgba(255,99,99,.34)",
};

const Templates = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: "104px 145px" }}>
      <SceneTitle kicker="02 - Automation templates" title="Agents for anything AI should not make you do by hand." frame={frame} />
      <div style={{ display: "flex", gap: 34, position: "absolute", left: 145, right: 145, top: 310 }}>
        <AgentCard
          frame={frame}
          delay={18}
          label="Short Clip Workflow Agent"
          title="Long-form URL -> clip pack"
          body="Transcript, hooks, captions, reframes, thumbnails, and posting copy."
          items={["Source pull", "Hook map", "Caption pass", "Export bundle"]}
        />
        <AgentCard
          frame={frame}
          delay={42}
          label="iOS App Factory Agent"
          title="Research -> App Store"
          body="Market research, design, SwiftUI code, testing, deploy, and monetization."
          items={["Research", "Design", "Code", "Testing", "Deploy", "Money"]}
        />
      </div>
    </AbsoluteFill>
  );
};

const AgentCard = ({
  frame,
  delay,
  label,
  title,
  body,
  items,
}: {
  frame: number;
  delay: number;
  label: string;
  title: string;
  body: string;
  items: string[];
}) => {
  const p = fade(frame, delay, delay + 34);
  return (
    <div
      style={{
        ...panelStyle({ width: 800, height: 520 }),
        opacity: p,
        transform: `translateY(${fit(frame, delay, delay + 34, 80, 0)}px) scale(${fit(frame, delay, delay + 34, 0.96, 1)})`,
      }}
    >
      <div style={{ font: `15px ${mono}`, color: accent, textTransform: "uppercase", marginBottom: 40 }}>. {label}</div>
      <div style={{ fontSize: 50, fontWeight: 750, lineHeight: 1.06, letterSpacing: -1.5 }}>{title}</div>
      <div style={{ fontSize: 24, color: muted, lineHeight: 1.45, marginTop: 24, maxWidth: 650 }}>{body}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14, marginTop: 46 }}>
        {items.map((item, i) => (
          <div key={item} style={{ ...miniCellStyle, opacity: fade(frame, delay + 44 + i * 5, delay + 60 + i * 5) }}>
            <span style={{ color: accent, font: `14px ${mono}` }}>0{i + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const miniCellStyle: React.CSSProperties = {
  minHeight: 78,
  padding: 16,
  borderRadius: 12,
  background: "rgba(255,255,255,.035)",
  border: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontSize: 18,
  fontWeight: 650,
};

const Mundane = () => {
  const frame = useCurrentFrame();
  const tasks = ["transcripts", "research", "test runs", "screenshots", "summaries", "deploy prep", "clip exports", "pricing checks"];
  const angle = frame * 0.012;
  return (
    <AbsoluteFill style={{ padding: "104px 145px" }}>
      <SceneTitle kicker="03 - Mundane work handled" title="AI moves the pixels. Humans make the calls." frame={frame} />
      <div style={{ position: "absolute", left: 720, top: 330, width: 480, height: 480 }}>
        <div
          style={{
            position: "absolute",
            inset: 90,
            borderRadius: "50%",
            border: "1px dashed rgba(255,99,99,.5)",
            transform: `rotate(${frame * 0.7}deg)`,
          }}
        />
        <div style={{ position: "absolute", left: 110, top: 110 }}>
          <Badge size={260} frameOffset={80} />
        </div>
        {tasks.map((task, i) => {
          const a = angle + (i / tasks.length) * Math.PI * 2;
          const x = Math.cos(a) * 330;
          const y = Math.sin(a) * 210;
          return (
            <div
              key={task}
              style={{
                position: "absolute",
                left: 190 + x,
                top: 205 + y,
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,.045)",
                border: "1px solid rgba(255,255,255,.08)",
                color: i % 2 === 0 ? fg : muted,
                font: `17px ${mono}`,
                opacity: fade(frame, 20 + i * 4, 44 + i * 4),
              }}
            >
              {task}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 190, bottom: 180, width: 520, fontSize: 36, lineHeight: 1.25, color: "#dcdcdc", opacity: fade(frame, 52, 84) }}>
        Automation should make you more present, not less accountable.
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: "104px 145px", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ opacity: fade(frame, 0, 35), transform: `translateY(${fit(frame, 0, 40, 50, 0)}px)` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 50 }}>
          <Brand scale={1.35} />
        </div>
        <div style={{ fontSize: 112, lineHeight: 0.98, fontWeight: 780, letterSpacing: -4 }}>
          Build with AI.
          <br />
          Stay <span style={{ color: accent }}>human</span>.
        </div>
        <div style={{ marginTop: 42, fontSize: 34, color: "#d8d8d8" }}>Join the waitlist. Get verified when doors open.</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTitle = ({ kicker, title, frame }: { kicker: string; title: string; frame: number }) => (
  <div style={{ opacity: fade(frame, 0, 28), transform: `translateY(${fit(frame, 0, 34, 36, 0)}px)` }}>
    <div style={{ font: `18px ${mono}`, color: muted, textTransform: "uppercase", marginBottom: 18 }}>// {kicker}</div>
    <div style={{ fontSize: 66, lineHeight: 1.02, fontWeight: 760, letterSpacing: -2.2, maxWidth: 1120 }}>{title}</div>
  </div>
);

export const Promo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: bg, color: fg, fontFamily: sans }}>
      <Background />
      <Sequence from={0} durationInFrames={150} premountFor={30}>
        <Intro />
      </Sequence>
      <Sequence from={126} durationInFrames={174} premountFor={30}>
        <Verification />
      </Sequence>
      <Sequence from={282} durationInFrames={186} premountFor={30}>
        <Templates />
      </Sequence>
      <Sequence from={444} durationInFrames={156} premountFor={30}>
        <Mundane />
      </Sequence>
      <Sequence from={582} durationInFrames={138} premountFor={30}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
