/* eslint-disable @typescript-eslint/no-unused-vars */
export async function fetchWeather(
  city: string
): Promise<{ city: string; temperature: number } | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cities = [
        "Jakarta",
        "Bandung",
        "Surabaya",
        "Medan",
        "Semarang",
        "Yogyakarta",
        "Denpasar",
        "Makassar",
        "Palembang",
        "Balikpapan",
        "Pontianak",
        "Banjarmasin",
        "Manado",
        "Jayapura",
        "Padang",
        "Pekanbaru",
        "Batam",
        "Malang",
        "Bogor",
        "Depok",
        "Bekasi",
        "Tangerang",
        "Cirebon",
        "Solo",
        "Mataram",
        "Kupang",
        "Ambon",
        "Ternate",
        "Samarinda",
        "Cilegon",
      ];

      const resultCity = cities.find((e) =>
        e.toLowerCase().includes(city.toLowerCase())
      );
      const result = cities ? resultCity : null;

      resolve(
        result
          ? {
              city: result,
              temperature: Math.floor(Math.random() * 30) + 10,
            }
          : null
      );
    }, 1000);
  });
}
