import ProductCard from "./components/productCard/index";
import HomeBanner from "./components/homeBanner/index";
import HomeServices from "./components/HomeServices/index.jsx";
import MobileProducts from "./components/mobileProducts/index";
import Header from "./components/header";

async function getData() {
  const res = await fetch("http://127.0.0.1:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}
export default async function Home() {
  const data = await getData();
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomeServices />
      <MobileProducts />
    </div>
  );
}
