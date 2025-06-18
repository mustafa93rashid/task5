import { Link } from "react-router-dom"
import "./BackWordHome.css";

const BackWordHome = () => {
    return (
        <div className="backwordHome">
            <Link to="/home/itemindex" >
                <img src="task5/images/Home/Backword.svg" alt="backword" className="border border-1 border-black rounded-circle p-3" />
            </Link>
        </div>
    )
}

export default BackWordHome