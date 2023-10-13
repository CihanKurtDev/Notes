import userStore from "../stores/userStore"
import { faArrowLeft, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";
import { getFolders, getNotesInFolders } from "../api/api";
import { useState } from "react";

export default function Settings(){
    const {showSettings, setShowSettings, folders, setFolders, notes, setSelectedNotes, setSelectedFolder} = userStore()
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)

    useEffect(() => {
        getFolders(setFolders)
    },[])

    function handleFolderClick(folder) {
        getNotesInFolders(folder.id, setSelectedNotes, notes),
        setSelectedFolder({name: folder.name, id: folder.id}), 
        setShowSettings(!showSettings)
    }

    function handleNoteClick() {
        setSelectedNotes(notes)
        setShowSettings(!showSettings)
        setSelectedFolder({ name: 'Alle Notizen' })
    }

    return(
        <div id="settings" className={`settings-wrapper ${showSettings ? "open" : ""}`} tabIndex={0}>
            <div className="settings-button-wrapper">
                <button className="button button--transparent" onClick={() => setShowSettings(!showSettings)}><FontAwesomeIcon icon={faArrowLeft} style={{width: 20, height: 20}} /></button>
            </div>
            <ul className="list">
                <li>
                    <button className={`button button--transparent button--list ${showSettings ? "open" : ""}`} onClick={() =>  handleNoteClick()}>
                        Alle Notizen
                    </button>
                </li>
                <li>
                    <button className={`button button--transparent button--list button--list-folder ${showSettings ? "open" : ""}`} onClick={() =>  setShowSettingsDropdown(!showSettingsDropdown)}>
                    <FontAwesomeIcon icon={showSettingsDropdown ? faArrowDown: faArrowRight} style={{ width: 10, height: 15, paddingRight: 15}} />
                        Ordner
                    </button>
                </li>
            </ul>
            <ul className={`dropdown dropdown--settings ${showSettingsDropdown ? "open" : ""}`}>
                {folders?.map((folder, id) => (
                    <li key={id}>
                        <button className={`button button--transparent button--list ${showSettings ? "open" : ""}`} onClick={() => handleFolderClick(folder)}>
                            {folder.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}