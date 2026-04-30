'use client';

import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/SpotlightCard";
import AIChatBox from "@/components/AIChatBox";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ParticleNetwork from "@/components/ParticleNetwork";

const translations = {
  EN: {
    heroLabel: "AI ENGINEER • DATA ANALYST • ADMINISTRASI",
    heroTitle: "Empowering Business Growth with Intelligent Systems.",
    heroSubtitle: "I'm Bonifasius. An AI & Information Systems specialist blending cutting-edge artificial intelligence with robust system architecture. Whether it's workflow optimization or advanced AI integration, I build solutions that don't just work—they deliver measurable impact on efficiency and growth.",
    exploreBtn: "Explore My Work",
    resumeBtn: "Download Resume",
    navHome: "Home",
    navAbout: "About",
    navExpertise: "Expertise",
    navProjects: "Projects",
    navContact: "Get in Touch",
    aboutTitle: "MY MISSION",
    aboutSubtitle: "Engineering Efficiency through Intelligent Systems",
    aboutText1: "As an Information Systems specialist, I don't just build software; I architect resilient digital infrastructures designed to scale. My expertise lies in the seamless integration of technical engineering and data-driven logic.",
    aboutText2: "With a track record of transforming complex operational bottlenecks into streamlined digital assets, I focus on delivering high-performance solutions that bridge the gap between human objectives and machine precision.",
    expYears: "Years Exp",
    projBuilt: "Projects Built",
    precision: "Precision Driven",
    valuesTitle: "Professional Values",
    valuesSubtitle: "The principles that guide my daily work",
    val1Title: "Outcome-Focused",
    val1Text: "I don't just complete tasks; I focus on the final business goal to ensure maximum value.",
    val2Title: "Meticulous Detail",
    val2Text: "From data cleaning to admin logs, I believe that excellence is found in the small details.",
    val3Title: "Adaptive Learning",
    val3Text: "The tech world moves fast. I pride myself on mastering new tools and frameworks in record time.",
    expertiseTitle: "Technical Expertise",
    expertiseSubtitle: "A specialized toolkit for modern challenges",
    aiTitle: "AI Engineering",
    aiText: "Architecting intelligent agents and RAG-based systems to automate complex decision-making and enhance information retrieval at scale.",
    dataTitle: "Data Analytics",
    dataText: "Turning scattered data into strategic growth assets through Python-driven modeling, predictive analysis, and dynamic visual reporting.",
    adminTitle: "Admin Operations",
    adminText: "Designing high-precision digital workflows and structured documentation systems to ensure peak operational speed and zero-error management.",
    autoTitle: "Automation",
    autoText: "Engineered scripting solutions that eliminate repetitive tasks, reducing manual workload by up to 90% through smart tool integration.",
    projectsTitle: "Featured Case Studies",
    contactTitle: "Get In Touch",
    contactSubtitle: "Ready to collaborate or have a project in mind?",
    emailBtn: "Send",
    connectBtn: "Let's Connect",
    chatBtn: "WhatsApp",
    callBtn: "Call Now",
    footerText: "Built with Intelligence & Precision.",
    codeTitle: "Code Laboratory",
    codeSubtitle: "Real-world engineering implementations",
    codeConclusion: "Python is the 'Brain'. Go is the 'Muscle'. TypeScript & Next.js are the 'Face' connecting intelligence seamlessly. Docker is the 'Home' for stability, while LangChain & FastAPI are the 'Nerves' accelerating AI integration.",
    terminalLines: [
      "> Target: AI Engineering...",
      "> Target: Data Analytics...",
      "> Target: Administrative Systems...",
      "> Status: Ready to Make Impact.",
      "> Engineering the Future of Intelligence."
    ],
    techDesc: {
      python: "AI & Data Brain",
      nextdotjs: "Elite Web Engine",
      typescript: "Type-Safe Logic",
      go: "Backend Muscle",
      docker: "Agile Containers",
      langchain: "LLM Architect",
      fastapi: "Blazing Fast API"
    }
  },
  ID: {
    heroLabel: "AI ENGINEER • DATA ANALYST • ADMINISTRASI",
    heroTitle: "Solusi Digital Cerdas untuk Akselerasi Bisnis.",
    heroSubtitle: "Saya Bonifasius. Seorang spesialis AI & Sistem Informasi yang menggabungkan kecanggihan kecerdasan buatan dengan struktur sistem yang kokoh. Dari optimasi alur kerja hingga integrasi AI tingkat lanjut, saya membangun solusi yang tidak hanya berfungsi, tetapi juga memberikan dampak nyata pada efisiensi dan pertumbuhan bisnis Anda.",
    exploreBtn: "Lihat Karya Saya",
    resumeBtn: "Unduh Resume",
    navHome: "Beranda",
    navAbout: "Tentang",
    navExpertise: "Keahlian",
    navProjects: "Proyek",
    navContact: "Hubungi Saya",
    aboutTitle: "MISI SAYA",
    aboutSubtitle: "Membangun Efisiensi Melalui Sistem Cerdas",
    aboutText1: "Sebagai spesialis Sistem Informasi, saya tidak hanya membangun perangkat lunak; saya merancang infrastruktur digital tangguh yang dirancang untuk berkembang. Keahlian saya terletak pada integrasi rekayasa teknis dan logika berbasis data.",
    aboutText2: "Dengan rekam jejak dalam mentransformasi hambatan operasional yang kompleks menjadi aset digital yang efisien, saya fokus memberikan solusi berkinerja tinggi yang menjembatani celah antara tujuan bisnis dan presisi teknologi.",
    expYears: "Thn Pengalaman",
    projBuilt: "Proyek Selesai",
    precision: "Terukur & Presisi",
    valuesTitle: "Nilai Profesional",
    valuesSubtitle: "Prinsip yang membimbing pekerjaan harian saya",
    val1Title: "Fokus pada Hasil",
    val1Text: "Saya tidak hanya menyelesaikan tugas; saya fokus pada tujuan akhir bisnis untuk nilai maksimal.",
    val2Title: "Detail yang Teliti",
    val2Text: "Dari pembersihan data hingga log admin, saya percaya kesempurnaan ada pada detail kecil.",
    val3Title: "Pembelajar Adaptif",
    val3Text: "Dunia teknologi bergerak cepat. Saya bangga bisa menguasai alat dan framework baru dalam waktu singkat.",
    expertiseTitle: "Keahlian Teknis",
    expertiseSubtitle: "Toolkit khusus untuk tantangan modern",
    aiTitle: "Rekayasa AI",
    aiText: "Merancang agen cerdas dan sistem berbasis RAG untuk otomatisasi pengambilan keputusan kompleks serta mempercepat akses informasi skala besar.",
    dataTitle: "Analisis Data",
    dataText: "Mengubah data mentah menjadi aset pertumbuhan strategis melalui pemodelan Python, analisis prediktif, dan pelaporan visual yang dinamis.",
    adminTitle: "Operasional Admin",
    adminText: "Membangun alur kerja digital berpresisi tinggi dan sistem dokumentasi terstruktur untuk menjamin kecepatan serta akurasi operasional maksimal.",
    autoTitle: "Otomasi",
    autoText: "Menciptakan solusi skrip cerdas yang mengeliminasi tugas berulang, memangkas beban kerja manual hingga 90% melalui integrasi alat digital.",
    projectsTitle: "Studi Kasus Unggulan",
    contactTitle: "Hubungi Saya",
    contactSubtitle: "Siap berkolaborasi atau punya ide proyek?",
    emailBtn: "Kirim",
    connectBtn: "Ayo Terhubung",
    chatBtn: "WhatsApp",
    callBtn: "Telepon Sekarang",
    footerText: "Dibangun dengan Kecerdasan & Presisi.",
    codeTitle: "Laboratorium Kode",
    codeSubtitle: "Implementasi teknis di dunia nyata",
    codeConclusion: "Python adalah 'Otak' yang pintar. Go adalah 'Otot' yang memproses data raksasa. TypeScript & Next.js adalah 'Wajah' yang menghubungkan kecanggihan secara mulus. Docker adalah 'Rumah' yang menjaga kestabilan sistem, sementara LangChain & FastAPI adalah 'Saraf' yang mempercepat integrasi AI.",
    terminalLines: [
      "> Target: AI Engineering...",
      "> Target: Data Analytics...",
      "> Target: Sistem Administrasi...",
      "> Status: Siap Memberikan Dampak.",
      "> Merancang Masa Depan Kecerdasan."
    ],
    techDesc: {
      python: "Otak AI & Data",
      nextdotjs: "Mesin Web Elit",
      typescript: "Logika Terjamin",
      go: "Otot Backend",
      docker: "Kontainer Gesit",
      langchain: "Arsitek LLM",
      fastapi: "API Sangat Cepat"
    }
  }
};

