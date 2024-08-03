import Image from "next/image";
import ProductImages from "../../components/productImages";
import ProductCard from "../../components/productCard";
import AddToCartButton from "../../components/addToCartButton";

async function getData(name) {
   

  const res = await fetch(`${process.env.API_URL}/api/products/` + name, {
    method: "GET",
    cache: "no-store",
  });

  return res.json();
}

export async function generateMetadata({ params, searchParams }) {
  // read route params
  const data = await getData(params.name);
  const product = data && data.product;
  return {
    title: product.title,
  };
}

export default async function Page({ params }) {
  const data = await getData(params.name);

  const product = data && data.product;

  return (
    <div className="max-width p-5">
      {product && (
        <div className="flex gap-5 flex-col sm:flex-row">
          <ProductImages images={product.images} />

          <div className="flex-1 w-full flex flex-col gap-2">
            <p className="font-semibold " style={{ fontSize: 22 }}>
              {product.title}
            </p>
            <p className="font-semibold text-lg">{product.price}$</p>
            <p className="text-[#333] py-2">{product.description}</p>
            <AddToCartButton product={product} />

            <div className="flex gap-3 text-sm ">
              <p className="font-semibold">Stock: </p>
              {product.stock > 0 && <p style={{ color: "green" }}>In Stocks</p>}
            </div>
            <div className="flex gap-3 text-sm ">
              <p className="font-semibold">Category: </p>
              <p className="capitalize text-[#333]">
                {product.category.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
