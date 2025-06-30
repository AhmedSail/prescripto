import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home1 from "../components/Home/Home1";
import Home2 from "../components/Home/Home2";
import Home3 from "../components/Home/Home3";
import Home4 from "../components/Home/Home4";
import Footer from "../components/Footer";
const Home = () => {
  const { userid } = useParams();
  console.log("User ID:", userid);

  return (
    <div className="container">
      <Navbar />
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      <Footer />
    </div>
  );
};

export default Home;
