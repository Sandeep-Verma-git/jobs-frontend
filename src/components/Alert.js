import { useEffect } from "react";
import { useGlobalContext } from "../context/appContext";

const Alert = () => {
  const { showAlert, setShowAlert } = useGlobalContext();

  useEffect(() => {
    setTimeout(() => {
      setShowAlert();
    }, 3000);
  });
  return (
    <p className={`alert ${showAlert.show && showAlert.type}`}>
      {showAlert.msg}
    </p>
  );
};

export default Alert;
