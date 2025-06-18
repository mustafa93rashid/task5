import { Card } from "react-bootstrap";
import { FaUsers, FaHeart, FaShoppingCart, FaDollarSign, FaCashRegister } from "react-icons/fa";
import "./Reporting.css";

const Reporting = () => {
  const items = [
    { value: "120", label: "Total Visitors", icon: <FaUsers /> },
    { value: "24", label: "Favorites", icon: <FaHeart /> },
    { value: "15", label: "Orders", icon: <FaShoppingCart /> },
    { value: "$35,200", label: "Sales Weekly", icon: <FaDollarSign /> },
    { value: "$3,200", label: "Sold Today", icon: <FaCashRegister /> },
  ];

  return (
    <div className="main-content w-100 mt-4">
      <h4 className="mb-0">Dashboard Stats</h4>
      <div className="d-flex flex-wrap gap-4 mt-3 justify-content-center ">
        {items.map((item, index) => (
          <Card key={index} className="report-card shadow-sm bg-white border rounded-2 p-3 text-center flex-grow-1">
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2 text-orange">
              <span className="fs-6">{item.icon}</span>
              <h6 className="fs-6 mb-0">{item.label}</h6>
            </div>
            <p className="fs-3 fw-bold text-dark mb-0">{item.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reporting;
