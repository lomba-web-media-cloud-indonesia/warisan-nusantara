interface ProvinceData {
  tour: string; //tempat wisata
  tag: string; //tagline atau gelar
  culture: string; // budaya
}

const INDONESIA_DATA: Record<string, ProvinceData> = {
  Aceh: {
    tour: "Masjid Raya Baiturrahman",
    tag: "Serambi Mekkah",
    culture: "Tari Saman",
  },
  "Sumatera Utara": {
    tour: "Danau Toba",
    tag: "Danau Vulkanik Terbesar",
    culture: "Batak",
  },
  "Sumatera Barat": {
    tour: "Jam Gadang",
    tag: "Ikon Kota Bukittinggi",
    culture: "Minangkabau",
  },
  Riau: {
    tour: "Istana Siak",
    tag: "Warisan Kesultanan Siak",
    culture: "Melayu",
  },
  "Kepulauan Riau": {
    tour: "Pulau Penyengat",
    tag: "Pusat Bahasa Melayu",
    culture: "Melayu Kepulauan",
  },
  Jambi: {
    tour: "Candi Muaro Jambi",
    tag: "Kompleks Candi Terluas",
    culture: "Melayu Jambi",
  },
  "Sumatera Selatan": {
    tour: "Jembatan Ampera",
    tag: "Ikon Sungai Musi",
    culture: "Palembang",
  },
  "Bangka Belitung": {
    tour: "Pantai Tanjung Tinggi",
    tag: "Negeri Laskar Pelangi",
    culture: "Melayu Bahari",
  },
  Bengkulu: {
    tour: "Benteng Marlborough",
    tag: "Benteng Inggris Terbesar",
    culture: "Melayu Bengkulu",
  },
  Lampung: {
    tour: "Way Kambas",
    tag: "Konservasi Gajah Sumatera",
    culture: "Suku Lampung",
  },
  Jakarta: {
    tour: "Monas",
    tag: "Simbol Perjuangan Bangsa",
    culture: "Betawi",
  },
  "Jawa Barat": {
    tour: "Gedung Sate",
    tag: "Arsitektur Klasik Bandung",
    culture: "Sunda",
  },
  "Jawa Tengah": {
    tour: "Candi Borobudur",
    tag: "Warisan Budaya Dunia",
    culture: "Jawa",
  },
  Yogyakarta: {
    tour: "Keraton Yogyakarta",
    tag: "Pusat Budaya Jawa",
    culture: "Jawa Mataram",
  },
  "Jawa Timur": {
    tour: "Gunung Bromo",
    tag: "Lautan Pasir Abadi",
    culture: "Jawa Timur-an",
  },
  Banten: {
    tour: "Baduy Dalam",
    tag: "Kearifan Lokal Alami",
    culture: "Suku Baduy",
  },
  Bali: {
    tour: "Pura Tanah Lot",
    tag: "Eksotisme Pesisir Bali",
    culture: "Hindu Bali",
  },
  "Nusa Tenggara Barat": {
    tour: "Sade Village",
    tag: "Desa Adat Suku Sasak",
    culture: "Sasak",
  },
  "Nusa Tenggara Timur": {
    tour: "Pulau Komodo",
    tag: "Habitat Naga Terakhir",
    culture: "Flores & Sumba",
  },
  "Kalimantan Barat": {
    tour: "Rumah Radakng",
    tag: "Rumah Panjang Terbesar",
    culture: "Dayak & Melayu",
  },
  "Kalimantan Tengah": {
    tour: "Tanjung Puting",
    tag: "Konservasi Orangutan",
    culture: "Dayak",
  },
  "Kalimantan Selatan": {
    tour: "Pasar Terapung",
    tag: "Tradisi Sungai Barito",
    culture: "Banjar",
  },
  "Kalimantan Timur": {
    tour: "Desa Budaya Pampang",
    tag: "Rumah Adat Dayak Kenyah",
    culture: "Dayak",
  },
  "Kalimantan Utara": {
    tour: "Kesultanan Bulungan",
    tag: "Sejarah Perbatasan",
    culture: "Dayak & Tidung",
  },
  "Sulawesi Utara": {
    tour: "Bunaken",
    tag: "Surga Bawah Laut",
    culture: "Minahasa",
  },
  Gorontalo: {
    tour: "Benteng Otanaha",
    tag: "Saksi Sejarah Gorontalo",
    culture: "Gorontalo",
  },
  "Sulawesi Tengah": {
    tour: "Taman Lore Lindu",
    tag: "Situs Megalitikum",
    culture: "Kaili",
  },
  "Sulawesi Barat": {
    tour: "Negeri di Atas Awan",
    tag: "Puncak Lolai",
    culture: "Mandar",
  },
  "Sulawesi Selatan": {
    tour: "Tana Toraja",
    tag: "Ritual Pemakaman Unik",
    culture: "Toraja & Bugis",
  },
  "Sulawesi Tenggara": {
    tour: "Wakatobi",
    tag: "Segitiga Terumbu Karang",
    culture: "Buton",
  },
  Maluku: {
    tour: "Benteng Belgica",
    tag: "Kepulauan Rempah-rempah ",
    culture: "Ambon",
  },
  "Maluku Utara": {
    tour: "Kedaton Ternate",
    tag: "Sejarah Rempah Dunia",
    culture: "Ternate & Tidore",
  },
  "Papua Barat": {
    tour: "Raja Ampat",
    tag: "Amazon Lautan Dunia",
    culture: "Papua Pesisir",
  },
  Papua: {
    tour: "Lembah Baliem",
    tag: "Tradisi Pegunungan Tengah",
    culture: "Suku Dani",
  },
};
export default INDONESIA_DATA;
