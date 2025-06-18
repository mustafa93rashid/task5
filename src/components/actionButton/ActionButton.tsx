import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type ActionButtonProps = {
    buttonText: string;
    to: string;
    dashbordClass?: string; 
}

const ActionButton = ({ buttonText, to, dashbordClass  }: ActionButtonProps) => {
    return (
        <>
            <Link to={to} className="text-decoration-none">
                <Button className={`fs-14 fw-medium rounded-1 bg-orange border-0 btnHover ${dashbordClass}`}> 
                    {buttonText}
                </Button>
            </Link>
        </>
    );
}

export default ActionButton