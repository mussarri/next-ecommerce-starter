async function getData() {
  const res = await fetch("http:/localhost:3000/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <div>{data && data.products.map((item) => <div>hello</div>)}</div>;
}
