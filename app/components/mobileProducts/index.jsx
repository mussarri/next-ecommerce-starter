import ProductCard from "../productCard/index";

async function getData() {
  const res = await fetch(process.env.API_URL + "/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const MobileProducts = async () => {
  const data = await getData();
  const products =
    data &&
    data?.products
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  return (
    <div className="max-width p-2 border-b border-silver bg-white py-16 ">
      <h1 className="uppercase font-semibold" style={{ fontSize: "1.6rem" }}>
        Top Sellers
      </h1>
      <div className="grid grid-cols-4 gap-10 mt-5">
        {data && products.slice(0, 4).map((item) => <ProductCard {...item} />)}
      </div>
    </div>
  );
};

export default MobileProducts;