export default function Home() {
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');
  const [showLangDrop, setShowLangDrop] = useState(false);

  useEffect(() => {
    // Listen for language changes if needed elsewhere, 
    // but here we manage it locally in page.tsx
  }, []);

  const toggleLang = (newLang: 'EN' | 'ID') => {
    setLang(newLang);
    setShowLangDrop(false);
  };

  const t = translations[lang];
  const [terminalText, setTerminalText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState<'Python' | 'Go' | 'TS' | 'Next' | 'Docker' | 'FastAPI' | 'LangChain'>('Python');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 1500);
  };

  useEffect(() => {
    setShowOutput(false);
    setIsRunning(false);
  }, [activeCodeTab]);

  const codeSnippets = {
    TS: {
      title: lang === 'EN' ? "Real-time AI Streamer" : "AI Streamer Real-time",
      desc: lang === 'EN' ? "Advanced React context handling word-by-word AI responses using low-level ReadableStreams for zero-latency UI." : "Manajemen context React tingkat lanjut untuk menangani respon AI kata-per-kata menggunakan ReadableStream untuk UI tanpa jeda.",
      details: lang === 'EN' ? [
        "Handles streaming AI responses (word-by-word) like ChatGPT.",
        "Ensures the UI doesn't freeze during long processing tasks.",
        "Zero-latency updates using high-performance TextDecoder."
      ] : [
        "Menangani respon AI secara mencicil (kata-per-kata) seperti ChatGPT.",
        "Memastikan website tidak macet saat menunggu jawaban AI yang panjang.",
        "Teknologi di balik tampilan chat yang responsif dan lancar."
      ],
      code: `/**
 * @provider AIContextProvider
 * @description Advanced React Context for managing multi-modal AI sessions
 */
export const useAISession = (sessionId: string) => {
  const [context, dispatch] = useReducer(aiReducer, initialState);
  
  const processStream = useCallback(async (stream: ReadableStream) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      dispatch({ type: 'APPEND_CHUNK', payload: chunk });
    }
    
    dispatch({ type: 'FINALIZE_RESPONSE' });
  }, []);

  return { context, processStream };
};`,
      output: lang === 'EN' ? `[SYSTEM] Session [ai_stream_x92] Initialized // Booting AI context
[ACTION] Attaching stream reader... // Connecting to LLM API
[STREAM] Chunk ID: 001 | Content: "The" // Receiving first token
[STREAM] Chunk ID: 002 | Content: " Artificial" // Streaming in progress
[STREAM] Chunk ID: 003 | Content: " Intelligence" // High-speed delivery
[INFO] Total tokens received: 256 // Analyzing payload size
[RESULT] Stream finalized in 450ms. // Process complete` : `[SYSTEM] Sesi [ai_stream_x92] Dimulai // Memuat konteks AI
[ACTION] Memasang pembaca stream... // Menghubungkan ke API LLM
[STREAM] Chunk ID: 001 | Konten: "The" // Menerima kata pertama
[STREAM] Chunk ID: 002 | Konten: " Artificial" // Streaming sedang berjalan
[STREAM] Chunk ID: 003 | Konten: " Intelligence" // Pengiriman kecepatan tinggi
[INFO] Total token diterima: 256 // Menganalisis ukuran data
[RESULT] Stream selesai dalam 450ms. // Proses selesai`
    },
    Python: {
      title: lang === 'EN' ? "Autonomous Agentic RAG" : "RAG Agentik Otonom",
      desc: lang === 'EN' ? "A self-correcting AI researcher that plans, executes, and reflects on its own reasoning to eliminate hallucinations." : "Peneliti AI mandiri yang merencanakan, mengeksekusi, dan merefleksikan pemikirannya sendiri untuk menghilangkan halusinasi.",
      details: lang === 'EN' ? [
        "Autonomous planning based on complex user queries.",
        "Semantic retrieval with deep reflection to prevent lying.",
        "Used for high-stakes industries like Legal or Medical AI."
      ] : [
        "AI yang tidak hanya menjawab, tapi merencanakan dan memeriksa kerjanya sendiri.",
        "Menghilangkan 'halusinasi' AI dengan lapisan validasi berlapis.",
        "Cocok untuk sistem kritis seperti analisis hukum atau medis."
      ],
      code: `# Advanced Agentic RAG Workflow
# Architecture: Self-Correcting Reflection Loop

class AutonomousResearcher:
    def __init__(self, model="gpt-4-0125-preview"):
        self.llm = ChatOpenAI(model=model, temperature=0)
        self.memory = VectorStoreRetriever(db=Chroma())

    async def execute_task(self, query: str):
        # 1. Retrieval with Semantic Search
        docs = await self.memory.aget_relevant_documents(query)
        
        # 2. Reasoning & Self-Reflection Loop
        plan = self.llm.invoke(f"Plan research for: {query} using {docs}")
        
        # 3. Execution & Validation
        result = await self.llm.ainvoke(f"Execute based on plan: {plan}")
        
        # 4. Final Validation Layer
        if "hallucination_detected" in result:
            return await self.retry_strategy(query)
            
        return result`,
      output: lang === 'EN' ? `> INIT: Initializing Researcher // Setting up GPT-4 agent
> RETRIEVAL: Searching ChromaDB... // Finding relevant facts
> RESULT: 4 documents found. // Context successfully loaded
> REASONING: Analyzing consistency... // Critical thinking phase
> REFLECTION: Self-correcting loop... // Double checking facts
> VALIDATION: Hallucination score: 0.02 // Verifying truthfulness
> FINAL: Analysis generated. // Result ready for user` : `> INIT: Memulai Peneliti AI // Menyiapkan agen GPT-4
> RETRIEVAL: Mencari di ChromaDB... // Menemukan fakta relevan
> RESULT: 4 dokumen ditemukan. // Konteks berhasil dimuat
> REASONING: Menganalisis konsistensi... // Tahap berpikir kritis
> REFLECTION: Loop koreksi mandiri... // Memeriksa ulang fakta
> VALIDATION: Skor Halusinasi: 0.02 // Memverifikasi kebenaran
> FINAL: Analisis berhasil dibuat. // Hasil siap digunakan`
    },
    Go: {
      title: lang === 'EN' ? "Concurrent Stream Engine" : "Mesin Aliran Konkuren",
      desc: lang === 'EN' ? "High-throughput data processor using Fan-Out patterns and context-aware cancellation for massive scalability." : "Pemroses data throughput tinggi menggunakan pola Fan-Out dan pembatalan berbasis context untuk skalabilitas masif.",
      details: lang === 'EN' ? [
        "Processes massive data streams (up to 1.2GB/s).",
        "Splits heavy tasks across all available CPU cores.",
        "Features graceful cancellation to prevent server crashes."
      ] : [
        "Memproses aliran data raksasa secara sekaligus dengan sangat cepat.",
        "Memecah satu tugas besar ke semua inti prosesor komputer.",
        "Digunakan untuk sistem backend skala besar seperti Uber atau Netflix."
      ],
      code: `// High-Performance Stream Processor
// Pattern: Fan-Out / Fan-In with Context Cancellation

func StartDataStream(ctx context.Context, data []RawData) <-chan Result {
    out := make(chan Result)
    
    // Worker Pool: Concurrency controlled by Runtime
    go func() {
        defer close(out)
        for _, d := range data {
            select {
            case <-ctx.Done(): // Graceful Cancellation
                return
            default:
                // High-speed feature extraction
                res := processFeature(d) 
                out <- res
            }
        }
    }()
    
    return out
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    stream := StartDataStream(ctx, heavyData)
    for r := range stream {
        log.Printf("[ENGINE] Processed Node: %v", r.ID)
    }
}`,
      output: lang === 'EN' ? `[INFO] Concurrent Engine Bootstrapped. // Initializing Go runtime
[WORKER] Spawning 12 goroutines... // Multi-core processing
[PROCESS] Analyzing Node [UUID_001] // Handling heavy load
[PROCESS] Analyzing Node [UUID_002] // Data integrity check
[CLEANUP] All buffers flushed. // Saving results safely
[RESULT] Throughput: 1.2GB/s // Peak performance reached` : `[INFO] Mesin Konkuren Dimulai. // Inisialisasi Go runtime
[WORKER] Menjalankan 12 goroutines... // Pemrosesan multi-core
[PROCESS] Menganalisis Node [UUID_001] // Menangani beban berat
[PROCESS] Menganalisis Node [UUID_002] // Cek integritas data
[CLEANUP] Semua buffer dikosongkan. // Simpan hasil dengan aman
[RESULT] Throughput: 1.2GB/s // Performa puncak tercapai`
    },
    Next: {
      title: lang === 'EN' ? "Next.js Dynamic Engine" : "Mesin Dinamis Next.js",
      desc: lang === 'EN' ? "Modern App Router architecture with Server Components and advanced middleware for high-performance edge rendering." : "Arsitektur App Router modern dengan Server Components dan middleware canggih untuk rendering edge berkinerja tinggi.",
      details: lang === 'EN' ? [
        "Optimized SEO with Server Side Rendering (SSR).",
        "Edge functions for zero-latency global deployment.",
        "Incremental Static Regeneration (ISR) for data freshness."
      ] : [
        "SEO optimal dengan Server Side Rendering (SSR).",
        "Edge functions untuk penyebaran global tanpa jeda.",
        "Pembaruan data instan tanpa build ulang (ISR)."
      ],
      code: `// Next.js App Router: High-Performance Page
// Strategy: Server-Side Rendering with Suspense

export default async function InsightsPage() {
  const data = await fetchAIInsights(); // Server-side fetch

  return (
    <main className="insight-container">
      <Suspense fallback={<Shimmer />}>
        <InsightGrid data={data} />
      </Suspense>
      
      {/* Edge-rendered interactive layer */}
      <InteractiveAnalysis />
    </main>
  );
}`,
      output: lang === 'EN' ? `> [BUILD] Optimization: Production // Compiling TS to JS
> [ROUTER] Compiling route: /insights // Generating static pages
> [SERVER] Hydrating components... // Readying interactive UI
> [DATA] Fetching from Edge (Jakarta) // Low-latency data fetch
> [SUCCESS] Rendered in 120ms. // Lighthouse P99 score` : `> [BUILD] Optimasi: Produksi // Kompilasi TS ke JS
> [ROUTER] Kompilasi rute: /insights // Membuat halaman statis
> [SERVER] Hidrasi komponen... // Menyiapkan UI interaktif
> [DATA] Mengambil dari Edge (Jakarta) // Ambil data latensi rendah
> [SUCCESS] Render dalam 120ms. // Skor Lighthouse P99`
    },
    Docker: {
      title: lang === 'EN' ? "Agile Containerization" : "Kontainerisasi Gesit",
      desc: lang === 'EN' ? "Multi-stage build optimization for lightweight, production-ready AI microservices that scale horizontally." : "Optimasi build multi-stage untuk microservice AI yang ringan dan siap produksi dengan skalabilitas horizontal.",
      details: lang === 'EN' ? [
        "Reduces image size by up to 80% using Alpine Linux.",
        "Ensures consistent environment across dev and prod.",
        "Secure environment isolation for sensitive AI models."
      ] : [
        "Mengurangi ukuran file hingga 80% agar cepat dijalankan.",
        "Memastikan sistem berjalan sama di semua komputer.",
        "Isolasi lingkungan yang aman untuk model AI sensitif."
      ],
      code: `# Multi-stage Build for High-Performance AI App
FROM python:3.10-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Production Stage
FROM alpine:3.18
RUN apk add --no-cache python3 py3-pip
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
CMD ["python", "main.py"]`,
      output: lang === 'EN' ? `> COMMAND: docker build . // Starting build process
> [STAGE 1/2] Installing dependencies... // Building Python layer
> [STAGE 2/2] Minimizing image size... // Using Alpine OS
> [IMAGE] Size: 142MB (83% savings) // Storage optimized
> [RESULT] Container [ai-engine] ready. // Ready for Cloud` : `> COMMAND: docker build . // Memulai proses build
> [STAGE 1/2] Instalasi dependensi... // Membangun layer Python
> [STAGE 2/2] Meminimalkan ukuran... // Menggunakan Alpine OS
> [IMAGE] Ukuran: 142MB (Hemat 83%) // Penyimpanan dioptimalkan
> [RESULT] Kontainer [ai-engine] siap. // Siap untuk Cloud`
    },
    FastAPI: {
      title: lang === 'EN' ? "Blazing Fast AI API" : "API AI Sangat Cepat",
      desc: lang === 'EN' ? "Asynchronous Python framework with strict Pydantic validation for high-concurrency AI inference endpoints." : "Framework Python asinkron dengan validasi Pydantic ketat untuk endpoint inferensi AI dengan konkurensi tinggi.",
      details: lang === 'EN' ? [
        "Handles thousands of requests/sec with async/await.",
        "Automatic OpenAPI (Swagger) documentation.",
        "Native support for WebSockets and background tasks."
      ] : [
        "Menangani ribuan permintaan per detik secara bersamaan.",
        "Dokumentasi API otomatis yang rapi dan profesional.",
        "Mendukung tugas latar belakang dan komunikasi real-time."
      ],
      code: `from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI()

class InferenceRequest(BaseModel):
    query: str
    tokens: int = 512

@app.post("/v1/predict")
async def run_ai_task(request: InferenceRequest, bg: BackgroundTasks):
    # Async AI Inference
    result = await ai_engine.analyze(request.query)
    
    # Task delegation for heavy processing
    bg.add_task(log_transaction, result.id)
    
    return {"status": "success", "result": result}`,
      output: lang === 'EN' ? `[INFO] FastAPI Server started. // Uvicorn engine active
[API] POST /v1/predict // Endpoint receiving data
[AI] Running inference logic... // Processing LLM request
[TASK] Handing off to Background... // Non-blocking worker
[RESULT] 200 OK | Time: 14ms // Blazing fast response` : `[INFO] Server FastAPI dimulai. // Mesin Uvicorn aktif
[API] POST /v1/predict // Endpoint menerima data
[AI] Menjalankan logika inferensi... // Memproses request LLM
[TASK] Delegasi ke Background... // Worker non-blocking
[RESULT] 200 OK | Waktu: 14ms // Respon sangat cepat`
    },
    LangChain: {
      title: lang === 'EN' ? "LLM Orchestration" : "Orkestrasi LLM",
      desc: lang === 'EN' ? "Complex chain-of-thought workflows connecting vector databases, tools, and models for autonomous AI systems." : "Alur kerja chain-of-thought kompleks yang menghubungkan vector database, alat, dan model untuk sistem AI otonom.",
      details: lang === 'EN' ? [
        "Chaining multiple AI models for complex reasoning.",
        "Memory management for long-running conversations.",
        "Integration with various vector stores (Pinecone, Chroma)."
      ] : [
        "Menghubungkan berbagai model AI untuk pemikiran kompleks.",
        "Manajemen memori untuk percakapan AI yang panjang.",
        "Integrasi dengan database pengetahuan (Vector Store)."
      ],
      code: `from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# Building the AI Reasoning Chain
llm = ChatOpenAI(temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_db.as_retriever(),
    return_source_documents=True
)

# Executing complex query with context
response = qa_chain({"query": "Analyze legal risk in section 4.2"})
print(f"Answer: {response['result']}")`,
      output: lang === 'EN' ? `> ACTION: Entering QA Chain... // LLM Orchestration
> MEMORY: Loading context... // Fetching from Pinecone DB
> ANALYSIS: Checking Section 4.2 // Cross-referencing data
> VALIDATION: Verifying citations... // Checking for errors
> RESULT: Confidence score: 98% // Highly accurate output` : `> ACTION: Masuk ke QA Chain... // Orkestrasi LLM
> MEMORY: Memuat konteks... // Ambil dari Pinecone DB
> ANALYSIS: Memeriksa Bagian 4.2 // Referensi silang data
> VALIDATION: Verifikasi kutipan... // Memeriksa kesalahan
> RESULT: Skor Kepercayaan: 98% // Output sangat akurat`
    }
  };

  useEffect(() => {
    let charIdx = 0;
    const interval = setInterval(() => {
      const currentLine = t.terminalLines[lineIdx];
      if (charIdx < currentLine.length) {
        setTerminalText(currentLine.substring(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLineIdx((prev) => (prev + 1) % t.terminalLines.length);
        }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [lineIdx, t.terminalLines]);

  return (
    <main>
      <ParticleNetwork />
      <Navbar
        lang={lang}
        toggleLang={toggleLang}
        showLangDrop={showLangDrop}
        setShowLangDrop={setShowLangDrop}
        t={t}
      />


      {/* Hero Section - The Elite Entrance */}
      <section className="hero-section" style={heroSectionStyle}>
        <div className="fade-up hero-grid" style={heroContainerStyle}>
          <div style={heroContentStyle}>

            <h1 style={heroTitleStyle}>
              {lang === 'EN' ? (
                <>Empowering Business Growth <br /> with <span className="text-gradient">Intelligent Systems.</span></>
              ) : (
                <>Solusi Digital Cerdas untuk <br /> <span className="text-gradient">Akselerasi Bisnis.</span></>
              )}
            </h1>
            <p style={heroSubtitleStyle}>{t.heroSubtitle}</p>

          </div>

          <div style={heroGraphicStyle}>
            <div className="photo-frame" style={{ width: '100%', height: '100%', borderRadius: '40px', padding: '2px' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, var(--primary-glow), transparent)' }} />
              <div className="glass-card" style={{ height: '100%', width: '100%', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '38px', position: 'relative', overflow: 'hidden', padding: 0 }}>
                {/* Profile Image with Overlay */}
                <div style={{ position: 'relative', width: '100%', height: '75%', overflow: 'hidden' }}>
                  <Image
                    src="/images/boni.jpg"
                    alt="Boni Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9) saturate(0.8)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 40%)' }} />
                  <div className="glass-shine" />
                </div>

                {/* Terminal Section */}
                <div style={{ height: '25%', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px', color: 'var(--primary)', opacity: 0.8 }}>{t.heroLabel}</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '500' }}>
                    {terminalText}
                    <span className="terminal-cursor">|</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee - The Trust Bar */}
      <div className="tech-marquee">
        <div className="marquee-content">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[
                { name: 'Python', icon: 'python' },
                { name: 'Next.js', icon: 'nextdotjs' },
                { name: 'React', icon: 'react' },
                { name: 'Node.js', icon: 'nodedotjs' },
                { name: 'Angular', icon: 'angular' },
                { name: 'Laravel', icon: 'laravel' },
                { name: 'CodeIgniter', icon: 'codeigniter' },
                { name: 'Go', icon: 'go' },
                { name: 'Docker', icon: 'docker' },
                { name: 'TypeScript', icon: 'typescript' },
                { name: 'PostgreSQL', icon: 'postgresql' },
                { name: 'MongoDB', icon: 'mongodb' },
                { name: 'LangChain', icon: 'langchain' },
                { name: 'PyTorch', icon: 'pytorch' },
                { name: 'FastAPI', icon: 'fastapi' },
                { name: 'Git', icon: 'git' },
                { name: 'Tailwind', icon: 'tailwindcss' },
              ].map((tech) => (
                <div key={tech.name} className="marquee-item">
                  <img 
                    src={`https://cdn.simpleicons.org/${tech.icon}`} 
                    alt={tech.name} 
                    className="marquee-logo"
                  />
                  <span className="marquee-text">{tech.name}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>


      {/* About Section */}
      <section id="about" style={aboutSectionStyle}>
        <div className="about-container" style={aboutContainerStyle}>
          <div className="about-content" style={aboutContentStyle}>
            <h2 style={smallTitleStyle}>{t.aboutTitle}</h2>
            <h3 style={sectionTitleStyle}>{t.aboutSubtitle}</h3>
            <p style={aboutTextStyle}>{t.aboutText1}</p>
            <p style={aboutTextStyle}>{t.aboutText2}</p>

          </div>
          <div className="about-skills-grid" style={aboutSkillsGridStyle}>
            <div className="fade-up" style={{
              width: '100%',
              height: '520px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '32px',
              background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.7) 0%, rgba(2, 6, 23, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(56, 189, 248, 0.1)',
              backdropFilter: 'blur(12px)',
              padding: '20px'
            }}>
              {/* Neural Network SVG visualization */}
              <svg width="100%" height="100%" viewBox="0 0 750 550" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connections (Edges) */}
                <g stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="1">
                  <line x1="180" y1="120" x2="375" y2="240" className="neural-line" />
                  <line x1="180" y1="120" x2="220" y2="400" className="neural-line" />
                  <line x1="375" y1="240" x2="570" y2="120" className="neural-line" />
                  <line x1="375" y1="240" x2="530" y2="400" className="neural-line" />
                  <line x1="220" y1="400" x2="530" y2="400" className="neural-line" />
                  <line x1="120" y1="500" x2="220" y2="400" className="neural-line" />
                  <line x1="570" y1="120" x2="650" y2="300" className="neural-line" />
                  <line x1="530" y1="400" x2="650" y2="300" className="neural-line" />
                </g>

                {/* Nodes with Logos, Labels & Brief Descriptions */}
                {[
                  { cx: 180, cy: 120, r: 32, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', label: 'Python', id: 'python', delay: '0s', line: { x2: 80, y2: 60 } },
                  { cx: 375, cy: 240, r: 42, iconUrl: 'https://cdn.simpleicons.org/nextdotjs/ffffff', label: 'Next.js', id: 'nextdotjs', delay: '1s', line: { x2: 475, y2: 200 } },
                  { cx: 570, cy: 120, r: 32, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', label: 'TypeScript', id: 'typescript', delay: '2.5s', line: { x2: 660, y2: 60 } },
                  { cx: 220, cy: 400, r: 34, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', label: 'Golang', id: 'go', delay: '1.5s', line: { x2: 130, y2: 340 } },
                  { cx: 530, cy: 400, r: 40, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', label: 'Docker', id: 'docker', delay: '0.5s', line: { x2: 610, y2: 480 } },
                  { cx: 120, cy: 500, r: 28, iconUrl: 'https://cdn.simpleicons.org/langchain/ffffff', label: 'LangChain', id: 'langchain', delay: '3s', line: { x2: 50, y2: 440 } },
                  { cx: 650, cy: 300, r: 34, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', label: 'FastAPI', id: 'fastapi', delay: '2s', line: { x2: 710, y2: 240 } }
                ].map((node, i) => (
                  <g key={i} className="neural-node" style={{ animationDelay: node.delay }}>
                    {/* Connection Line to Description */}
                    <line
                      x1={node.cx}
                      y1={node.cy}
                      x2={node.line.x2}
                      y2={node.line.y2}
                      stroke="var(--primary)"
                      strokeWidth="0.8"
                      strokeDasharray="3,3"
                      opacity="0.5"
                    />

                    {/* Description Text */}
                    <text
                      x={node.line.x2}
                      y={node.line.y2}
                      fill="white"
                      style={{ fontSize: '11px', fontWeight: '700', opacity: 1, fontStyle: 'italic', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                      textAnchor={node.line.x2 < node.cx ? 'end' : 'start'}
                    >
                      {(t.techDesc as any)[node.id]}
                    </text>

                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={node.r}
                      fill="rgba(255, 255, 255, 0.08)"
                      stroke="var(--primary)"
                      strokeWidth="1.2"
                      strokeOpacity="0.5"
                      style={{ filter: 'url(#glow)' }}
                    />
                    <image
                      href={node.iconUrl}
                      className="neural-logo-img"
                      x={node.cx - (node.r * 0.65)}
                      y={node.cy - (node.r * 0.65)}
                      width={node.r * 1.3}
                      height={node.r * 1.3}
                      style={{ opacity: 1, filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.6)) brightness(1.3)' }}
                    />
                    <text
                      x={node.cx}
                      y={node.cy + node.r + 18}
                      textAnchor="middle"
                      fill="var(--primary)"
                      style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', opacity: 0.9, textTransform: 'uppercase' }}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={valuesSectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>{t.valuesTitle}</h2>
          <p style={sectionSubtitleStyle}>{t.valuesSubtitle}</p>
        </div>
        <div className="values-grid" style={valuesGridStyle}>
          <div className="glass-card value-card-v2" style={valueCardStyle}>
            <div style={valueIconStyle}>🎯</div>
            <h4 style={cardTitleStyle}>{t.val1Title}</h4>
            <p style={cardTextStyle}>{t.val1Text}</p>
          </div>
          <div className="glass-card value-card-v2" style={valueCardStyle}>
            <div style={valueIconStyle}>🔍</div>
            <h4 style={cardTitleStyle}>{t.val2Title}</h4>
            <p style={cardTextStyle}>{t.val2Text}</p>
          </div>
          <div className="glass-card value-card-v2" style={valueCardStyle}>
            <div style={valueIconStyle}>🚀</div>
            <h4 style={cardTitleStyle}>{t.val3Title}</h4>
            <p style={cardTextStyle}>{t.val3Text}</p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>{t.expertiseTitle}</h2>

        </div>

        <div className="bento-grid-v2">
          {/* AI Engineering */}
          <div className="bento-card-v2">
            <div className="tech-card-bg-grid" />
            <div className="scanning-line" />
            <div className="tech-border-accent" />
            <div className="tech-border-accent bottom-right" />
            <div className="card-metadata">CORE_SYS: NEURAL_ENGINE</div>
            <div className="card-badge-v2">Level: Expert</div>
            <div className="card-glow-v2" />
            <div className="card-content-v2">
              <div className="tech-pulse-icon">
                <div className="card-icon-v2">🤖</div>
              </div>
              <h3 style={cardTitleStyle}>{t.aiTitle}</h3>
              <p style={cardTextStyle}>{t.aiText}</p>
            </div>
          </div>

          {/* Data Analytics */}
          <div className="bento-card-v2">
            <div className="tech-card-bg-grid" />
            <div className="scanning-line" />
            <div className="tech-border-accent" />
            <div className="tech-border-accent bottom-right" />
            <div className="card-metadata">DATA_LOG: ANALYSIS_READY</div>
            <div className="card-badge-v2" style={{color: 'var(--accent)'}}>Insightful</div>
            <div className="card-glow-v2" style={{background: 'radial-gradient(circle at 50% 120%, var(--accent-glow), transparent 70%)'}} />
            <div className="card-content-v2">
              <div className="tech-pulse-icon">
                <div className="card-icon-v2">📊</div>
              </div>
              <h3 style={cardTitleStyle}>{t.dataTitle}</h3>
              <p style={cardTextStyle}>{t.dataText}</p>
            </div>
          </div>

          {/* Automation */}
          <div className="bento-card-v2">
            <div className="tech-card-bg-grid" />
            <div className="scanning-line" />
            <div className="tech-border-accent" />
            <div className="tech-border-accent bottom-right" />
            <div className="card-metadata">AUTO_EXEC: CONTINUOUS</div>
            <div className="card-badge-v2">Efficiency</div>
            <div className="card-content-v2">
              <div className="tech-pulse-icon">
                <div className="card-icon-v2">⚙️</div>
              </div>
              <h3 style={cardTitleStyle}>{t.autoTitle}</h3>
              <p style={cardTextStyle}>{t.autoText}</p>
            </div>
          </div>

          {/* Admin Operations */}
          <div className="bento-card-v2">
            <div className="tech-card-bg-grid" />
            <div className="scanning-line" />
            <div className="tech-border-accent" />
            <div className="tech-border-accent bottom-right" />
            <div className="card-metadata">SYS_ADM: ROOT_ACCESS</div>
            <div className="card-badge-v2">Operational</div>
            <div className="card-content-v2">
              <div className="tech-pulse-icon">
                <div className="card-icon-v2">📂</div>
              </div>
              <h3 style={cardTitleStyle}>{t.adminTitle}</h3>
              <p style={cardTextStyle}>{t.adminText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Laboratory Section */}
      <section id="code-lab" style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>{t.codeTitle}</h2>
          <p style={sectionSubtitleStyle}>{t.codeSubtitle}</p>
        </div>

        <div className="glass-card" style={codeCardWrapperStyle}>
          {/* Mac-style Window Controls */}
          <div style={terminalHeaderStyle}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div className="terminal-tabs-container" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {(['Python', 'Go', 'TS', 'Next', 'Docker', 'FastAPI', 'LangChain'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  style={{
                    ...codeTabButtonStyle,
                    color: activeCodeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                    background: activeCodeTab === tab ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    borderColor: activeCodeTab === tab ? 'var(--primary)' : 'transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                style={{
                  ...runButtonStyle,
                  opacity: isRunning ? 0.5 : 1,
                  cursor: isRunning ? 'not-allowed' : 'pointer'
                }}
              >
                {isRunning ? (
                  <>
                    <span className="terminal-cursor" style={{ width: '6px', height: '12px', marginRight: '8px' }} />
                    EXECUTING...
                  </>
                ) : '▶ RUN'}
              </button>
            </div>
          </div>

          {/* Technical Brief */}
          <div style={codeBriefStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ padding: '4px 10px', background: 'var(--primary)', color: 'black', fontSize: '0.65rem', fontWeight: '900', borderRadius: '4px' }}>BRIEF</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>{codeSnippets[activeCodeTab].title}</h4>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {codeSnippets[activeCodeTab].desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
              {codeSnippets[activeCodeTab].details.map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syntax Highlighter */}
          <div className="code-area" style={codeAreaStyle}>
            <SyntaxHighlighter
              language={
                activeCodeTab === 'Python' || activeCodeTab === 'FastAPI' || activeCodeTab === 'LangChain' ? 'python' :
                  activeCodeTab === 'Go' ? 'go' :
                    activeCodeTab === 'Docker' ? 'docker' :
                      'typescript'
              }
              style={vscDarkPlus}
              customStyle={{
                background: 'transparent',
                padding: '1.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              {codeSnippets[activeCodeTab].code}
            </SyntaxHighlighter>
          </div>

          {/* Simulated Output Terminal */}
          <div style={{ ...terminalOutputWrapperStyle, height: showOutput || isRunning ? 'auto' : '0', padding: showOutput || isRunning ? '1.5rem' : '0', overflow: 'hidden', transition: 'all 0.5s ease' }}>
            <div style={terminalOutputHeaderStyle}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.5, letterSpacing: '1px' }}>
                {isRunning ? 'EXECUTING SYSTEM LOGS...' : 'OUTPUT CONSOLE'}
              </span>
            </div>
            {isRunning ? (
              <div style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                [INFO] Compiling source code...<br />
                [INFO] Allocating memory segments...<br />
                [INFO] Initializing environment...
              </div>
            ) : showOutput && (
              <div style={{ ...terminalOutputContentStyle, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {codeSnippets[activeCodeTab].output.split('\n').map((line, i) => {
                  const [content, comment] = line.split(' // ');
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{content}</span>
                      {comment && (
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                          # {comment}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Code Lab Conclusion */}
        <div style={codeConclusionStyle}>
          <div style={{ width: '40px', height: '1px', background: 'var(--primary)', opacity: 0.3, marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1rem', fontWeight: '600', color: 'white', fontStyle: 'italic', opacity: 0.9 }}>
            "{t.codeConclusion}"
          </p>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" style={sectionStyle} className="contact-section section-header">
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>{t.contactTitle}</h2>
          <p style={sectionSubtitleStyle}>{t.contactSubtitle}</p>
        </div>

        <div className="contact-grid" style={contactGridStyle}>
          {/* Email Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#ea4335' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#ea4335' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>Email</h3>
              <p style={cardTextStyleV2}>bonidaely19@gmail.com</p>
            </div>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bonidaely19@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-action-btn">
              {t.emailBtn}
            </a>
          </div>

          {/* WhatsApp & Phone Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#25D366' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>WhatsApp</h3>
              <p style={cardTextStyleV2}>+62 813-6249-4121</p>
            </div>
            <a href="https://wa.me/6281362494121" target="_blank" rel="noopener noreferrer" className="contact-action-btn" style={{ background: '#25D366', color: 'white' }}>
              {t.chatBtn}
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#0077b5' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(0, 119, 181, 0.1)', color: '#0077b5' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>LinkedIn</h3>
              <p style={cardTextStyleV2}>Bonifasius</p>
            </div>
            <a href="https://www.linkedin.com/in/boni-daely-767390238/" target="_blank" rel="noopener noreferrer" className="contact-action-btn">
              {lang === 'EN' ? 'Connect' : 'Koneksi'}
            </a>
          </div>

          {/* GitHub Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#ffffff' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>GitHub</h3>
              <p style={cardTextStyleV2}>bonifasiusdaely</p>
            </div>
            <a href="https://github.com/bonifasiusdaely" target="_blank" rel="noopener noreferrer" className="contact-action-btn">
              {lang === 'EN' ? 'Source' : 'Sumber'}
            </a>
          </div>

          {/* Instagram Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#E1306C' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(225, 48, 108, 0.1)', color: '#E1306C' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>Instagram</h3>
              <p style={cardTextStyleV2}>@bonifasius_daely</p>
            </div>
            <a href="https://www.instagram.com/bonifasius_daely/" target="_blank" rel="noopener noreferrer" className="contact-action-btn">
              {lang === 'EN' ? 'Follow' : 'Ikuti'}
            </a>
          </div>

          {/* X Card */}
          <div className="glass-card contact-card-v2" style={{ ...contactCardStyleV2, '--brand-color': '#1DA1F2' } as any}>
            <div className="contact-icon-wrapper" style={{ background: 'rgba(29, 161, 242, 0.1)', color: '#1DA1F2' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={cardTitleStyleV2}>X / Twitter</h3>
              <p style={cardTextStyleV2}>@BoniDaely</p>
            </div>
            <a href="https://x.com/BoniDaely" target="_blank" rel="noopener noreferrer" className="contact-action-btn">
              {lang === 'EN' ? 'Tweet' : 'Ikuti'}
            </a>
          </div>
        </div>
      </section>

      <footer style={footerStyle} className="footer-section">
        <div className="mesh-blob blob-2" style={{ opacity: 0.1, right: '-10%', bottom: '-10%', width: '800px', height: '800px' }} />

        <div className="footer-container" style={footerContainerStyle}>
          {/* Brand Column */}
          <div style={footerColumnStyle}>
            <div style={{ marginBottom: '1rem' }}>
              <span className="text-gradient" style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '1px' }}>BONI</span>
              <span style={{ fontSize: '2.2rem', fontWeight: '300', opacity: 0.8 }}>.AI</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: '1.8', fontSize: '0.95rem', maxWidth: '300px' }}>
              {lang === 'EN'
                ? 'Pioneering the next generation of AI-driven systems with precision and purpose.'
                : 'Merintis generasi sistem berbasis AI berikutnya dengan presisi dan tujuan.'}
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem' }}>
              <a href="https://github.com/bonifasiusdaely" target="_blank" rel="noopener noreferrer" className="social-link-footer" aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="https://www.instagram.com/bonifasius_daely/" target="_blank" rel="noopener noreferrer" className="social-link-footer" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://x.com/BoniDaely" target="_blank" rel="noopener noreferrer" className="social-link-footer" aria-label="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/boni-daely-767390238/" target="_blank" rel="noopener noreferrer" className="social-link-footer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={footerColumnStyle}>
            <h4 style={footerTitleStyle}>{lang === 'EN' ? 'Navigation' : 'Navigasi'}</h4>
            <ul style={footerListStyle}>
              <li><a href="#about" className="footer-link">Mission Control</a></li>
              <li><a href="#expertise" className="footer-link">Technical Stack</a></li>
              <li><a href="#projects" className="footer-link">Case Studies</a></li>
              <li><a href="#contact" className="footer-link">Get In Touch</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={footerColumnStyle}>
            <h4 style={footerTitleStyle}>{lang === 'EN' ? 'Communication' : 'Komunikasi'}</h4>
            <ul style={footerListStyle}>
              <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>
                <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.6 }}>Email</span>
                bonidaely19@gmail.com
                <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.6 }}>WhatsApp</span>
                +62 813-6249-4121
              </li>
            </ul>
          </div>

          {/* Availability & Location Map */}
          <div style={footerColumnStyle}>
            <h4 style={footerTitleStyle}>Location</h4>
            <div className="glass-card map-container">
              <a
                href="https://www.google.com/maps/search/?api=1&query=3.511259,98.672584"
                target="_blank"
                rel="noopener noreferrer"
                className="map-overlay"
                title={lang === 'EN' ? "Open in Google Maps" : "Buka di Google Maps"}
              >
                <div className="map-overlay-text">
                  {lang === 'EN' ? 'View on Maps' : 'Buka di Maps'}
                </div>
              </a>
              <iframe
                src="https://maps.google.com/maps?q=3.511259,98.672584&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.8) opacity(0.7)' }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>Jl. Karya Jaya No. 168, Deli Tua, Medan</span>
            </div>
          </div>

          {/* Availability */}
          <div style={footerColumnStyle}>
            <h4 style={footerTitleStyle}>Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(56, 189, 248, 0.05)', padding: '15px 25px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.15)', width: 'fit-content' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1.5px' }}>OPEN_FOR_COLLAB</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.8rem', fontStyle: 'italic' }}>
              Currently accepting new high-impact projects.
            </p>
          </div>
        </div>

        <div style={footerBottomStyle}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <p>© 2026 Bonifasius.</p>
            <p style={{ opacity: 0.4, fontSize: '0.75rem', letterSpacing: '1px' }}>{t.footerText.toUpperCase()}</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={backToTopStyle}
              className="glow-btn"
              aria-label="Back to top"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
          </div>
        </div>
      </footer>
      <AIChatBox lang={lang} />
    </main>
  );
}

// Styles
const heroSectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '0 5%',
  position: 'relative',
  overflow: 'hidden',
};

const heroContainerStyle: React.CSSProperties = {
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '4rem',
  alignItems: 'center',
  width: '100%',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 16px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '100px',
  fontSize: '0.65rem',
  fontWeight: '700',
  letterSpacing: '0.15em',
  marginBottom: '2.5rem',
  position: 'relative',
  overflow: 'hidden',
};

const heroContentStyle: React.CSSProperties = {
  textAlign: 'left',
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: '5.5rem',
  lineHeight: '1.0',
  fontWeight: '900',
  marginBottom: '2.5rem',
  letterSpacing: '-0.04em',
};

const heroSubtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: 'var(--text-muted)',
  lineHeight: '1.8',
  marginBottom: '4rem',
  maxWidth: '600px',
  fontWeight: '400',
};

const heroGraphicStyle: React.CSSProperties = {
  position: 'relative',
  height: '500px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ctaGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'flex-start',
};

const outlineBtnStyle: React.CSSProperties = {
  padding: '0.8rem 1.8rem',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  borderRadius: '12px',
  fontWeight: '600',
  border: '1px solid var(--glass-border)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const aboutSectionStyle: React.CSSProperties = {
  padding: '8rem 2rem',
  background: 'rgba(255, 255, 255, 0.01)',
};

const aboutContainerStyle: React.CSSProperties = {
  maxWidth: '1350px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '6rem',
  alignItems: 'center',
};

const aboutContentStyle: React.CSSProperties = {
  textAlign: 'left',
};

const smallTitleStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: '800',
  color: 'var(--primary)',
  letterSpacing: '0.2em',
  marginBottom: '1rem',
};

const aboutTextStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  color: 'var(--text-muted)',
  marginBottom: '1.5rem',
  fontWeight: '400',
};

const statsGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '3rem',
  marginTop: '3rem',
};

const statItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: '900',
  color: 'white',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.4)',
};

const aboutSkillsGridStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imagePlaceholderStyle: React.CSSProperties = {
  aspectRatio: '1',
  background: 'var(--glass)',
  borderRadius: '40px',
  border: '1px solid var(--glass-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
};

const valuesSectionStyle: React.CSSProperties = {
  padding: '8rem 2rem',
};

const valuesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const valueCardStyle: React.CSSProperties = {
  padding: '3rem 2rem',
  textAlign: 'center',
};

const valueIconStyle: React.CSSProperties = {
  fontSize: '3rem',
  marginBottom: '1.5rem',
};

const sectionStyle: React.CSSProperties = {
  padding: '8rem 2rem',
  maxWidth: '1250px',
  margin: '0 auto',
};

const sectionHeaderStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '5rem',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '3.5rem',
  fontWeight: '800',
  marginBottom: '1rem',
  letterSpacing: '-0.02em',
};

const sectionSubtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: 'var(--text-muted)',
  fontWeight: '400',
};

const iconBoxStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  display: 'block',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.6rem',
  fontWeight: '700',
  marginBottom: '1rem',
};

const cardTextStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  lineHeight: '1.7',
  fontSize: '1rem',
  fontWeight: '400',
};

const projectGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
  gap: '3rem',
};

const projectCardStyle: React.CSSProperties = {
  padding: '0',
  borderRadius: '32px',
};

const contactGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '1.5rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const contactCardStyleV2: React.CSSProperties = {
  borderRadius: '24px',
};

const cardTitleStyleV2: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: '800',
  marginBottom: '0.2rem',
  color: 'white',
};

const cardTextStyleV2: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontWeight: '400',
};

const projectImageWrapper: React.CSSProperties = {
  width: '100%',
  height: '320px',
  position: 'relative',
  borderBottom: '1px solid var(--card-border)',
};


const tagGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: '2rem',
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '600',
  padding: '4px 12px',
  borderRadius: '6px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.8)',
};

const certSectionStyle: React.CSSProperties = {
  padding: '8rem 2rem',
  background: 'rgba(56, 189, 248, 0.02)',
};

const certContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '6rem',
};

const certContentStyle: React.CSSProperties = {
  textAlign: 'left',
};

const certListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '3rem',
};

const certCardStyle: React.CSSProperties = {
  padding: '1.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const certDateStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '800',
  color: 'var(--primary)',
  letterSpacing: '1px',
};

const certTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: '700',
};

const certIssuerStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.5)',
};

const techStackStyle: React.CSSProperties = {
  textAlign: 'left',
};

const techGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '3rem',
};

