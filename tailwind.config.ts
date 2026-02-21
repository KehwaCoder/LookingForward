import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#3A3A3A",
        copper: "#C56A2D",
        warmgray: "#6E6E6E"
      },
      boxShadow: {
        glass: "0 14px 40px rgba(36, 36, 36, 0.2)",
        copper: "0 0 28px rgba(197, 106, 45, 0.4)"
      },
      backgroundImage: {
        "copper-glow": "radial-gradient(circle at top, rgba(197,106,45,0.35), rgba(255,255,255,0) 60%)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 rgba(197,106,45,0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(197,106,45,0.35)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
