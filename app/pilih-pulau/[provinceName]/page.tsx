import INDONESIA_DATA from "@/data/Data_Indonesia";

export default function DetailProvinsi({
  params,
}: {
  params: { provinceName: string };
}) {
  // Decode slug kembali atau cari yang cocok
  const provinceName = decodeURIComponent(params.provinceName);

  // Ambil data berdasarkan key (jika pakai slug, sesuaikan cara carinya)
  const data =
    INDONESIA_DATA[provinceName] ||
    Object.values(INDONESIA_DATA).find(
      (d) => d.tour.toLowerCase() === provinceName
    );

  if (!data) return <div>Provinsi tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-20">
      <h1 className="text-5xl font-black uppercase">{provinceName}</h1>
      <p className="text-emerald-400 italic text-xl mt-4">"{data.tag}"</p>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
            Destinasi
          </h3>
          <p className="text-2xl font-bold">{data.tour}</p>
        </div>
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
            Budaya
          </h3>
          <p className="text-2xl font-bold">{data.culture}</p>
        </div>
      </div>
    </div>
  );
}
