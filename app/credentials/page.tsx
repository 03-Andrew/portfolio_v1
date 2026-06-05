import type { Metadata } from "next";
import CredentialsClientPage from "./CredentialsClientPage";

export const metadata: Metadata = {
  title: "Credentials & Certifications | Andrew",
  description: "Professional certifications, academic history, and industry credentials verifying engineering capabilities.",
};

export default function CredentialsPage() {
  return <CredentialsClientPage />;
}