const footerStyle: React.CSSProperties = {
  padding: '8rem 0 0 0',
  background: '#020617',
  borderTop: '1px solid var(--glass-border)',
  position: 'relative',
  overflow: 'hidden',
};

const footerCTAContainer: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto 8rem',
  padding: '0 2rem',
};

const footerCTACard: React.CSSProperties = {
  padding: '6rem 4rem',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '48px',
  background: 'rgba(15, 23, 42, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
};

const footerContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'grid',
  gridTemplateColumns: '1.5fr 0.7fr 1fr 1.8fr 1fr',
  gap: '3rem',
  paddingBottom: '6rem',
};

const footerColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const footerTitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '800',
  color: 'white',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  opacity: 0.9,
};

const footerListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
};

const footerBottomStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(2, 6, 23, 0.8)',
  padding: '2rem 5%',
  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '0.85rem',
};

const backToTopStyle: React.CSSProperties = {
  width: '45px',
  height: '45px',
  borderRadius: '12px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(2, 6, 23, 0.05)',
  border: '1px solid var(--glass-border)',
};

const codeCardWrapperStyle: React.CSSProperties = {
  maxWidth: '1000px',
  margin: '0 auto',
  overflow: 'hidden',
  padding: 0,
  background: 'rgba(2, 6, 23, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
};

const terminalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.03)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

const codeBriefStyle: React.CSSProperties = {
  padding: '1.5rem',
  background: 'rgba(56, 189, 248, 0.03)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
};

const codeTabButtonStyle: React.CSSProperties = {
  padding: '6px 16px',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: '700',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const codeAreaStyle: React.CSSProperties = {
  padding: '0.5rem',
};

const runButtonStyle: React.CSSProperties = {
  background: 'var(--primary)',
  color: 'black',
  border: 'none',
  padding: '6px 16px',
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: '800',
  marginLeft: '1rem',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
};

const terminalOutputWrapperStyle: React.CSSProperties = {
  background: 'rgba(2, 6, 23, 0.95)',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  padding: '1.5rem',
};

const terminalOutputHeaderStyle: React.CSSProperties = {
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
};

const terminalOutputContentStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  color: '#22c55e',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
  margin: 0,
};

const codeConclusionStyle: React.CSSProperties = {
  padding: '2.5rem 1.5rem',
  background: 'linear-gradient(to right, rgba(56, 189, 248, 0.05), transparent)',
  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
};


