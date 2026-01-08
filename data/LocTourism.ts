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
    { name: "Masjid Raya Baiturrahman", x: 4, y: 32 },
    { name: "Danau Laut Tawar", x: 32, y: 47 },
  ],
  "Sumatera Utara": [
    { name: "Danau Toba", x: 65, y: 85 },
    { name: "Istana Maimun", x: 70, y: 71 },
  ],
  "Sumatera Barat": [
    { name: "Jam Gadang", x: 91, y: 131 },
    { name: "Pulau Cubadak", x: 91, y: 148 },
  ],
  Riau: [
    { name: "Masjid Raya An-Nur", x: 110, y: 118 },
    { name: "Candi Muara Takus", x: 92, y: 122 },
  ],
  "Kepulauan Riau": [
    { name: "Pulau Bintan", x: 1600, y: 186 },
    { name: "Pulau Batam", x: 905, y: 182 },
  ],
  Jambi: [
    { name: "Candi Muaro Jambi", x: 150, y: 150 },
    { name: "Danau Kerinci", x: 112, y: 164 },
  ],
  "Sumatera Selatan": [
    { name: "Pulau Kemaro", x: 169, y: 179 },
    { name: "Danau Ranau", x: 151, y: 210 },
  ],
  Bengkulu: [
    { name: "Benteng Marlborough", x: 103, y: 169 },
    { name: "Pantai Muara Kedurang", x: 136, y: 205 },
  ],
  Lampung: [
    { name: "Pantai Tanjung Setia", x: 154, y: 220 },
    { name: "Pantai Gigi Hiu", x: 170, y: 225 },
    { name: "Taman Purbakala Pugungraharjo", x: 179, y: 218 },
  ],
  "Bangka Belitung": [
    { name: "Pulau Lengkuas", x: 215, y: 171 },
    { name: "Danau Kaolin", x: 193, y: 171 },
  ],

  Banten: [
    { name: "Ujung Kulon", x: 175, y: 243 },
    { name: "Masjid Agung Banter", x: 189, y: 230.9 },
    { name: "Pantai Tanjung Lesung", x: 180.5, y: 238 },
  ],
  "Jakarta Raya": [
    { name: "Monas", x: 380, y: 208 },
    { name: "Taman Mini Indonesia Indah", x: 550, y: 580 },
    { name: "Ancol", x: 410, y: 108 },
  ],
  "Jawa Barat": [
    { name: "Taman Safari Bogor", x: 201, y: 244 },
    { name: "Tangkuban Perahu", x: 215, y: 241 },
    { name: "Kawah Putih", x: 213, y: 247 },
    { name: "Green Canyon", x: 228.7, y: 259.5 },
  ],
  "Jawa Tengah": [
    { name: "Candi Borobudur", x: 259, y: 258 },
    { name: "Candi Prambanan", x: 265, y: 260 },
    { name: "Keraton Surakarta", x: 269, y: 256 },
  ],
  Yogyakarta: [
    { name: "Keraton Yogyakarta", x: 262, y: 262 },
    { name: "Pantai Parangtritis", x: 261.4, y: 264.9 },
    { name: "Candi Ratu Boko", x: 264, y: 260.8 },
  ],
  "Jawa Timur": [
    { name: "Gunung Bromo", x: 308, y: 265 },
    { name: "Kawah Ijen", x: 328, y: 267 },
    { name: "Air Terjun Tumpak Sewu", x: 306, y: 269 },
  ],

  // BALI & NUSA TENGGARA
  Bali: [
    { name: "Uluwatu", x: 665.5, y: 615.5 },
    { name: "Tanah Lot", x: 672.7, y: 458.6 },
    { name: "Ubud", x: 925.5, y: 330.0 },
    { name: "Besakih", x: 1120.0, y: 260.5 },
  ],
  "Nusa Tenggara Barat": [
    { name: "Gunung Rinjani", x: 280, y: 153 },
    { name: "Gili Trawangan", x: 165, y: 100 },
    { name: "Pantai Senggigi", x: 110, y: 200 },
    { name: "Pantai Pink", x: 290, y: 350 },
  ],
  "Nusa Tenggara Timur": [
    { name: "Pulau Komodo", x: 20, y: 50 },
    { name: "Labuan Bajo", x: 50, y: 45 },
    { name: "Danau Kelimutu", x: 120, y: 60 },
    { name: "Wae Rebo", x: 55, y: 60 },
  ],

  // KALIMANTAN
  "Kalimantan Barat": [
    { name: "Taman Nasional Gunung Palung", x: 250, y: 135 },
    { name: "Tugu Khatulistiwa", x: 253, y: 128 },
  ],
  "Kalimantan Tengah": [
    { name: "Taman Nasional Tanjung Puting", x: 285, y: 165 },
    { name: "Bukit Tangkiling", x: 292, y: 160 },
  ],
  "Kalimantan Selatan": [
    { name: "Pasar Terapung Lok Baintan", x: 350, y: 182 },
    { name: "Pulau Kembang", x: 348, y: 180 },
  ],
  "Kalimantan Timur": [
    { name: "Pulau Derawan", x: 385, y: 100 },
    { name: "Taman Nasional Kutai", x: 377, y: 88 },
  ],
  "Kalimantan Utara": [
    { name: "Taman Nasional Kayan Mentarang", x: 375, y: 65 },
    { name: "Pulau Tarakan", x: 385, y: 62 },
  ],

  // SULAWESI
  "Sulawesi Utara": [
    { name: "Bunaken", x: 515, y: 95 },
    { name: "Pulau Lembeh", x: 520, y: 101 },
    { name: "Danau Tondano", x: 514, y: 106 },
    { name: "Tangkoko", x: 515, y: 103 },
  ],
  "Sulawesi Tengah": [
    { name: "Taman Nasional Lore Lindu", x: 435, y: 150 },
    { name: "Kepulauan Togean", x: 465, y: 133 },
    { name: "Danau Poso", x: 440, y: 160 },
  ],
  "Sulawesi Selatan": [
    { name: "Tana Toraja", x: 422, y: 187 },
    { name: "Pantai Losari", x: 418, y: 217 },
    { name: "Benteng Rotterdam", x: 420, y: 215 },
    { name: "Pulau Selayar", x: 437, y: 230 },
  ],
  "Sulawesi Tenggara": [
    { name: "Pulau Wakatobi", x: 1075, y: 895 },
    { name: "Pantai Nambo", x: 665, y: 455 },
    { name: "Taman Nasional Rawa Aopa", x: 468, y: 590 },
  ],
  Gorontalo: [
    { name: "Olele", x: 485, y: 120 },
    { name: "Benteng Otanaha", x: 482, y: 117 },
  ],
  "Sulawesi Barat": [
    { name: "Pantai Palippis", x: 415, y: 185 },
    { name: "Taman Nasional Mamuju", x: 418, y: 163 },
  ],

  // MALUKU & PAPUA
  Maluku: [
    { name: "Benteng Belgica", x: 595, y: 210 },
    { name: "Pulau Banda", x: 598, y: 213 },
    { name: "Pantai Ora", x: 589, y: 176 },
  ],
  "Maluku Utara": [
    { name: "Pulau Ternate", x: 557, y: 110 },
    { name: "Pulau Tidore", x: 557, y: 120 },
    { name: "Gunung Gamalama", x: 557, y: 112 },
  ],
  Papua: [
    { name: "Danau Sentani", x: 740, y: 165 },
    { name: "Lembah Baliem", x: 745, y: 182 },
    { name: "Taman Nasional Lorentz", x: 725, y: 200 },
  ],
  "Papua Barat": [
    { name: "Raja Ampat", x: 617, y: 145 },
    { name: "Pulau Misool", x: 605, y: 160 },
    { name: "Kepulauan Wayag", x: 617, y: 130 },
  ],
};
