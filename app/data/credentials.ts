export interface CredentialData {
  label: string;
  detail: string;
  type: "cert" | "award";
  date: string;
  skills: string[];
  image?: {
    src: string;
    alt: string;
  };
  verifyUrl?: string;
}

export const credentials: CredentialData[] = [
  {
    label: "CCNA",
    detail: "Cisco Certified Network Associate",
    type: "cert",
    date: "Issued February 2026",
    skills: ["Networking", "Routing", "Switching", "Security", "TCP/IP", "VLAN", "WAN"],
    image: {
      src: "/ccna.png",
      alt: "Cisco Certified Network Associate badge",
    },
    verifyUrl: "https://www.credly.com/badges/d4345091-0898-4bad-a36b-6095fe782e05/public_url",
  },
  {
    label: "2nd Place",
    detail: "MCITS 2024 Coding Competition",
    date: "April 2024",
    type: "award",
    skills: ["Problem Solving", "Algorithms", "Competitive Programming"],
    verifyUrl: "https://www.facebook.com/share/1BMqK5mzdw/",
    image: {
      src: "/coding_cert.jpeg",
      alt: "Certificate for 2nd place in MCITS 2024 Coding Competition",
    }
  },
  {
    label: "3rd Place",
    detail: "DICT Region XI Regional Startup Pitching Competition 2025",
    date: "October 2025",
    type: "award",
    skills: ["Problem Solving", "Pitching"],
    verifyUrl: "https://www.facebook.com/share/p/18XH2yvg36/",
  },
];
