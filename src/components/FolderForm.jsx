import { useState } from "react"
import insertNotes, { createFolder } from "../api/api"
import insertNotes, { createFolder } from "../api/api"
import userStore from "../stores/userStore"
import Form from "./Form"
import Form from "./Form"

export default function FolderForm(){
    const [folderName, setFolderName] = useState("")
    const [showError, setShowError] = useState(false)
    const { showFolderForm, folders, setShowFolderForm, setIsEditingNotes, setFolders, notesToEdit, setNotesToEdit, setNotes, setIsLoaded, setShowSettings, isEditingNotes } = userStore()
    function handleSubmit(e, folderName){
        e.preventDefault();
        if(!folderName) {
            e.target.children[0].style.border = "1px solid red"
            setShowError(true)
            return
        } 
        createFolder(e, folderName, setFolders, notesToEdit, setNotes, setIsLoaded, setShowSettings), setShowFolderForm(!showFolderForm), setIsEditingNotes(false), setNotesToEdit([])
    }

    const fields = [
        { label: 'Ordner erstellen:', type: 'text', id: 'folder', onChange: (e) => setFolderName(e.target.value) },
    ];

    const extra = folders.length > 0 && isEditingNotes ? [         
        {type: 'p', props: {
            className: "info",
            text: 'Zu Ordner hinzufügen:'
        }},
        ...folders.map((folder) => {
            return {
                type: 'button', props: {
                    className: "button button--folder",
                    text: folder.name,
                    onClick: () => insertNotes(folder.id, notesToEdit, setIsEditingNotes, setNotesToEdit)
                }
            }
        })
    ] : []

    return (
        <div className="folder-form-wrapper" >
            <Form fields={fields} extra={extra} onBlur={() => setShowFolderForm(false)} className="form form--folder" submitFunction={(e) => {handleSubmit(e, folderName)}}/>
        </div>
    )
}