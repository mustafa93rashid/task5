import { useEffect, useState } from "react";
import axios from "axios";
import ActionButton from "../actionButton/ActionButton";
import "./ItemList.css";
import SubmitButton from "../SubmitButton/SubmitButton";
import type { Item } from "../../types/Items";
import { Link } from "react-router-dom";
import { logAction } from "../../utils/logAction";
import ConfirmationModal from "../ConfirmationPopUp/ConfirmationPopUp";
import Loader from "../Loader/Loader";

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => {
    const [localItems, setLocalItems] = useState<Item[]>(items);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        setLoading(true);
        axios
            .delete(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                const deletedItem = localItems.find(item => item.id === id);
                if (deletedItem) {
                    logAction("delete", { name: deletedItem.name, price: deletedItem.price });
                }
                setLocalItems(prev => prev.filter(item => item.id !== id));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 250);
            });
    };

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId !== null) {
            handleDelete(selectedId);
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    return (
        <>
            {loading && <Loader />}
            <div className="container-lg">
                <div className="d-flex flex-wrap align-center justify-content-center itemListContainer ">
                    {localItems.map((data) => (
                        <div key={data.id} className="rounded-4 position-relative overflow-hidden itemCard">
                            <Link to={`/home/itemindex/iteminfo/${data.id}`}>
                                <img
                                    src={data.image_url}
                                    alt={data.name}
                                    className="w-100 p-3 h-100 object-fit-cover"
                                />
                                <div className="position-absolute overlay"></div>
                            </Link>

                            <div className="position-absolute top-50 start-50 translate-middle text-center z-3 item-content">
                                <h2 className="item-title fs-2 fw-medium mb-3">{data.name}</h2>
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                    <ActionButton
                                        buttonText="Edit"
                                        to={`/home/itemindex/edititem/${data.id}`}
                                        dashbordClass="editButton d-flex align-items-center justify-content-center rounded-2 fs-14 fw-medium"
                                    />

                                    <SubmitButton
                                        buttonText="Delete"
                                        type="button"
                                        onClick={() => confirmDelete(data.id)}
                                        className="deleteButton d-flex align-items-center justify-content-center rounded-2 fs-14 fw-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    title="Are you sure you want to delete the product?"
                    show={showConfirm}
                    onConfirm={handleConfirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </>
    );
};

export default ItemList;
