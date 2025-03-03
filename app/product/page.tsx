import ProductDetails from "@/components/product";
import React from "react";

const ProdutoPage = () => {
  return (
    <div>
      <ProductDetails params={{ id: "3" }} />{" "}
    </div>
  );
};

export default ProdutoPage;
