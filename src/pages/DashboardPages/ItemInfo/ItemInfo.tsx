import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item } from "../../../types/Items";
import BackWordHome from "../../../components/BackWordHome/BackWordHome";
import "./ItemInfo.css";

const ItemInfo = () => {
    const { id } = useParams();
    const [showItem, setShowItem] = useState<Item>();

    useEffect(() => {
        axios.get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                setShowItem(res.data);
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
            });
    }, []);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const pad = (n: number) => (n < 10 ? "0" + n : n);
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    };
    return (
        <div className="itemShowWapper">
            <BackWordHome />

            <h2 className="fw-semibold itemShowTitle">{showItem?.name}</h2>

            <div className="d-flex justify-content-center">
                <img
                    src={showItem?.image_url}
                    alt={showItem?.name}
                    className="itemShowImage"
                />
            </div>

            <div className="d-flex justify-content-between align-items-center flex-column flex-wrap flex-lg-row text-center">
                <p className="fw-semibold itemShowPrice">Price: <span className="fw-medium itemShowSpan">{showItem?.price}$</span></p>
                <p className="fw-semibold itemShowPrice">Added At: <span className="fw-medium itemShowSpan">{formatDate(showItem?.created_at)}</span> </p>
            </div>

            <p className="fw-semibold text-center itemShowPrice">
                Updated At: <span className="fw-medium itemShowSpan">{formatDate(showItem?.updated_at)}</span>
            </p>
        </div>
    );
}

export default ItemInfo