export interface WiresharkStats {
  totalPackets: number
  totalBytes: number
  protocolDistribution: Record<string, number>
  top5Sources: [string, number][]
  top5Destinations: [string, number][]
  tcpFlagCounts: Record<string, number>
}

export function parseWiresharkCSV(csvText: string): WiresharkStats {
  const lines = csvText.split("\n").filter(l => l.trim() !== "")
  const headers = lines[0].split(",")

  const protocolCounts: Record<string, number> = {}
  const srcCounts: Record<string, number> = {}
  const dstCounts: Record<string, number> = {}
  const flagCounts: Record<string, number> = {}

  let totalPackets = 0
  let totalBytes = 0

  const flagList = ["SYN", "ACK", "FIN", "RST", "PSH", "URG"]

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",")

    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h.trim()] = cols[idx] ?? ""
    })

    totalPackets++

    const protocol = row["Protocol"]?.trim()
    if (protocol) {
      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1
    }

    const src = row["Source"]?.trim()
    if (src) {
      srcCounts[src] = (srcCounts[src] || 0) + 1
    }

    const dst = row["Destination"]?.trim()
    if (dst) {
      dstCounts[dst] = (dstCounts[dst] || 0) + 1
    }

    const length = parseInt(row["Length"])
    if (!isNaN(length)) {
      totalBytes += length
    }

    const info = row["Info"] || ""
    flagList.forEach(flag => {
      if (info.includes(flag)) {
        flagCounts[flag] = (flagCounts[flag] || 0) + 1
      }
    })
  }

  const sortTop5 = (obj: Record<string, number>) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

  return {
    totalPackets,
    totalBytes,
    protocolDistribution: protocolCounts,
    top5Sources: sortTop5(srcCounts),
    top5Destinations: sortTop5(dstCounts),
    tcpFlagCounts: flagCounts,
  }
}