import { useState } from "react";
import { motion } from "framer-motion";
import { parseWiresharkCSVFast } from "../utils/wiresharkParser";

interface Stats {
  totalPackets: number;
  totalBytes: number;
  protocolDistribution: Record<string, number>;
  top5Sources: [string, number][];
  top5Destinations: [string, number][];
  tcpFlagCounts: Record<string, number>;
}

export default function WiresharkAnalyzer() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const text = reader.result as string;
        const result = await parseWiresharkCSVFast(text);
        setStats(result);
        setError(null);
      } catch {
        setError("Invalid CSV format.");
      }
    };

    reader.readAsText(file);
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: "2rem" }}
        >
          <h4>Total Packets: {stats.totalPackets}</h4>
          <h4>Total Bytes: {stats.totalBytes}</h4>

          <h5>Protocol Distribution</h5>
          <pre>{JSON.stringify(stats.protocolDistribution, null, 2)}</pre>

          <h5>Top 5 Sources</h5>
          <pre>{JSON.stringify(stats.top5Sources, null, 2)}</pre>

          <h5>Top 5 Destinations</h5>
          <pre>{JSON.stringify(stats.top5Destinations, null, 2)}</pre>

          <h5>TCP Flags</h5>
          <pre>{JSON.stringify(stats.tcpFlagCounts, null, 2)}</pre>
        </motion.div>
      )}
    </div>
  );
}