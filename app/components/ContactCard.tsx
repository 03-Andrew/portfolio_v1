"use client";

import React from "react";

interface ContactCardProps {
  title: string;
  label: string;
  href?: string;
  onClick?: () => void;
  description?: string;
  isDoubleWide?: boolean;
  icon: React.ReactNode;
}

export default function ContactCard({
  title,
  label,
  href,
  onClick,
  description,
  isDoubleWide = false,
  icon,
}: ContactCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between w-full gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] tracking-wider uppercase text-text-muted">
            {label}
          </span>
          <span className={`${isDoubleWide ? "text-lg sm:text-xl" : "text-base"} font-bold text-text-primary group-hover:text-orange transition-colors duration-200 break-all`}>
            {title}
          </span>
          {description && (
            <p className="text-text-secondary text-sm mt-1">
              {description}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-sm bg-text-primary/5 text-text-secondary group-hover:bg-orange/10 group-hover:text-orange transition-all duration-300 shrink-0 ${
          isDoubleWide ? "p-3 rounded-full bg-orange/10 border border-orange/20 text-orange group-hover:bg-orange group-hover:text-white" : ""
        }`}>
          {icon}
        </div>
      </div>
      {!isDoubleWide && (
        <div className="flex justify-end w-full mt-4">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-muted group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      )}
    </>
  );

  const baseClassName = `flex flex-col justify-between p-5 rounded-sm border border-border bg-surface/30 hover:bg-surface/50 hover:border-orange/30 transition-all duration-300 group ${
    isDoubleWide ? "col-span-1 sm:col-span-2 p-6" : ""
  }`;

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClassName} cursor-pointer text-left w-full`}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClassName}
    >
      {content}
    </a>
  );
}
