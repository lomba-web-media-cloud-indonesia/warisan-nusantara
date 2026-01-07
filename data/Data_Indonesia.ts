interface ProvinceData {
  tour: string; //tempat wisata
  tag: string; //tagline atau gelar
  culture: string; // budaya
  svgName: string;
}

const INDONESIA_DATA: Record<string, ProvinceData> = {
  Aceh: {
    tour: "Masjid Raya Baiturrahman",
    tag: "Serambi Mekkah",
    culture: "Tari Saman",
    svgName: "Aceh",
  },
  "Sumatera Utara": {
    tour: "Danau Toba",
    tag: "Danau Vulkanik Terbesar",
    culture: "Batak",
    svgName: "Sumatera Utara",
  },
  "Sumatera Barat": {
    tour: "Jam Gadang",
    tag: "Ikon Kota Bukittinggi",
    culture: "Minangkabau",
    svgName: "Sumatera Barat",
  },
  Riau: {
    tour: "Istana Siak",
    tag: "Warisan Kesultanan Siak",
    culture: "Melayu",
    svgName: "Riau",
  },
  "Kepulauan Riau": {
    tour: "Pulau Penyengat",
    tag: "Pusat Bahasa Melayu",
    culture: "Melayu Kepulauan",
    svgName: "Kepulauan Riau",
  },
  Jambi: {
    tour: "Candi Muaro Jambi",
    tag: "Kompleks Candi Terluas",
    culture: "Melayu Jambi",
    svgName: "Jambi",
  },
  "Sumatera Selatan": {
    tour: "Jembatan Ampera",
    tag: "Ikon Sungai Musi",
    culture: "Palembang",
    svgName: "Sumatera Selatan",
  },
  "Bangka Belitung": {
    tour: "Pantai Tanjung Tinggi",
    tag: "Negeri Laskar Pelangi",
    culture: "Melayu Bahari",
    svgName: "Bangka Belitung",
  },
  Bengkulu: {
    tour: "Benteng Marlborough",
    tag: "Benteng Inggris Terbesar",
    culture: "Melayu Bengkulu",
    svgName: "Bengkulu",
  },
  Lampung: {
    tour: "Way Kambas",
    tag: "Konservasi Gajah Sumatera",
    culture: "Suku Lampung",
    svgName: "Lampung",
  },
  "Jakarta Raya": {
    tour: "Monas",
    tag: "Simbol Perjuangan Bangsa",
    culture: "Betawi",
    svgName: "Jakarta",
  },
  "Jawa Barat": {
    tour: "Gedung Sate",
    tag: "Arsitektur Klasik Bandung",
    culture: "Sunda",
    svgName: "Jawa Barat",
  },
  "Jawa Tengah": {
    tour: "Candi Borobudur",
    tag: "Warisan Budaya Dunia",
    culture: "Jawa",
    svgName: "Jawa Tengah",
  },
  Yogyakarta: {
    tour: "Keraton Yogyakarta",
    tag: "Pusat Budaya Jawa",
    culture: "Jawa Mataram",
    svgName: "Yogyakarta",
  },
  "Jawa Timur": {
    tour: "Gunung Bromo",
    tag: "Lautan Pasir Abadi",
    culture: "Jawa Timur-an",
    svgName: "Jawa Timur",
  },
  Banten: {
    tour: "Baduy Dalam",
    tag: "Kearifan Lokal Alami",
    culture: "Suku Baduy",
    svgName: "Banten",
  },
  Bali: {
    tour: "Pura Tanah Lot",
    tag: "Eksotisme Pesisir Bali",
    culture: "Hindu Bali",
    svgName: "Bali",
  },
  "Nusa Tenggara Barat": {
    tour: "Sade Village",
    tag: "Desa Adat Suku Sasak",
    culture: "Sasak",
    svgName: "Nusa Tenggara Barat",
  },
  "Nusa Tenggara Timur": {
    tour: "Pulau Komodo",
    tag: "Habitat Naga Terakhir",
    culture: "Flores & Sumba",
    svgName: "Nusa Tenggara Timur",
  },
  "Kalimantan Barat": {
    tour: "Rumah Radakng",
    tag: "Rumah Panjang Terbesar",
    culture: "Dayak & Melayu",
    svgName: "Kalimantan Barat",
  },
  "Kalimantan Tengah": {
    tour: "Tanjung Puting",
    tag: "Konservasi Orangutan",
    culture: "Dayak",
    svgName: "Kalimantan Tengah",
  },
  "Kalimantan Selatan": {
    tour: "Pasar Terapung",
    tag: "Tradisi Sungai Barito",
    culture: "Banjar",
    svgName: "Kalimantan Selatan",
  },
  "Kalimantan Timur": {
    tour: "Desa Budaya Pampang",
    tag: "Rumah Adat Dayak Kenyah",
    culture: "Dayak",
    svgName: "Kalimantan Timur",
  },
  "Kalimantan Utara": {
    tour: "Kesultanan Bulungan",
    tag: "Sejarah Perbatasan",
    culture: "Dayak & Tidung",
    svgName: "Kalimantan Utara",
  },
  "Sulawesi Utara": {
    tour: "Bunaken",
    tag: "Surga Bawah Laut",
    culture: "Minahasa",
    svgName: "Sulawesi Utara",
  },
  Gorontalo: {
    tour: "Benteng Otanaha",
    tag: "Saksi Sejarah Gorontalo",
    culture: "Gorontalo",
    svgName: "Gorontalo",
  },
  "Sulawesi Tengah": {
    tour: "Taman Lore Lindu",
    tag: "Situs Megalitikum",
    culture: "Kaili",
    svgName: "Sulawesi Tengah",
  },
  "Sulawesi Barat": {
    tour: "Negeri di Atas Awan",
    tag: "Puncak Lolai",
    culture: "Mandar",
    svgName: "Sulawesi Barat",
  },
  "Sulawesi Selatan": {
    tour: "Tana Toraja",
    tag: "Ritual Pemakaman Unik",
    culture: "Toraja & Bugis",
    svgName: "Sulawesi Selatan",
  },
  "Sulawesi Tenggara": {
    tour: "Wakatobi",
    tag: "Segitiga Terumbu Karang",
    culture: "Buton",
    svgName: "Sulawesi Tenggara",
  },
  Maluku: {
    tour: "Benteng Belgica",
    tag: "Kepulauan Rempah-rempah ",
    culture: "Ambon",
    svgName: "Maluku",
  },
  "Maluku Utara": {
    tour: "Kedaton Ternate",
    tag: "Sejarah Rempah Dunia",
    culture: "Ternate & Tidore",
    svgName: "Maluku Utara",
  },
  "Papua Barat": {
    tour: "Raja Ampat",
    tag: "Amazon Lautan Dunia",
    culture: "Papua Pesisir",
    svgName: "Papua Barat",
  },
  Papua: {
    tour: "Lembah Baliem",
    tag: "Tradisi Pegunungan Tengah",
    culture: "Suku Dani",
    svgName: "Papua",
  },
};
export default INDONESIA_DATA;
