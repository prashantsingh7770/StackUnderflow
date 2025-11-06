import ProductPage from "./ProductPage";
import Corousel from "../component/Corousel";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Corousel />

      {/* Main Content */}
      <main className="flex-1 z-0">
        <ProductPage />
      </main>
    </div>
  );
};

export default Home;
