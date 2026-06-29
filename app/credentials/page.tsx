import type { Metadata } from "next";
import CredentialsClientPage from "./CredentialsClientPage";

export const metadata: Metadata = {
  title: "Credentials & Certifications | James Andrei Nadela",
  description: "Professional certifications, academic history, and industry credentials of James Andrei Nadela.",
};

export default function CredentialsPage() {
  return <CredentialsClientPage />;
}
