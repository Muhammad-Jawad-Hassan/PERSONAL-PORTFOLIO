import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const TITLE_DEFAULT = `${profile.name} · ${profile.role}`;
const DESCRIPTION =
  "Senior AI/ML and Backend Engineer specializing in agentic AI, RAG architectures, knowledge graphs, and scalable asynchronous backends. Building production-grade AI products across healthcare, fintech, and insurance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s · ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    profile.name,
    "Senior AI Engineer",
    "AI Engineer",
    "ML Engineer",
    "Backend Engineer",
    "LangGraph",
    "LangChain",
    "RAG",
    "MCP",
    "Generative AI",
    "Computer Vision",
    "FastAPI",
    "Agentic AI",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    creator: "@MIANJAWADAMIN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#03050b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="bg-base text-fg min-h-full">
        {children}
        <Cursor />
      </body>
    </html>
  );
}
