"use client";

import { useState } from "react";
import Link from "next/link";
import CredentialCard from "../components/CredentialCard";
import CredentialModal from "../components/CredentialModal";
import { credentials, type CredentialData } from "../data/credentials";
import { useModalUrlSync, slugify } from "../hooks/useModalUrlSync";

export default function CredentialsClientPage() {
  const [selectedCredential, setSelectedCredential] =
    useState<CredentialData | null>(null);

  const selectCredential = useModalUrlSync({
    paramName: "credential",
    items: credentials,
    getSlug: (c) => slugify(c.label),
    setSelectedItem: setSelectedCredential,
  });

  return (
    <div className="min-h-svh flex flex-col">
      <nav className="sticky top-0 z-50 bg-canvas px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto w-full py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-orange transition-colors duration-200 group font-mono text-sm tracking-widest uppercase"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:-translate-x-1 transition-transform duration-200"
            >
              <path
                d="M10 4L6 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Back
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col justify-center">
        <header className="px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20 lg:px-16 lg:pt-24 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-sm tracking-widest uppercase text-orange mb-4">
              Credentials
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Proof points,
              <br />
              <span className="text-orange">kept compact.</span>
            </h1>
          </div>
        </header>

        <section className="px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16 lg:pb-40">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((credential) => (
                <CredentialCard
                  key={credential.label}
                  credential={credential}
                  onSelect={selectCredential}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto px-6 py-8 border-t border-orange/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm text-text-muted">
          <Link
            href="/"
            className="text-text-secondary hover:text-orange transition-colors duration-200"
          >
            Back to home
          </Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <CredentialModal
        credential={selectedCredential}
        isOpen={selectedCredential !== null}
        onClose={() => selectCredential(null)}
      />
    </div>
  );
}
