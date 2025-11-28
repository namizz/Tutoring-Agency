import Footer from "../container/Footer";
import GoRegister from "../container/GoRegister";
import Home from "../container/Home";
import NavBar from "../container/NavBar";
import Register from "../container/Register";
import Service from "../container/Service";
// import SpecialService from "../container/SpecialService";
import Value from "../container/Value";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className=" mx-auto ">
        <Home />
        <Value />
        <Service />
        <GoRegister />
        {/* <SpecialService /> */}
        <Register />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
