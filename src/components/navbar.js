import { AiOutlineLogout } from "react-icons/ai";
import { useGlobalContext } from "../context/appContext";

const Navbar = () => {
  const { user, logout } = useGlobalContext();
  // console.log(user.name);
  return (
    <nav className="nav">
      <h1>
        Jobs<span className="span-orange">App</span>
      </h1>
      {user && (
        <div className="nav-section">
          <h1>
            hello, <span className="span-orange">{user}</span>
          </h1>
          <button className="btn-logout" onClick={() => logout()}>
            <AiOutlineLogout />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
