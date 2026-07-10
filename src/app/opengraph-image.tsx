import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Orguljarstvo Kvaternik — Orgulje koje stvaraju dušu prostora.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0B0B0C 0%, #151515 55%, #0B0B0C 100%)",
          padding: "72px 80px",
          color: "#F8F5F0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <svg
            width="72"
            height="92"
            viewBox="0 0 28 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="10" width="3.5" height="26" rx="0.5" fill="#B38A5A" />
            <rect x="7" y="6" width="3.5" height="30" rx="0.5" fill="#B38A5A" />
            <rect x="13" y="14" width="3.5" height="22" rx="0.5" fill="#B38A5A" />
            <rect x="19" y="2" width="3.5" height="34" rx="0.5" fill="#B38A5A" />
            <rect x="25" y="8" width="2" height="28" rx="0.5" fill="#8B6F47" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Orguljarstvo Kvaternik
            </div>
            <div
              style={{
                width: 96,
                height: 2,
                background: "#B38A5A",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.25,
              color: "#CFC7BC",
              maxWidth: 900,
            }}
          >
            Orgulje koje stvaraju dušu prostora.
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8B6F47",
            }}
          >
            Draganovec, Hrvatska
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
