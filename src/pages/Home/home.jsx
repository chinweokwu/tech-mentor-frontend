import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="bg-opacity-50 backdrop-blur-lg bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8">
            Discover amazing content here.
          </p>
          <Link
            to={"/dashboard"}
            className="bg-white text-blue-500 hover:bg-blue-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold py-2 px-6 rounded-full mr-4"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
