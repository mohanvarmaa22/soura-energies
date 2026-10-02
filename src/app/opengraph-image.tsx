import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1c24",
          color: "#eef2f4",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: "#f0a30a" }}>{site.name}</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
          Rooftop solar for Telangana homes, with subsidy and loans handled.
        </div>
        <div style={{ fontSize: 32, color: "#9aa6ad" }}>{`Subsidy up to ${site.subsidyMax} · Free quote`}</div>
      </div>
    ),
    size,
  );
}
