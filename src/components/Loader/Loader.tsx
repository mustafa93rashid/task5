import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
      <img className="spinner" src="/task5/images/Home/sidebar/miniLogo.png"></img>
    </div>
  );
};

export default Loader;