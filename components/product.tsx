"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${params.id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Erro ao carregar o produto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/cart/items",
        {
          product_id: product?.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push("/cart");
    } catch (err) {
      setError("Erro ao adicionar ao carrinho.");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-2xl font-bold mt-4 text-purple-700">
          {product?.name}
        </h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
        <p className="text-xl font-semibold text-purple-600 mt-4">
          R$ {Number(product?.price).toFixed(2)}
        </p>
        <div className="mt-4 flex items-center">
          <label className="mr-2 text-gray-700">Quantidade:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className="w-16 p-2 border rounded-lg text-center"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
