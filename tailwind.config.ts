import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { colors: { hexa: { primary: "#2C3E50", ink: "#17242E", signal: "#C6D547" } } } }, plugins: [] } satisfies Config;
