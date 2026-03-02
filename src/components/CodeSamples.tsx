import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { parseWiresharkCSV } from "../utils/wiresharkParser"
import type { WiresharkStats } from "../utils/wiresharkParser"

export default function CodeSamples() {
  const [showCode, setShowCode] = useState(false)
  const [stats, setStats] = useState<WiresharkStats | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = async (file: File) => {
    const text = await file.text()
    const result = parseWiresharkCSV(text)
    setStats(result)
  }

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-6">Code Samples</h2>

      {/* Toggle Button */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="px-5 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition"
      >
        {showCode ? "Hide Code" : "Show Code"}
      </button>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <details className="bg-secondary p-4 rounded-xl">
              <summary className="cursor-pointer font-semibold">
                Wireshark Parser (Python)
              </summary>
              <pre className="mt-4 text-sm overflow-x-auto">
{`# Your original Python script here`}
              </pre>
            </details>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag & Drop Upload */}
      <div
        className={`mt-10 p-10 border-2 border-dashed rounded-2xl text-center transition
          ${dragActive ? "border-primary bg-primary/10" : "border-gray-500"}
        `}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          if (e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
          }
        }}
      >
        <p className="mb-4">Drag & Drop CSV here</p>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFile(e.target.files[0])
            }
          }}
          className="hidden"
          id="csvUpload"
        />
        <label
          htmlFor="csvUpload"
          className="px-5 py-2 rounded-xl bg-primary text-white cursor-pointer hover:opacity-90 transition"
        >
          Upload CSV
        </label>
      </div>

      {/* Animated Result Cards */}
      <AnimatePresence>
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6 mt-10"
          >
            <ResultCard title="Total Packets" value={stats.totalPackets} />
            <ResultCard title="Total Bytes" value={stats.totalBytes} />
            <ResultCard title="Top Sources" value={stats.top5Sources} />
            <ResultCard title="Top Destinations" value={stats.top5Destinations} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ResultCard({ title, value }: any) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-6 bg-secondary rounded-2xl shadow-lg"
    >
      <h3 className="font-semibold mb-3">{title}</h3>
      <pre className="text-sm whitespace-pre-wrap">
        {typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : value}
      </pre>
    </motion.div>
  )
}