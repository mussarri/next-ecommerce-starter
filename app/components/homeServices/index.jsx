import React from "react";

const Service = ({ title, icon, description }) => (
  <div className="flex gap-4">
    <div className="text-buttonhover text-2xl">
      <i className={"fa-solid  fa-" + icon}></i>
    </div>
    <div className="flex-1">
      <h2 className="text-xl font-light uppercase">{title}</h2>
      <p className="text-md text-[#aaaaaa]  mt-1">{description}</p>
    </div>
  </div>
);

const services = [
  {
    title: "free delivery",
    description: "Consectetur adipi elit lorem ipsum dolor sit amet.",
    icon: "cart-shopping ",
  },
  {
    title: "Quality guarantee",
    description: "Consectetur adipi elit lorem ipsum dolor sit amet.",
    icon: "award",
  },
  {
    title: "Daily offers",
    description: "Amet consectetur adipi elit loreme ipsum dolor sit",
    icon: "tag",
  },
  {
    title: "100% secure payment",
    description: "Rem Lopsum dolor sit amet, consectetur adipi elit",
    icon: "shield-halved",
  },
];

const HomeServices = () => {
  return (
    <div className="home-services max-width p-2 px-5 grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-5 border-b border-silver bg-white py-10 md:py-24">
      {services.map((item) => (
        <Service {...item} />
      ))}
    </div>
  );
};

export default HomeServices;
