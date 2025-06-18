import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../components/ItemForm/ItemForm";
import { logAction } from "../../../utils/logAction";
import type { ItemError } from "../../../types/ItemError";
import Loader from "../../../components/Loader/Loader";

const AddItem = () => {
    const [errors, setErrors] = useState<ItemError>();
    const [loading, setLoading] = useState<boolean>(false);

    const name = useRef<HTMLInputElement>(null!);
    const price = useRef<HTMLInputElement>(null!);
    const image = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate()

    const addItemData = [
        {
            label: "Name",
            placeholder: "Enter the product name",
            type: "text",
            controlId: "productName",
            ref: name,
            errorKey: "name"
        },
        {
            label: "Price",
            placeholder: "Enter the product price",
            type: "number",
            controlId: "productPrice",
            ref: price,
            errorKey: "price"
        },
    ];

    const sendData = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        axios
            .post(
                "https://web-production-3ca4c.up.railway.app/api/items",
                {
                    name: name?.current?.value,
                    price: price?.current?.value,
                    image: image?.current?.files?.[0],
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(() => {
                logAction("add", { name: name.current?.value || "", price: price.current?.value || 0 });
                navigate("/home/itemindex");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 250);
            });
    };

    return (
        <>
            {loading && <Loader />}
            <div className="container-lg">
                <ItemForm
                    title="ADD NEW ITEM"
                    addItemData={addItemData}
                    onSubmit={sendData}
                    image={image}
                    error={errors}
                />
            </div>
        </>
    );
};

export default AddItem;
