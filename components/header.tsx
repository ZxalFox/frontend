import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-purple-600 text-white shadow-lg">
      <Link href="/" className="text-2xl font-bold font-playfair">
        FashionStore
      </Link>
      <nav className="hidden md:flex gap-6 text-lg">
        <Link href="/products" className="hover:underline">
          Produtos
        </Link>
        <Link href="/about" className="hover:underline">
          Sobre
        </Link>
        <Link href="/contact" className="hover:underline">
          Contato
        </Link>
      </nav>
      <div className="flex gap-4">
        <button className="p-2 bg-white text-purple-600 rounded-full shadow-md">
          <User size={20} />
        </button>
        <button className="p-2 bg-white text-purple-600 rounded-full shadow-md">
          <ShoppingCart size={20} />
        </button>
      </div>
    </header>
  );
}
