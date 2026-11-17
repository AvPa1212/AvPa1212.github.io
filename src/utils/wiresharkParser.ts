export interface WiresharkStats {
  totalPackets: number
  totalBytes: number
  protocolDistribution: Record<string, number>
  top5Sources: [string, number][]
  top5Destinations: [string, number][]
  tcpFlagCounts: Record<string, number>
}

export function parseWiresharkCSV(csvText: string): WiresharkStats {
  const lines = csvText.split("\n").filter(line => line.trim() !== "")
  const headers = lines[0]?.split(",") ?? []
  const protocolCounts: Record<string, number> = {}
  const srcCounts: Record<string, number> = {}
  const dstCounts: Record<string, number> = {}
  const flagCounts: Record<string, number> = {}
  let totalPackets = 0
  let totalBytes = 0
  const flagList = ["SYN", "ACK", "FIN", "RST", "PSH", "URG"]

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(",")
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header.trim()] = columns[index] ?? ""
    })
    totalPackets++
    const protocol = row["Protocol"]?.trim()
    if (protocol) protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1
    const source = row["Source"]?.trim()
    if (source) srcCounts[source] = (srcCounts[source] || 0) + 1
    const destination = row["Destination"]?.trim()
    if (destination) dstCounts[destination] = (dstCounts[destination] || 0) + 1
    const length = parseInt(row["Length"], 10)
    if (!isNaN(length)) totalBytes += length
    const info = row["Info"] || ""
    flagList.forEach(flag => {
      if (info.includes(flag)) flagCounts[flag] = (flagCounts[flag] || 0) + 1
    })
  }

  const sortTop5 = (values: Record<string, number>): [string, number][] =>
    Object.entries(values).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return {
    totalPackets,
    totalBytes,
    protocolDistribution: protocolCounts,
    top5Sources: sortTop5(srcCounts),
    top5Destinations: sortTop5(dstCounts),
    tcpFlagCounts: flagCounts,
  }
}

let wasmPromise: Promise<WebAssembly.Instance | null> | null = null

async function loadRustParser(): Promise<WebAssembly.Instance | null> {
  if (!wasmPromise) {
    wasmPromise = fetch("/wasm/wireshark_parser.wasm")
      .then(response => response.arrayBuffer())
      .then(bytes => WebAssembly.instantiate(bytes, {}))
      .then(result => result.instance)
      .catch(() => null)
  }
  return wasmPromise
}

export async function parseWiresharkCSVFast(csvText: string): Promise<WiresharkStats> {
  const instance = await loadRustParser()
  const exports = instance?.exports as {
    memory?: WebAssembly.Memory
    alloc_buffer?: (size: number) => number
    free_buffer?: (pointer: number, size: number) => void
    parse_csv?: (pointer: number, length: number) => void
    output_pointer?: () => number
    output_length?: () => number
  } | undefined

  if (!exports?.memory || !exports.alloc_buffer || !exports.free_buffer || !exports.parse_csv || !exports.output_pointer || !exports.output_length) {
    return parseWiresharkCSV(csvText)
  }

  const input = new TextEncoder().encode(csvText)
  const pointer = exports.alloc_buffer(input.length)
  new Uint8Array(exports.memory.buffer, pointer, input.length).set(input)
  exports.parse_csv(pointer, input.length)
  exports.free_buffer(pointer, input.length)
  const outputPointer = exports.output_pointer()
  const outputLength = exports.output_length()
  const output = new TextDecoder().decode(new Uint8Array(exports.memory.buffer, outputPointer, outputLength))
  return JSON.parse(output) as WiresharkStats
}
