import Countdown from "../components/Countdown";
import InviteLink from "../components/InviteLink";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <Newsletter />
      </div>

      <div className="max-w-md mx-auto mt-10  bg-white shadow-lg rounded-2xl">
        <Countdown />
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <InviteLink />
      </div>
    </>
  );
};
export default Home;