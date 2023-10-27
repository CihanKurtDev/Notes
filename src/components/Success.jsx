import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import userStore from "../stores/userStore";

export default function Success(){
    const {success}= userStore()
    return (
        <div className="successWrapper" style={{display: success ? "flex" : "none"}}>
            <div className="successNote">
                <h1>Registration Success!</h1>
                <div className="successIcon">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
        </div>
    )
}