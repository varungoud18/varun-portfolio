import { useState, useEffect, useRef } from "react";
import { Mail, ExternalLink, Download, ArrowRight, Menu, X, Sun, Moon, Award } from "lucide-react";

const PROFILE = {
  name: "Varun Goud Karupothula",
  short: "VGK",
  logoText: "Varun Goud Karupothula",
  tagline: "Building production-style systems across the stack — from database schema design to model deployment.",
  status: "Open to SDE & AI/ML Engineer roles",
  email: "varungoudk03@gmail.com",
  github: "https://github.com/varungoud18",
  linkedin: "https://www.linkedin.com/in/varungoud18/",
  resumeUrl: "#", // Add link to your PDF resume here
  photo: "/profile.jpg",
};

const NAV_LINKS = [
  { label: "Home", href: "#top", hash: "#home" },
  { label: "About", href: "#about", hash: "/about" },
  { label: "Skills", href: "#skills", hash: "#skills" },
  { label: "Projects", href: "#projects", hash: "/projects" },
  { label: "Certifications", href: "#certifications", hash: "#certificates" },
  { label: "Contact", href: "#contact", hash: "#contact" },
];

const TECH_TICKER = [
  "React", "Python", "Java", "FastAPI", "PostgreSQL", "TensorFlow",
  "Supabase", "FAISS", "Vite", "MongoDB", "Git", "Scikit-learn",
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "Vellore Institute of Technology, Amaravathi",
    detail: "CGPA 8.25 — coursework in DSA, Operating Systems, DBMS, Computer Networks, OOP.",
    time: "2023 — 2027",
  },
  {
    degree: "Intermediate (Class XII)",
    school: "Sri Chaitanya Junior College",
    detail: "95.1%",
    time: "2020 — 2022",
  },
  {
    degree: "Secondary School Certificate (Class X)",
    school: "Dr. K.K.R's Gowtham School",
    detail: "CGPA 10",
    time: "2019 — 2020",
  },
];

const SKILLS = [
  {
    label: "Programming & Frameworks",
    count: 7,
    items: ["Python", "Java", "JavaScript", "FastAPI", "React", "HTML", "CSS"]
  },
  {
    label: "Data & AI Engineering",
    count: 9,
    items: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "FAISS", "PostgreSQL", "MySQL", "MongoDB", "Supabase"]
  },
  {
    label: "Tools & Methodologies",
    count: 7,
    items: ["Git", "GitHub", "VS Code", "Vite", "Vercel", "Data Analytics", "Agile Concepts"]
  },
  {
    label: "Core CS Foundations",
    count: 5,
    items: ["Data Structures & Algorithms", "DBMS", "Object-Oriented Programming (OOP)", "Operating Systems", "Computer Networks"]
  },
  {
    label: "Core Competencies",
    count: 4,
    items: ["Analytical Thinking", "Problem Solving", "Cross-Functional Communication", "Teamwork"]
  }
];

const PROJECTS = [
  {
    id: "PRJ_01",
    title: "Studyys — AI-Powered Study Assistant",
    github: "https://github.com/varungoud18/Studyys",
    live: "https://studyys.vercel.app/",
    desc: "Document-aware study assistant with custom exam compilers, active recall simulators, and a peer-to-peer library. Google Gemini 1.5 Flash powers a contextual chat engine that retrieves textbook definitions. Client-side PDF parsing via PDF.js and Web Workers runs entirely in-browser, backed by a 15-table normalized PostgreSQL schema on Supabase with row-level security.",
    tags: ["React", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "Google Gemini API", "Recharts", "Vercel"],
    metric: "25% lower answer latency · sub-5s client-side parsing",
  },
  {
    id: "PRJ_02",
    title: "Semantic Cache Search Engine",
    github: "https://github.com/varungoud18/Semantic_Cache_Search",
    live: "https://semantic-cache-search.vercel.app/",
    desc: "Cluster-aware semantic search engine with GMM-based cache routing, a CPU-optimized FAISS index, and a React dashboard. Queries are encoded into 384-dim embeddings via SentenceTransformers and clustered with GMM to achieve high cache-hit rates at scale.",
    tags: ["Python", "React", "FastAPI", "TypeScript", "Tailwind CSS", "Docker", "FAISS", "Sentence Transformers"],
    metric: "35–45% cache hit rate · sub-ms retrieval over 20,000+ docs · 80% faster on cache hits",
  },
  {
    id: "PRJ_03",
    title: "Heart Disease Detection — CNN + LSTM",
    github: "https://github.com/varungoud18/Heart-Disease-Detection-using-Hybrid-CNN-and-LSTM",
    live: null,
    desc: "5-phase deep learning pipeline for ECG heartbeat classification on the MIT-BIH Arrhythmia Database, mapped to AAMI categories. A hybrid 1D-CNN + LSTM architecture extracts waveform features and captures temporal patterns, with Butterworth bandpass filtering and class-imbalance handling.",
    tags: ["Python", "TensorFlow", "NumPy", "Pandas", "Matplotlib"],
    metric: "98.7% accuracy · 97.4% F1-score · beats CNN-only (94.2%) and LSTM-only (91.8%) baselines",
  },
];

