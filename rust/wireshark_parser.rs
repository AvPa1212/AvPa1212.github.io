use std::alloc::{alloc, dealloc, Layout};

static mut OUTPUT: Vec<u8> = Vec::new();

fn count_value(map: &mut Vec<(String, u32)>, value: &str) {
    if value.is_empty() { return; }
    if let Some((_, count)) = map.iter_mut().find(|(key, _)| key == value) {
        *count += 1;
    } else {
        map.push((value.to_string(), 1));
    }
}

fn top_five(mut values: Vec<(String, u32)>) -> Vec<(String, u32)> {
    values.sort_by(|a, b| b.1.cmp(&a.1));
    values.truncate(5);
    values
}

fn json_map(values: &[(String, u32)]) -> String {
    values.iter().map(|(key, value)| format!("\"{}\":{}", key.replace('"', "\\\""), value)).collect::<Vec<_>>().join(",")
}

fn json_pairs(values: &[(String, u32)]) -> String {
    values.iter().map(|(key, value)| format!("[\"{}\",{}]", key.replace('"', "\\\""), value)).collect::<Vec<_>>().join(",")
}

#[no_mangle]
pub extern "C" fn alloc_buffer(size: usize) -> *mut u8 {
    let layout = Layout::array::<u8>(size.max(1)).unwrap();
    unsafe { alloc(layout) }
}

#[no_mangle]
pub extern "C" fn free_buffer(pointer: *mut u8, size: usize) {
    let layout = Layout::array::<u8>(size.max(1)).unwrap();
    unsafe { dealloc(pointer, layout) }
}

#[no_mangle]
pub extern "C" fn output_pointer() -> *const u8 {
    unsafe { OUTPUT.as_ptr() }
}

#[no_mangle]
pub extern "C" fn output_length() -> usize {
    unsafe { OUTPUT.len() }
}

#[no_mangle]
pub extern "C" fn parse_csv(pointer: *const u8, length: usize) {
    let input = unsafe { std::str::from_utf8(std::slice::from_raw_parts(pointer, length)).unwrap_or("") };
    let mut protocols = Vec::new();
    let mut sources = Vec::new();
    let mut destinations = Vec::new();
    let mut flags = Vec::new();
    let mut total_bytes = 0u64;
    let mut total_packets = 0u64;
    let headers: Vec<&str> = input.lines().next().unwrap_or("").split(',').map(str::trim).collect();
    let index = |name: &str| headers.iter().position(|header| *header == name);
    let protocol_index = index("Protocol");
    let source_index = index("Source");
    let destination_index = index("Destination");
    let length_index = index("Length");
    let info_index = index("Info");
    for line in input.lines().skip(1).filter(|line| !line.trim().is_empty()) {
        let columns: Vec<&str> = line.split(',').collect();
        total_packets += 1;
        if let Some(i) = protocol_index { count_value(&mut protocols, columns.get(i).unwrap_or(&"").trim()); }
        if let Some(i) = source_index { count_value(&mut sources, columns.get(i).unwrap_or(&"").trim()); }
        if let Some(i) = destination_index { count_value(&mut destinations, columns.get(i).unwrap_or(&"").trim()); }
        if let Some(i) = length_index { total_bytes += columns.get(i).unwrap_or(&"").trim().parse::<u64>().unwrap_or(0); }
        if let Some(i) = info_index {
            let info = columns.get(i).unwrap_or(&"");
            for flag in ["SYN", "ACK", "FIN", "RST", "PSH", "URG"] {
                if info.contains(flag) { count_value(&mut flags, flag); }
            }
        }
    }
    let result = format!("{{\"totalPackets\":{},\"totalBytes\":{},\"protocolDistribution\":{{{}}},\"top5Sources\":[{}],\"top5Destinations\":[{}],\"tcpFlagCounts\":{{{}}}}}", total_packets, total_bytes, json_map(&protocols), json_pairs(&top_five(sources)), json_pairs(&top_five(destinations)), json_map(&flags));
    unsafe { OUTPUT = result.into_bytes(); }
}
