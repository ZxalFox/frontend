"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartProduct {
  category: string;
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: string;
  updated_at: string;
}

interface Cart {
  id: number;
  cart_items: Array<{
    cart_id: number;
    id: number;
    created_at: string;
    updated_at: string;
    quantity: number;
    product_id: number;
    product: CartProduct;
  }>;
  created_at: string;
  updated_at: string;
  total_price_cents: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data as Cart);
      } catch (err) {
        setError("Erro ao carregar o carrinho");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({} as Cart);
    } catch (err) {
      console.error("Erro ao remover item", err);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Carrinho de Compras
      </h2>
      {!cart?.cart_items ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cart.cart_items?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              {/* <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-16 h-16 object-cover"
              /> */}
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p>Quantidade: {item.quantity}</p>
                <p className="text-green-600 font-bold">
                  R$ {Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remover
              </button>
            </div>
          ))}
          <button
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            onClick={handleCheckout}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