const CERTS = [
  {
    name: "OCI 2025 Certified Generative AI Professional",
    org: "Oracle",
    year: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3F4F3570C7B4CD7C8C5169A4BC5BC673F1B1919962F9F21E7FC829C86E60FDDB",
  },
  {
    name: "OCI 2025 Certified AI Foundations Associate",
    org: "Oracle",
    year: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F21FEC73BCD25131D28B34C28855F8967CFE0C51D2C885DD457FB1241484AA61",
  },
];

function GithubIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.8.55A10.53 10.53 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function getSkillIcon(skill) {
  switch (skill) {
    case "Java":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 19.3c0 2.2 4.1 2.7 8.2 2.7 4.2 0 8.2-.5 8.2-2.7a5 5 0 0 0-2.4-3.5c3.5 0 5-1.1 5-2.1v-.2c0-1.1-1.5-2-5-2.1h-.1c-3.5 0-6.1-.9-6.1-2.2v-.1c0-1.2 2-2.1 5.3-2.1 1.2 0 2.5.2 3.6.4 1-.8 1.9-1.9 2.5-3 .7-1.1.8-2 .4-2.5-.5-.7-2-.8-3.4-.6-.6-2-1.8-3.5-2.6-4.5L10 1c-.8.8-1.5 2.1-1.3 3.6-1.5.3-2.7 1.2-3 2.2-.4 1.2.2 2.2 1.3 2.7.6-2 1.9-3 3.3-3.3 1-.2 1.8.3 1.8.9 0 .8-.8 1.9-1.5 2.9l-1.3 2.2c-.7 1.2-.6 2.5.3 3.5.5.5 1.2.8 2 .9-1 .1-1.9.2-2.8.2-3.4-.1-6.1-1.1-6.1-2.4a3.8 3.8 0 0 1 1.3-2.4l-.8-.8A5 5 0 0 0 2 19.3z" />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.25.18a5.25 5.25 0 0 0-1.54.93C11.3 2.53 11.37 4 12.8 4.7l1.37.7a7.7 7.7 0 0 1 3.5 4.8 5.3 5.3 0 0 1-.76 4.3 6.9 6.9 0 0 1-3.6 2.58l-1.55.45c-2.4.67-4.1.75-5.2-.67a3.5 3.5 0 0 1-.82-2.86v-.02a6.3 6.3 0 0 1 .53-2.28 10.3 10.3 0 0 1 3-3.65c.67-.5 1.55-.93 2.45-1.25l.84-.25A5.2 5.2 0 0 0 15 5.5v-1a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v1.88c0 1.2.45 2.25 1.12 3a5.2 5.2 0 0 0 2.25 1.25h1.88A3.1 3.1 0 0 1 15 14.5v1.88a4 4 0 0 1-4 4H9.12c-2.2 0-4-1.8-4-4v-1a5.2 5.2 0 0 0-1.12-3.13c-.67-.75-1.55-1.12-2.63-1.12H.12A5.2 5.2 0 0 0 0 12v2a5.2 5.2 0 0 0 5.25 5.25h1.87v1a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-1.88c0-1.2-.45-2.25-1.13-3a5.2 5.2 0 0 0-2.25-1.25h-1.88A3.1 3.1 0 0 1 9 11.5V9.62A4 4 0 0 1 13 5.6h1.88c2.2 0 4 1.8 4 4v1c0 1.2.45 2.25 1.13 3 .67.75 1.55 1.12 2.63 1.12h1.25A5.2 5.2 0 0 0 24 12v-2a5.2 5.2 0 0 0-5.25-5.25h-1.88v-1a4 4 0 0 0-2.62-3.57z" />
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.268c-.165-.925-.9-.912-1.561-.912-.665 0-1.005.3-1.15.6-.28.525-.27 1.425.435 1.5.84.09 1.94-.015 2.276-.585.045-.075.11-.195.11-.225a.3.3 0 0 0-.11-.378zm-3.047-5.02c-.88-.285-1.85-.36-2.525-.36-1.515 0-2.925.645-3.3 2.01-.435 1.59.39 2.625 1.86 3.12 1.35.45 2.16.63 2.16 1.185 0 .54-.57.87-1.215.87-.825 0-1.29-.405-1.5-1.005-.195-.57-.75-.825-1.245-.63-.465.195-.69.72-.51 1.2.48 1.29 1.635 2.165 3.39 2.165 2.175 0 3.825-1.155 3.825-3.12 0-2.01-1.395-2.61-3.21-3.21-.9-.3-1.635-.45-1.635-.915 0-.42.45-.675.99-.675.69 0 1.245.36 1.455.9.165.465.66.72 1.14.54.495-.195.735-.735.54-1.23a4.037 4.037 0 0 0-3.3-2.115zm-7.618-.465c-.885-.18-1.575.24-1.845.81-.195.39-.24.96-.24 2.19v2.175c0 1.2-.18 1.665-.72 1.665-.36 0-.615-.15-.75-.45-.195-.36-.255-.915-.255-2.145V14.15c0-1.005-.51-1.785-1.485-1.785-.945 0-1.485.78-1.485 1.785v2.925c0 2.235.255 3.255 1.005 3.96.66.63 1.695.84 2.97.84 2.37 0 3.42-1.125 3.42-3.48v-2.925c0-2.1-.21-3.255-1.86-3.69z" />
        </svg>
      );
    case "HTML":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm17 5H5.57l.37 4H18.1l-.45 5.08L12 15.65l-5.65-1.57-.38-4.22h2l.2 2.27 3.83 1.06 3.84-1.06.33-3.69H7.83l-.36-4h11.23l-.2 2z" />
        </svg>
      );
    case "CSS":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm17 5H5.57l.37 4H18.1l-.45 5.08L12 15.65l-5.65-1.57-.38-4.22h2l.2 2.27 3.83 1.06 3.84-1.06.33-3.69H7.83l-.36-4h11.23l-.2 2z" />
          <path d="M12 11.5v2.85l2.42-.67.13-1.48H12zm0-5.7v2.85h3.92l.13-1.48L12 5.8z" fill="#0f172a" />
        </svg>
      );
    case "React":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 10.98c0 4.1-6.12 7.42-12 7.42-5.88 0-12-3.32-12-7.42 0-4.1 6.12-7.42 12-7.42 5.88 0 12 3.32 12 7.42zm-12-5.46c-4.46 0-9.28 2.37-9.28 5.46 0 3.09 4.82 5.46 9.28 5.46 4.46 0 9.28-2.37 9.28-5.46 0-3.09-4.82-5.46-9.28-5.46zM12 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          <path d="M24 10.98c0 4.1-6.12 7.42-12 7.42-5.88 0-12-3.32-12-7.42 0-4.1 6.12-7.42 12-7.42 5.88 0 12 3.32 12 7.42zm-12-5.46c-4.46 0-9.28 2.37-9.28 5.46 0 3.09 4.82 5.46 9.28 5.46 4.46 0 9.28-2.37 9.28-5.46 0-3.09-4.82-5.46-9.28-5.46z" transform="rotate(60 12 12)" />
          <path d="M24 10.98c0 4.1-6.12 7.42-12 7.42-5.88 0-12-3.32-12-7.42 0-4.1 6.12-7.42 12-7.42 5.88 0 12 3.32 12 7.42zm-12-5.46c-4.46 0-9.28 2.37-9.28 5.46 0 3.09 4.82 5.46 9.28 5.46 4.46 0 9.28-2.37 9.28-5.46 0-3.09-4.82-5.46-9.28-5.46z" transform="rotate(120 12 12)" />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.55 18.39l-5.69-7.31V16.8h-1.55V8.12h1.5l5.24 6.77V8.12h1.55v10.27h-1.05zM15.45 8.12v4.88l-1.5-1.92V8.12h1.5z" />
        </svg>
      );
    case ".NET Core":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5c-.24 0-.48.06-.71.18L6.04 4.8c-.66.38-1.04 1.1-1.04 1.86v6.68c0 .76.38 1.48 1.04 1.86l5.25 3.12c.45.27.97.27 1.42 0l5.25-3.12c.66-.38 1.04-1.1 1.04-1.86V6.66c0-.76-.38-1.48-1.04-1.86l-5.25-3.12c-.23-.12-.47-.18-.71-.18z" />
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L2.4 4.8v11.4L12 24l9.6-7.8V4.8L12 0zm-1.2 16.8l-3.6-3.6 1.7-1.7 1.9 1.9 4.3-4.3 1.7 1.7-6 6z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6.5c-2.4 0-4 1.6-4.8 4.8 1.2-1.6 2.4-2 3.6-1.2.7.5 1.2 1.1 1.7 1.7.9.9 2 2 4.3 2 2.4 0 4-1.6 4.8-4.8-1.2 1.6-2.4 2-3.6 1.2-.7-.5-1.2-1.1-1.7-1.7-.9-.9-2-2-4.3-2zm-6 6c-2.4 0-4 1.6-4.8 4.8 1.2-1.6 2.4-2 3.6-1.2.7.5 1.2 1.1 1.7 1.7.9.9 2 2 4.3 2 2.4 0 4-1.6 4.8-4.8-1.2 1.6-2.4 2-3.6 1.2-.7-.5-1.2-1.1-1.7-1.7-.9-.9-2-2-4.3-2z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5c-.24 0-.48.06-.71.18L6.04 4.8c-.66.38-1.04 1.1-1.04 1.86v6.68c0 .76.38 1.48 1.04 1.86l5.25 3.12c.45.27.97.27 1.42 0l5.25-3.12c.66-.38 1.04-1.1 1.04-1.86V6.66c0-.76-.38-1.48-1.04-1.86l-5.25-3.12c-.23-.12-.47-.18-.71-.18z" />
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM2 12l10 5 10-5-10-5-10 5z" />
        </svg>
      );
    case "MySQL":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v7H5c-.55 0-1 .45-1 1s.45 1 1 1h6v7c0 .55.45 1 1 1s1-.45 1-1v-7h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
      );
    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.57L2 5.67A.52.52 0 0 1 2.87 5l3.89 7.42 2.7-5.11a.52.52 0 0 1 .91 0l8.7 16.58c.22.42-.26.86-.66.62L3.89 15.57z" />
        </svg>
      );
    case "PyTorch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "TensorFlow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
          <circle cx="12" cy="19" r="2.5" />
          <path d="M12 7.5v9M5 12h14M7 10.5l5-5.5 5 5.5-5 5.5z" />
        </svg>
      );
    case "Scikit-learn":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M9 12h6M6 12l9-7M6 12l9 7" />
        </svg>
      );
    case "Pandas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      );
    case "NumPy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      );
    case "FAISS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35M11 7v8M7 11h8" />
        </svg>
      );
    case "LangChain":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "Hugging Face":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case "Apache Spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L15 9l7 1-5 5 1.5 7-6.5-4-6.5 4 1.5-7-5-5 7-1z" />
        </svg>
      );
    case "Airflow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10a4 4 0 0 1 8 0v4a4 4 0 0 0 8 0M2 14a4 4 0 0 0 4 4h12" />
        </svg>
      );
    case "Kafka":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <path d="M12 12L19 5M12 12L5 19" />
        </svg>
      );
    case "dbt":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
        </svg>
      );
    case "Azure":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10M2 10l10-8 10 8" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.38 10.62L13.38.62a1.95 1.95 0 0 0-2.76 0L8.62 2.62c.75.25 1.38.75 1.88 1.38l2.12-2.12c.25-.25.63-.25.88 0l10 10c.25.25.25.63 0 .88l-10 10c-.25.25-.63.25-.88 0l-2.12-2.12c-.5.63-1.13 1.13-1.88 1.38l2.62 2.62c.76.76 2 .76 2.76 0l10-10a1.95 1.95 0 0 0 0-2.76zM7.25 10.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm-5-5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5 2.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm-5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm5-2.5h-5" />
        </svg>
      );
    case "GitHub":
      return <GithubIcon size={16} style={{ width: "100%", height: "100%" }} />;
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 8.878h-2.729V6.15h2.729v2.728zm2.937 0h-2.728V6.15h2.728v2.728zm-5.875 0H8.317V6.15h2.728v2.728zm2.938-2.938h-2.729V3.212h2.729v2.728zm-5.876 2.938H5.38V6.15h2.728v2.728zm-2.937 0H2.443V6.15h2.728v2.728zm2.937-2.938H5.38V3.212h2.728v2.728zm2.938 5.875h-2.729V9.09h2.729v2.728zm2.938 0h-2.729V9.09h2.729v2.728zm2.937 0h-2.728V9.09H17.8v2.728zm1.147-7.208c-.347-.367-.88-.477-1.393-.275-.385.146-.66.458-.807.825V8.16l-.018.018c0 .24-.092.477-.257.643a.91.91 0 0 1-.642.256H5.38V5.38c0-.495-.403-.898-.898-.898s-.898.403-.898.898V14.15c0 .495.403.898.898.898h13.25c.495 0 .898-.403.898-.898V10.23c.312-.22.56-.532.7-.9.348-.916.128-1.926-.643-2.658z" />
        </svg>
      );
    case "Kubernetes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20M12 2l5 5M12 22l-5-5M2 12l5 5M22 12l-5-5" />
        </svg>
      );
    case "Terraform":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h10v4H7zm-4 7h10v4H3zm8 7h10v4H11z" />
        </svg>
      );
    case "VS Code":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 4l-2 16" />
        </svg>
      );
    case "Vite":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L24 22H0L12 1z" />
        </svg>
      );
    case "Data Analytics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    case "Agile Concepts":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
        </svg>
      );
    case "Data Structures & Algorithms":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="15" r="3" />
          <circle cx="18" cy="15" r="3" />
          <path d="M12 8l-4 4M12 8l4 4" />
        </svg>
      );
    case "DBMS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "Object-Oriented Programming (OOP)":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <path d="M7 10v4h7M17 10v4" />
        </svg>
      );
    case "Operating Systems":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case "Computer Networks":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
        </svg>
      );
    case "Analytical Thinking":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      );
    case "Problem Solving":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "Cross-Functional Communication":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "Teamwork":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "CI/CD":
    case "ETL Pipelines":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "Data Modeling":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}



