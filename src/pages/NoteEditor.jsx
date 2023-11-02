import Header from "../components/Header";
import MyEditor from "../components/MyEditor";
import Confirm from "../components/Confirm";
import userStore from "../stores/userStore";

export default function NoteEditor(){
    const {showConfirmForm} = userStore()

    return (
        <div className="site-wrapper">
            <Header />
            {showConfirmForm && <Confirm />}
            <MyEditor />
        </div>
    )
}