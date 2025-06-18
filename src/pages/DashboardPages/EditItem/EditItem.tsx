import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import ItemForm from "../../../components/ItemForm/ItemForm";
import type { Item } from "../../../types/Items";
import { logAction } from "../../../utils/logAction";
import type { ItemError } from "../../../types/ItemError";
import Loader from "../../../components/Loader/Loader";

const EditItem = () => {
    const [errors, setErrors] = useState<ItemError>();
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();
    const name = useRef<HTMLInputElement>(null!);
    const price = useRef<HTMLInputElement>(null!);
    const image = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate()
    const [oldData, setOldData] = useState<Item>();

    const editItemData = [
        {
            label: "Name",
            placeholder: "Enter the product name",
            type: "text",
            controlId: "productName",
            ref: name,
            defaultValue: oldData?.name,
            errorKey: "name"

        },
        {
            label: "Price",
            placeholder: "Enter the product price",
            type: "number",
            controlId: "productPrice",
            ref: price,
            defaultValue: oldData?.price,
            errorKey: "price"
        },
    ];

    useEffect(() => {
        axios.get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log("Fetched item:", res.data);
                setOldData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
            });
    }, []);

    const sendData = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post(
                `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
                {
                    name: name?.current?.value,
                    price: price?.current?.value,
                    image: image?.current?.files?.[0],
                    _method: "PUT",
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
                logAction("edit", { name: name.current?.value || "", price: price.current?.value || 0 });
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
                    title="EDIT ITEM"
                    addItemData={editItemData}
                    onSubmit={sendData}
                    image={image}
                    initialImage={oldData?.image_url}
                    error={errors}

                />
            </div>
        </>

    );
}

export default EditItem