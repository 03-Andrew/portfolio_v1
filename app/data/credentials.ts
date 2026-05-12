export interface CredentialData {
  label: string;
  detail: string;
  type: "cert" | "award";
  date: string;
  skills: string[];
  verifyUrl?: string;
}

export const credentials: CredentialData[] = [
  {
    label: "CCNA",
    detail: "Cisco Certified Network Associate",
    type: "cert",
    date: "Issued February 2026",
    skills: ["Networking", "Routing", "Switching", "Security", "TCP/IP", "VLAN", "WAN"],
    verifyUrl: "https://www.credly.com/badges/",
  },
  {
    label: "2nd Place",
    detail: "MCITS 2024 Coding Competition",
    date: "April 2024",
    type: "award",
    skills: ["Problem Solving", "Algorithms", "Competitive Programming"],
  },
];
