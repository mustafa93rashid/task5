import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./ItemsIndex.css";
import ItemList from "../../../components/ItemList/ItemList";
import Pagination from "../../../components/Pagination/Pagination";
import type { Item } from "../../../types/Items";
import ActionButton from "../../../components/actionButton/ActionButton";

const ItemsIndex = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://web-production-3ca4c.up.railway.app/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setItems(res.data);
        setFilteredItems(res.data);
      })
      .catch(() => {
        setError("⚠️ Failed to load products. Please refresh your page or try again later.");
      });
  }, []);

  const handleSearch = () => {
    const query = inputRef.current?.value.trim().toLowerCase() || "";
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container-lg">
      <div className="dashboard-container d-flex flex-column align-items-center ">
        {/* Search Box */}
        <div className="position-relative col-lg-6 col-12 mb-2 w-50">
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Search product by name"
            onKeyDown={handleKeyDown}
            className="border-1 rounded-2 pe-5"
          />
          <img
            src="task5/images/Home/search.svg"
            alt="search"
            className="position-absolute top-50 end-0 translate-middle-y me-3"
          />
        </div>

        <div className="w-100 d-flex justify-content-center justify-content-lg-end mb-3">
          <ActionButton
            buttonText="ADD NEW PRODUCT"
            to="/home/itemindex/additem"
            dashbordClass=" fw-medium px-2 px-lg-4 py-2 py-lg-3 rounded-1 bg-orange border-0 "
          />
        </div>

        <ItemList items={currentItems} />

        {error && (
          <div className="text-center text-orange fs-5 w-100 mb-3 mt-3">
            {error}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default ItemsIndex;


