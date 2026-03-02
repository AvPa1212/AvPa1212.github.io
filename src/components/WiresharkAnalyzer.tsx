import { useState } from "react";
import { motion } from "framer-motion";

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

  function parseCSV(text: string) {
    const lines = text.split("\n").filter(Boolean);
    const headers = lines[0].split(",");

    const getIndex = (col: string) =>
      headers.findIndex((h) => h.trim() === col);

    const protocolIdx = getIndex("Protocol");
    const sourceIdx = getIndex("Source");
    const destIdx = getIndex("Destination");
    const lengthIdx = getIndex("Length");
    const infoIdx = getIndex("Info");

    const protocolCounts: Record<string, number> = {};
    const srcCounts: Record<string, number> = {};
    const dstCounts: Record<string, number> = {};
    const flagCounts: Record<string, number> = {};
    let totalPackets = 0;
    let totalBytes = 0;

    const flags = ["SYN", "ACK", "FIN", "RST", "PSH", "URG"];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      totalPackets++;

      const protocol = row[protocolIdx]?.trim();
      if (protocol) {
        protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
      }

      const src = row[sourceIdx]?.trim();
      if (src) srcCounts[src] = (srcCounts[src] || 0) + 1;

      const dst = row[destIdx]?.trim();
      if (dst) dstCounts[dst] = (dstCounts[dst] || 0) + 1;

      const length = parseInt(row[lengthIdx]);
      if (!isNaN(length)) totalBytes += length;

      const info = row[infoIdx] || "";
      flags.forEach((flag) => {
        if (info.includes(flag)) {
          flagCounts[flag] = (flagCounts[flag] || 0) + 1;
        }
      });
    }

    const top5 = (obj: Record<string, number>) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return {
      totalPackets,
      totalBytes,
      protocolDistribution: protocolCounts,
      top5Sources: top5(srcCounts),
      top5Destinations: top5(dstCounts),
      tcpFlagCounts: flagCounts,
    };
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const result = parseCSV(text);
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