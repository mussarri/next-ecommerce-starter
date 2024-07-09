export async function generateMetadata({ params, searchParams }) {
  // read route params
  const id = params.name;

  // fetch data
  const product = {
    title: "asdasd",
  };
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: id,
    openGraph: {
      images: ["/some-specific-page-image.jpg"],
    },
  };
}
async function getData(name) {
  const res = {
    products: [],
  };

  return res;
}

export default async function Page({ params }) {
  const data = await getData(params.name);
  return <div>My Post: {params.name}</div>;
}
