import HomeBanner from "./components/homeBanner";
import HomeServices from "./components/homeServices";
import MobileProducts from "./components/mobileProducts";

export default async function Home() {
  return (
    <>
      <HomeBanner />
      <HomeServices />
      <MobileProducts />
    </>
  );
}
