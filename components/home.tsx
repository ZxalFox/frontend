import Link from "next/link";

export function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-purple-400 to-purple-700 text-white p-8">
      <h1 className="text-5xl font-bold font-playfair mb-4">
        Nova Coleção Outono/Inverno
      </h1>
      <p className="text-lg max-w-xl">
        Descubra as últimas tendências e renove seu guarda-roupa com estilo.
      </p>
      <Link
        href="/products"
        className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-100"
      >
        Comprar Agora
      </Link>
    </section>
  );
}
