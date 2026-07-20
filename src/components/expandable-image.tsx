"use client";

import { useEffect, useState, type CSSProperties } from "react";

export function ExpandableImage({
  src,
  alt,
  style,
  className,
}: {
  src: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt ?? ""}
        style={{ ...style, cursor: "zoom-in" }}
        className={className}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "expanded photo"}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={src}
            alt={alt ?? ""}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "8px",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.55)",
            }}
          />
        </div>
      )}
    </>
  );
}
