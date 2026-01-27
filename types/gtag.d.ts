interface Window {
  dataLayer: unknown[];
  gtag: (
    command: "config" | "event" | "js",
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
}
