async function getData() {
  const res = {};
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <div>{data && data.products.map((item) => <div>hello</div>)}</div>;
}
