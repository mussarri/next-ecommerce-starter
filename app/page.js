import ProductCard from "./components/productCard";
import HomeBanner from "./components/homeBanner";
import HomeServices from "./components/homeServices";
import MobileProducts from "./components/mobileProducts";
import Header from "./components/header";

async function getData() {
  const res = await fetch(process.env.API_URL + "api/products", {
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
