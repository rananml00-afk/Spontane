import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error?.message || "Unknown application error",
    };
  }

  componentDidCatch(error: Error) {
    console.error("Application crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#ffffff",
            color: "#111827",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: "720px", textAlign: "center" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
              Spontane couldn’t load
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#4b5563" }}>
              The app hit a runtime error instead of rendering a blank white page.
            </p>
            <pre
              style={{
                marginTop: "16px",
                padding: "16px",
                borderRadius: "12px",
                background: "#f3f4f6",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function normalizePreviewPath() {
  const { pathname, search, hash } = window.location;
  const malformedPath = pathname.includes("http://") || pathname.includes("https://") || pathname.includes("/ttps://");

  if (malformedPath) {
    window.history.replaceState(null, "", `/${search}${hash}`);
  }
}

normalizePreviewPath();

createRoot(document.getElementById("root")!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>,
);
