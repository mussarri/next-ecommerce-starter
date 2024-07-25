import Header from "../components/header";
export default function RootLayout({ children }) {
  return (
    <div className="h-full ">
      <Header />
      {children}
    </div>
  );
}
