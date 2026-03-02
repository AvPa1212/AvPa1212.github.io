import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import CodeBlock from "./CodeBlock";
import WiresharkAnalyzer from "./WiresharkAnalyzer";

const pythonCode = `import csv
from collections import Counter
from typing import Dict, Any


class WiresharkLogParser:
    """
    Parses Wireshark CSV export and computes traffic statistics.
    Expected CSV columns:
    No., Time, Source, Destination, Protocol, Length, Info
    """

    def __init__(self, filePath: str):
        self.filePath = filePath
        self.protocolCounts = Counter()
        self.srcIpCounts = Counter()
        self.dstIpCounts = Counter()
        self.tcpFlagCounts = Counter()
        self.totalPackets = 0
        self.totalBytes = 0

    def parseFile(self) -> None:
        with open(self.filePath, newline='', encoding='utf-8') as csvFile:
            reader = csv.DictReader(csvFile)

            for row in reader:
                self.totalPackets += 1

                # Protocol statistics
                protocol = row.get("Protocol", "").strip()
                if protocol:
                    self.protocolCounts[protocol] += 1

                # Source/Destination statistics
                sourceIp = row.get("Source", "").strip()
                destinationIp = row.get("Destination", "").strip()

                if sourceIp:
                    self.srcIpCounts[sourceIp] += 1
                if destinationIp:
                    self.dstIpCounts[destinationIp] += 1

                # Packet size aggregation
                lengthValue = row.get("Length", "").strip()
                if lengthValue.isdigit():
                    self.totalBytes += int(lengthValue)

                # TCP flag extraction
                infoField = row.get("Info", "")
                self.extractTcpFlags(infoField)

    def extractTcpFlags(self, infoField: str) -> None:
        flagList = ["SYN", "ACK", "FIN", "RST", "PSH", "URG"]
        for flag in flagList:
            if flag in infoField:
                self.tcpFlagCounts[flag] += 1

    def generateSummary(self) -> Dict[str, Any]:
        return {
            "totalPackets": self.totalPackets,
            "totalBytes": self.totalBytes,
            "protocolDistribution": dict(self.protocolCounts),
            "top5Sources": self.srcIpCounts.most_common(5),
            "top5Destinations": self.dstIpCounts.most_common(5),
            "tcpFlagCounts": dict(self.tcpFlagCounts),
        }


if __name__ == "__main__":
    parser = WiresharkLogParser("capture.csv")
    parser.parseFile()

    stats = parser.generateSummary()

    print("\n=== Wireshark Traffic Summary ===")
    print(f"Total Packets: {stats['totalPackets']}")
    print(f"Total Bytes: {stats['totalBytes']}\n")

    print("Protocol Distribution:")
    for protocol, count in stats["protocolDistribution"].items():
        print(f"  {protocol}: {count}")

    print("\nTop 5 Source IPs:")
    for ip, count in stats["top5Sources"]:
        print(f"  {ip}: {count}")

    print("\nTop 5 Destination IPs:")
    for ip, count in stats["top5Destinations"]:
        print(f"  {ip}: {count}")

    print("\nTCP Flag Counts:")
    for flag, count in stats["tcpFlagCounts"].items():
        print(f"  {flag}: {count}")`;

export default function Projects() {
  const [showCode, setShowCode] = useState(false);

  return (
    <section
      id="projects"
      style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <h2 style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
        Projects
      </h2>

      {/* Main Projects */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
        }}
      >
        <ProjectCard
          title="C++ Physics Engine"
          description="2D rigid body simulation implementing impulse-based collision resolution and AABB detection."
          tech={["C++", "Physics", "Linear Algebra"]}
          github="https://github.com/AvPa1212/PhysEngine"
        />
      </motion.div>

      {/* Code Samples Section */}
      <section style={{ marginTop: "6rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          Code Samples
        </h2>

        <h3>Wireshark Traffic Analyzer</h3>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            marginBottom: "1.5rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>

        {showCode && (
          <CodeBlock code={pythonCode} language="python" />
        )}

        <WiresharkAnalyzer />
      </section>
    </section>
  );
}