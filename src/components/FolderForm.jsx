import { useState } from "react"
import { createFolder } from "../api/api"
import userStore from "../stores/userStore"

export default function FolderForm(){
    const [folderName, setFolderName] = useState("")
    const [showError, setShowError] = useState(false)
    const { showFolderForm, setShowFolderForm, setIsEditingNotes, setFolders, notesToEdit, setNotesToEdit, setNotes, setIsLoaded, setShowSettings } = userStore()

    function handleSubmit(e, folderName){
        e.preventDefault();
        if(!folderName) {
            e.target.children[0].style.border = "1px solid red"
            setShowError(true)
            return
        } 
        createFolder(e, folderName, setFolders, notesToEdit, setNotes, setIsLoaded, setShowSettings), setShowFolderForm(!showFolderForm), setIsEditingNotes(false), setNotesToEdit([])
    }

    return (
        <div className="folder-form-wrapper">
            <div className="form form--folder" onBlur={() => setShowFolderForm(!showFolderForm)}>
            {showError && <p className="form form__paragraph--error">Namen für Ordner benötigt</p>}
                <form onSubmit={(e) => {handleSubmit(e, folderName)}}> 
                    <input autoFocus className="input form__input" type="text" placeholder="Ordner Name" onChange={(e) => setFolderName(e.target.value)}></input>
                </form>
            </div>
        </div>
    )
}