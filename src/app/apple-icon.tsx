import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0C",
        }}
      >
        <svg
          width="96"
          height="120"
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
      </div>
    ),
    {
      ...size,
    },
  );
}
