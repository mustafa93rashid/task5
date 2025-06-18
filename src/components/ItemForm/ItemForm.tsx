import {  Col, Form, Row } from "react-bootstrap";
import "./ItemForm.css";
import BackWordHome from "../BackWordHome/BackWordHome";
import type { ItemError } from "../../types/ItemError";
import SubmitButton from "../SubmitButton/SubmitButton";
import PhotoUploadWidget from "../PhotoUploadWidget/PhotoUploadWidget";

type AddEditType = {
    label: string;
    placeholder: string;
    type: string;
    controlId: string;
    ref: React.RefObject<HTMLInputElement>;
    defaultValue?: string;
    errorKey: string;
};

type AddEditProps = {
    addItemData: AddEditType[];
    onSubmit: (e: React.FormEvent) => void;
    image: React.RefObject<HTMLInputElement>;
    title: string;
    initialImage?: string;
    error?: ItemError;
};

const ItemForm = ({ addItemData, onSubmit, image, title, initialImage, error }: AddEditProps) => {
    return (
        <div className="formWrapper">
            <BackWordHome />
            <h2 className="formTitle fw-semibold text-black">{title}</h2>
            <Form onSubmit={onSubmit} >
                <div className="d-flex gap-5  align-items-start flex-wrap flex-lg-nowrap flex-sm-column flex-md-row">
                    <div className="w-100 d-flex flex-column formFields flex-fill">
                        {addItemData.map((data, index) => (
                            <Form.Group controlId={data.controlId} key={index}>
                                <Form.Label className="pb-2  fw-medium fieldLabel text-gray">{data.label}</Form.Label>
                                <Form.Control
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    defaultValue={data.defaultValue}
                                    ref={data.ref}
                                    className="textInput  rounded-1"
                                />
                                {error?.[data.errorKey as keyof ItemError] && (
                                    <p className="fs-12 text-orange mt-2 mx-1">{error?.[data.errorKey as keyof ItemError]?.[0]}</p>
                                )}
                            </Form.Group>

                        ))}
                    </div>

                    <div className="flex-fill w-100 ">
                        <p className="pb-3  text-gray fw-medium fieldLabel ">Image</p>
                        <PhotoUploadWidget
                            ref={image}
                            addNewItem="imageBox w-100  rounded-1 "
                            addEditPageIconClass="uploadIcon"
                            initialImage={initialImage}
                        />
                        {error?.image && <p className="fs-12 text-orange mt-2 mx-1">{error.image[0]}</p>}
                    </div>
                </div>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <SubmitButton
                            buttonText="Save"
                            authClass="border-0 rounded-1 fw-medium bg-orange submitBtn align-items-center d-flex justify-content-center"
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ItemForm;
