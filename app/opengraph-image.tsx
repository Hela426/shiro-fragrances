import { ImageResponse } from "next/og";

export const alt =
  "SHIRO Fragrances — The essence of simplicity";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 30,
          background: "#EAE5DC",
          color: "#191919",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: "1px solid #B4A998",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 8,
              color: "#756F67",
              marginBottom: 35,
            }}
          >
            THE ART OF FRAGRANCE
          </div>

          <div
            style={{
              fontSize: 125,
              letterSpacing: 28,
            }}
          >
            SHIRO
          </div>

          <div
            style={{
              fontSize: 19,
              letterSpacing: 16,
            }}
          >
            FRAGRANCES
          </div>

          <div
            style={{
              width: 130,
              height: 1,
              background: "#A69D8D",
              marginTop: 45,
              marginBottom: 35,
            }}
          />

          <div
            style={{
              fontSize: 42,
            }}
          >
            The essence of simplicity.
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#756F67",
              marginTop: 20,
            }}
          >
            Six fragrances. Six interpretations of nature.
          </div>

          <div
            style={{
              fontSize: 15,
              letterSpacing: 3,
              color: "#756F67",
              marginTop: 55,
            }}
          >
            A CONCEPT PROJECT BY KAREN BARON
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}