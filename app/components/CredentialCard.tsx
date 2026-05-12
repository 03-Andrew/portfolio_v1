"use client";

import type { CredentialData } from "../data/credentials";

export default function CredentialCard({
  credential,
  onSelect,
}: {
  credential: CredentialData;
  onSelect: (credential: CredentialData) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(credential)}
      className="text-left p-5 sm:p-6 border border-border/30 bg-surface/30 flex flex-col justify-between hover:bg-surface transition-colors duration-500 cursor-pointer"
    >
      <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-orange-muted">
        {credential.type === "cert" ? "Certification" : "Award"}
      </span>
      <div>
        <h4 className="font-heading text-lg sm:text-xl text-text-primary mb-1">
          {credential.label}
        </h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          {credential.detail}
        </p>
      </div>
      <span className="font-mono text-[10px] tracking-widest uppercase border-t border-border/20 pt-4 text-text-muted">
        {credential.skills.join(" · ")}
      </span>
    </button>
  );
}
