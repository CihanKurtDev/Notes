import { useLocation, useNavigate } from "react-router-dom"
import { deleteFolder, deleteNote } from "../api/api"
import userStore from "../stores/userStore"
import Form from "./Form"

export default function Confirm() {
    const {selectedFolder, setFolders, setSelectedFolder, setShowConfirmForm, noteObj, setNoteObj} = userStore()
    const navigate = useNavigate()
    const location = useLocation().pathname.slice(1)
    const extra =[         
        {type: 'p', props: {
            style: {textAlign: "center", margin: 0},
            text: `${location === "Home" ? "Ordner" : "Notiz"} löschen?`
        }},
        {type: 'button', props: {
            className: "button button--confirm button--confirm-accept",
            text: 'Ja',
            type: "submit"
        }},
        {type: 'button', props: {
            className: "button button--confirm button--confirm-decline",
            text: 'Nein',
            onClick: () => setShowConfirmForm(false)
        }},
    ]

    return (
        <div className="folder-form-wrapper">
            <Form extra={extra} submitFunction={() => {location === "Home" ? deleteFolder(selectedFolder, setFolders, setSelectedFolder) : deleteNote(noteObj, setNoteObj, navigate)}}/>
        </div>
    )
}