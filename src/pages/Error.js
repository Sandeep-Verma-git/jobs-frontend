import img from "../assets/404.png";

const Error = () => {
  return (
    <div className="not-found">
      <img src={img} alt="404 not found"></img>;
    </div>
  );
};

export default Error;
