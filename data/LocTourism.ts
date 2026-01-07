export interface TouristSpot {
  name: string;
  x: number;
  y: number;
}

export interface TouristData {
  [province: string]: TouristSpot[];
}

export const touristSpots: TouristData = {
  // SUMATERA
  Aceh: [
    { name: "Masjid Raya Baiturrahman", x: 27, y: 36 },
    { name: "Pulau Weh", x: 15, y: 28 },
    { name: "Danau Laut Tawar", x: 35, y: 45 },
    { name: "Pantai Lampuuk", x: 24, y: 38 },
  ],
  "Sumatera Utara": [
    { name: "Danau Toba", x: 55, y: 100 },
    { name: "Pulau Samosir", x: 56, y: 101 },
    { name: "Bukit Lawang", x: 52, y: 95 },
    { name: "Istana Maimun", x: 58, y: 96 },
    { name: "Air Terjun Sipiso-piso", x: 57, y: 103 },
  ],
  "Sumatera Barat": [
    { name: "Jam Gadang", x: 80, y: 125 },
    { name: "Ngarai Sianok", x: 79, y: 127 },
    { name: "Danau Maninjau", x: 77, y: 123 },
    { name: "Pulau Cubadak", x: 73, y: 132 },
    { name: "Istana Pagaruyung", x: 82, y: 128 },
  ],
  Riau: [
    { name: "Masjid Raya An-Nur", x: 130, y: 118 },
    { name: "Alam Mayang", x: 132, y: 120 },
    { name: "Danau Buatan Lembah Sari", x: 135, y: 116 },
  ],
  "Kepulauan Riau": [
    { name: "Pulau Bintan", x: 158, y: 125 },
    { name: "Pulau Batam", x: 155, y: 122 },
    { name: "Tanjung Pinang", x: 160, y: 127 },
  ],
  Jambi: [
    { name: "Candi Muaro Jambi", x: 145, y: 150 },
    { name: "Danau Kerinci", x: 140, y: 153 },
    { name: "Taman Nasional Kerinci Seblat", x: 138, y: 156 },
  ],
  "Sumatera Selatan": [
    { name: "Jembatan Ampera", x: 165, y: 190 },
    { name: "Pulau Kemaro", x: 167, y: 192 },
    { name: "Danau Ranau", x: 160, y: 198 },
  ],
  Bengkulu: [
    { name: "Benteng Marlborough", x: 105, y: 172 },
    { name: "Pantai Panjang", x: 103, y: 174 },
    { name: "Danau Dendam Tak Sudah", x: 108, y: 170 },
  ],
  Lampung: [
    { name: "Pantai Tanjung Setia", x: 150, y: 215 },
    { name: "Krakatau", x: 158, y: 218 },
    { name: "Way Kambas", x: 162, y: 210 },
  ],
  "Bangka Belitung": [
    { name: "Pantai Tanjung Tinggi", x: 210, y: 168 },
    { name: "Pulau Lengkuas", x: 213, y: 170 },
    { name: "Danau Kaolin", x: 208, y: 165 },
  ],

  Banten: [
    { name: "Ujung Kulon", x: 176, y: 238 },
    { name: "Tanjung Lesung", x: 179, y: 240 },
    { name: "Pulau Umang", x: 178, y: 242 },
    { name: "Benteng Speelwijk", x: 185, y: 236 },
  ],
  "Jakarta Raya": [
    { name: "Monas", x: 380, y: 208 },
    { name: "Taman Mini Indonesia Indah", x: 550, y: 580 },
    { name: "Ancol", x: 410, y: 108 },
  ],
  "Jawa Barat": [
    { name: "Tangkuban Perahu", x: 215, y: 238 },
    { name: "Kawah Putih", x: 217, y: 245 },
    { name: "Gedung Sate", x: 213, y: 240 },
    { name: "Pantai Pangandaran", x: 225, y: 250 },
    { name: "Green Canyon", x: 223, y: 252 },
  ],
  "Jawa Tengah": [
    { name: "Candi Borobudur", x: 260, y: 250 },
    { name: "Candi Prambanan", x: 267, y: 252 },
    { name: "Lawang Sewu", x: 263, y: 245 },
    { name: "Dieng Plateau", x: 255, y: 246 },
    { name: "Karimunjawa", x: 253, y: 235 },
  ],
  "DI Yogyakarta": [
    { name: "Keraton Yogyakarta", x: 268, y: 263 },
    { name: "Malioboro", x: 268, y: 262 },
    { name: "Pantai Parangtritis", x: 270, y: 267 },
    { name: "Candi Ratu Boko", x: 270, y: 261 },
  ],
  "Jawa Timur": [
    { name: "Gunung Bromo", x: 288, y: 252 },
    { name: "Kawah Ijen", x: 302, y: 257 },
    { name: "Taman Nasional Baluran", x: 305, y: 253 },
    { name: "Pantai Malang Selatan", x: 283, y: 258 },
    { name: "Trowulan", x: 277, y: 250 },
  ],

  // BALI & NUSA TENGGARA
  Bali: [
    { name: "Uluwatu", x: 665.5, y: 615.5 },
    { name: "Tanah Lot", x: 502.7, y: 278.6 },
    { name: "Ubud", x: 345.5, y: 270.0 },
    { name: "Besakih", x: 1120.0, y: 260.5 },
  ],
  "Nusa Tenggara Barat": [
    { name: "Gunung Rinjani", x: 380, y: 273 },
    { name: "Gili Trawangan", x: 375, y: 271 },
    { name: "Pantai Senggigi", x: 377, y: 273 },
    { name: "Pantai Pink", x: 390, y: 277 },
  ],
  "Nusa Tenggara Timur": [
    { name: "Pulau Komodo", x: 445, y: 285 },
    { name: "Labuan Bajo", x: 442, y: 283 },
    { name: "Danau Kelimutu", x: 455, y: 280 },
    { name: "Wae Rebo", x: 448, y: 285 },
  ],

  // KALIMANTAN
  "Kalimantan Barat": [
    { name: "Taman Nasional Gunung Palung", x: 250, y: 135 },
    { name: "Tugu Khatulistiwa", x: 253, y: 128 },
    { name: "Danau Sentarum", x: 257, y: 133 },
  ],
  "Kalimantan Tengah": [
    { name: "Taman Nasional Tanjung Puting", x: 285, y: 165 },
    { name: "Bukit Tangkiling", x: 292, y: 160 },
    { name: "Danau Tahai", x: 288, y: 157 },
  ],
  "Kalimantan Selatan": [
    { name: "Pasar Terapung Lok Baintan", x: 350, y: 182 },
    { name: "Pulau Kembang", x: 348, y: 180 },
    { name: "Masjid Sultan Suriansyah", x: 352, y: 179 },
  ],
  "Kalimantan Timur": [
    { name: "Pulau Derawan", x: 385, y: 100 },
    { name: "Taman Nasional Kutai", x: 377, y: 88 },
    { name: "Danau Labuan Cermin", x: 390, y: 105 },
  ],
  "Kalimantan Utara": [
    { name: "Taman Nasional Kayan Mentarang", x: 375, y: 65 },
    { name: "Pulau Tarakan", x: 385, y: 62 },
  ],

  // SULAWESI
  "Sulawesi Utara": [
    { name: "Bunaken", x: 515, y: 105 },
    { name: "Pulau Lembeh", x: 520, y: 108 },
    { name: "Danau Tondano", x: 517, y: 106 },
    { name: "Tangkoko", x: 522, y: 107 },
  ],
  "Sulawesi Tengah": [
    { name: "Taman Nasional Lore Lindu", x: 455, y: 140 },
    { name: "Kepulauan Togean", x: 465, y: 133 },
    { name: "Danau Poso", x: 458, y: 143 },
  ],
  "Sulawesi Selatan": [
    { name: "Tana Toraja", x: 435, y: 175 },
    { name: "Pantai Losari", x: 428, y: 185 },
    { name: "Benteng Rotterdam", x: 428, y: 184 },
    { name: "Pulau Selayar", x: 432, y: 200 },
  ],
  "Sulawesi Tenggara": [
    { name: "Pulau Wakatobi", x: 475, y: 195 },
    { name: "Pantai Nambo", x: 465, y: 185 },
    { name: "Taman Nasional Rawa Aopa", x: 468, y: 190 },
  ],
  Gorontalo: [
    { name: "Olele", x: 475, y: 115 },
    { name: "Benteng Otanaha", x: 472, y: 117 },
  ],
  "Sulawesi Barat": [
    { name: "Pantai Palippis", x: 415, y: 160 },
    { name: "Taman Nasional Mamuju", x: 418, y: 163 },
  ],

  // MALUKU & PAPUA
  Maluku: [
    { name: "Benteng Belgica", x: 595, y: 180 },
    { name: "Pulau Banda", x: 598, y: 183 },
    { name: "Pantai Ora", x: 603, y: 175 },
  ],
  "Maluku Utara": [
    { name: "Pulau Ternate", x: 565, y: 132 },
    { name: "Pulau Tidore", x: 567, y: 133 },
    { name: "Gunung Gamalama", x: 565, y: 130 },
  ],
  Papua: [
    { name: "Raja Ampat", x: 660, y: 150 },
    { name: "Danau Sentani", x: 695, y: 175 },
    { name: "Lembah Baliem", x: 705, y: 182 },
    { name: "Taman Nasional Lorentz", x: 715, y: 190 },
  ],
  "Papua Barat": [
    { name: "Raja Ampat", x: 655, y: 150 },
    { name: "Pulau Misool", x: 648, y: 162 },
    { name: "Kepulauan Wayag", x: 665, y: 145 },
  ],
};
