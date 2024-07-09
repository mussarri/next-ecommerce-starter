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

export default function Page({ params }) {
  return <div>My Post: {params.name}</div>;
}