function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// Background Constellation Canvas
function ConstellationBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    const mouse = { x: null, y: null, radius: 140 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw(isLightTheme) {
        ctx.fillStyle = isLightTheme ? "rgba(71, 85, 105, 0.4)" : "rgba(100, 116, 139, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 85);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLightTheme = document.documentElement.classList.contains("light-theme");
      const lineBase = isLightTheme ? "37, 99, 235" : "59, 130, 246";

      particles.forEach((p) => {
        p.update();
        p.draw(isLightTheme);
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100px * 100px
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(${lineBase}, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadiusSq = mouse.radius * mouse.radius; // 140 * 140 = 19600

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(${lineBase}, ${0.25 * (1 - dist / mouse.radius)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas id="constellation-canvas" ref={canvasRef} />;
}

// Section Header UI Divider
function SectionHeader({ num, label, title }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`section-divider reveal ${visible ? "visible" : ""}`}>
      <span className="section-label">{label}</span>
      <span className="section-line" />
      <span className="section-num">{num}</span>
    </div>
  );
}

// Modular Sub-components for Loops to satisfy React Hook Rules
function EducationCard({ degree, school, detail, time }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`edu-card reveal ${visible ? "visible" : ""}`}>
      <div className="edu-time">{time}</div>
      <div className="edu-degree">{degree}</div>
      <div className="edu-school">{school}</div>
      <div className="edu-detail">{detail}</div>
    </div>
  );
}

function SkillRow({ label, count, items }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`skills-row reveal ${visible ? "visible" : ""}`}>
      <div className="skills-cat-header">
        <span className="skills-cat-label">{label}</span>
        <span className="skills-cat-count">{String(count).padStart(2, "0")}</span>
      </div>
      <div className="skills-list">
        {items.map((item, idx) => (
          <span key={idx} className="skill-pill">
            <span className="skill-icon-wrap">
              {getSkillIcon(item)}
            </span>
            <span className="skill-name">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ id, title, github, live, desc, tags, metric }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`project-card glass-card reveal ${visible ? "visible" : ""}`}>
      <div className="project-card-header">
        <span className="project-info-tag">{id} / FEATURED PROJECT</span>
        <div className="project-links">
          {github && (
            <a href={github} className="project-link-icon" target="_blank" rel="noreferrer" title="View Source">
              <GithubIcon size={16} />
            </a>
          )}
          {live && (
            <a href={live} className="project-link-icon" target="_blank" rel="noreferrer" title="Live Demo">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{desc}</p>
      {metric && (
        <div className="project-metric">
          <span className="project-metric-dot" />
          <span>{metric}</span>
        </div>
      )}
      <div className="project-tools-label">Tech Stack</div>
      <div className="tag-pills">
        {tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CertificationCard({ name, org, year, link }) {
  const [ref, visible] = useReveal();
  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      rel="noreferrer"
      className={`cert-card glass-card reveal ${visible ? "visible" : ""}`}
    >
      <div className="cert-card-header">
        <span className="cert-badge">OCI CERTIFIED</span>
        <ExternalLink size={14} className="cert-icon" />
      </div>
      <div className="cert-name">{name}</div>
      <div className="cert-meta">
        {org} &middot; {year}
      </div>
    </a>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [logoFont, setLogoFont] = useState("var(--font-mono)");
  const fontCycleInterval = useRef(null);
  const fontIndex = useRef(0);

  const fonts = [
    "'Space Grotesk', sans-serif",
    "'Playfair Display', serif",
    "'JetBrains Mono', monospace",
    "'Cormorant Garamond', serif",
    "'Outfit', sans-serif"
  ];

  const handleLogoMouseEnter = () => {
    if (fontCycleInterval.current) clearInterval(fontCycleInterval.current);
    fontCycleInterval.current = setInterval(() => {
      fontIndex.current = (fontIndex.current + 1) % fonts.length;
      setLogoFont(fonts[fontIndex.current]);
    }, 250);
  };

  const handleLogoMouseLeave = () => {
    if (fontCycleInterval.current) {
      clearInterval(fontCycleInterval.current);
      fontCycleInterval.current = null;
    }
    fontIndex.current = 0;
    setLogoFont("var(--font-mono)");
  };

  useEffect(() => {
    return () => {
      if (fontCycleInterval.current) clearInterval(fontCycleInterval.current);
    };
  }, []);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const ROLES = ["SOFTWARE DEVELOPMENT", "ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "DATA SCIENCE"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && currentRoleText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentRoleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentRoleText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentRoleText, isDeleting, roleIndex]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="page-wrapper">
      <ConstellationBg />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Main Header / Sticky Navbar */}
      <header className="header">
        <div className="header-container">
          <a
            href="#top"
            className="logo-box"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            style={{ fontFamily: logoFont }}
          >
            <span className="logo-badge">VGK</span> {PROFILE.logoText}
          </a>
          <div className="header-right">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="nav-toggle-btn" onClick={toggleMenu} aria-label="Toggle navigation menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Full Screen Navigation Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span className="menu-explore">01. EXPLORE</span>
          <button className="menu-close-btn" onClick={toggleMenu} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <div className="menu-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link-item"
              onClick={() => setMenuOpen(false)}
            >
              <span className="menu-link-label">{link.label}</span>
              <span className="menu-link-hash">{link.hash}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Hero Section */}
        <section id="top" className="hero">
          <div className="hero-index-header">
            <span className="index-label">INDEX</span>
            <span className="index-line"></span>
            <span className="index-num">01</span>
          </div>

          <div className="hero-grid">
            {/* Extended Single Column Layout */}
            <div className="hero-left-col">
              <div className="hero-main-card glass-card">
                <span className="hero-card-index">[ 01, 01 ]</span>
                <div className="hero-main-card-content">
                  <div className="hero-main-card-details">
                    <div className="hero-eyebrow-row">
                      <span className="hero-eyebrow-dot" />
                      <span className="hero-eyebrow">
                        {currentRoleText}
                        <span className="hero-role-cursor">|</span>
                      </span>
                    </div>
                    <h1 className="hero-title">
                      Hello, I am <br />
                      <span 
                        className="hero-name-reveal"
                        onMouseEnter={() => setNameHovered(true)}
                        onMouseLeave={() => setNameHovered(false)}
                      >
                        <span className="char-static">V</span><span className={`char-dynamic ${nameHovered ? "expanded" : ""}`}>arun</span>&nbsp;
                        <span className="char-static">G</span><span className={`char-dynamic ${nameHovered ? "expanded" : ""}`}>oud</span>&nbsp;
                        <span className="char-static">K</span><span className={`char-dynamic ${nameHovered ? "expanded" : ""}`}>arupothula</span>
                      </span>
                    </h1>
                    <p className="hero-tagline">{PROFILE.tagline}</p>
                    <div className="hero-actions">
                      <a href="/resume.pdf" className="btn btn-primary" target="_blank" rel="noreferrer">
                        <ExternalLink size={15} /> Preview Resume
                      </a>
                      <a href={`mailto:${PROFILE.email}`} className="btn btn-secondary">
                        <Mail size={15} /> Contact Me <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  <div className="hero-avatar-wrapper">
                    {imgFailed ? (
                      <div className="hero-avatar-initials">{PROFILE.short}</div>
                    ) : (
                      <img
                        src="/profile.jpg"
                        alt={PROFILE.name}
                        className="hero-avatar"
                        onError={() => setImgFailed(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="hero-sub-grid">
                <div className="status-card glass-card">
                  <span className="hero-card-index">[ 01, 02 ]</span>
                  <div className="status-dot" />
                  <div>
                    <div className="status-title">Current Status</div>
                    <div className="status-text">{PROFILE.status}</div>
                  </div>
                </div>

                <div className="tech-ticker-card glass-card">
                  <span className="hero-card-index">[ 02, 01 ]</span>
                  <div className="status-title">Tech Stack Marquee</div>
                  <div className="tech-ticker-wrap">
                    <div className="tech-ticker-inner">
                      {[...TECH_TICKER, ...TECH_TICKER].map((tech, idx) => (
                        <span key={idx} className="tech-ticker-item">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="status-card glass-card certs-highlight">
                  <span className="hero-card-index">[ 02, 02 ]</span>
                  <Award size={20} className="status-icon" style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <div className="status-title">Key Credentials</div>
                    <div className="status-text">OCI GenAI Professional &amp; AI Associate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <SectionHeader num="02" label="Archive_002" title="About & Education" />
          <h2 className="section-title">About & Education</h2>
          <div className="about-grid">
            <div className="about-bio">
              <p>
                I am a final-year <strong>Computer Science & Engineering student</strong> at Vellore Institute of Technology, Amaravathi, with experience in building production-style systems.
              </p>
              <p>
                My work spans database schema design to high-performance model deployments. I've designed and engineered multi-layer web architectures, hybrid deep learning pipelines, and low-latency cache indices.
              </p>
              <p>
                Equipped with the <strong>Oracle Cloud Infrastructure Generative AI Professional</strong> credentials, I enjoy working at the intersection of robust backend services and intelligent AI workloads.
              </p>
            </div>

            <div className="edu-timeline">
              {EDUCATION.map((edu, idx) => (
                <EducationCard key={idx} {...edu} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <SectionHeader num="03" label="Archive_003" title="Skills & Technologies" />
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-card glass-card">
            {SKILLS.map((skill, idx) => (
              <SkillRow key={idx} {...skill} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <SectionHeader num="04" label="Archive_004" title="Featured Projects" />
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-list">
            {PROJECTS.map((proj) => (
              <ProjectCard key={proj.id} {...proj} />
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section">
          <SectionHeader num="05" label="Archive_005" title="Certifications" />
          <h2 className="section-title">Certifications</h2>
          <div className="certs-grid">
            {CERTS.map((cert, idx) => (
              <CertificationCard key={idx} {...cert} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <footer id="contact" className="section">
          <SectionHeader num="06" label="Archive_006" title="Get in touch" />
          <div className="contact-card glass-card">
            <div className="contact-sys-connect">&gt; system.connect()</div>
            <p className="contact-subtitle">Open to SDE and ML Engineer opportunities.</p>
            <div className="contact-links">
              <a href={PROFILE.github} className="contact-link-btn" target="_blank" rel="noreferrer" title="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={PROFILE.linkedin} className="contact-link-btn" target="_blank" rel="noreferrer" title="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="contact-link-btn btn-main" title="Email Varun">
                <Mail size={16} /> {PROFILE.email}
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">// &copy; 2026 {PROFILE.name}. All rights reserved.</div>
            <div className="footer-right">Designed & Built with Precision</div>
          </div>
        </footer>
      </div>
    </div>
  );
}