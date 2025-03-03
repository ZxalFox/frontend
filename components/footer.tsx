import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-6 bg-purple-600 text-white text-center shadow-lg">
      <p className="text-lg font-semibold">
        FashionStore &copy; {new Date().getFullYear()}
      </p>
      <nav className="flex gap-6 mt-2">
        <Link href="/privacy" className="hover:underline">
          Privacidade
        </Link>
        <Link href="/terms" className="hover:underline">
          Termos
        </Link>
        <Link href="/contact" className="hover:underline">
          Contato
        </Link>
      </nav>
    </footer>
  );
}
