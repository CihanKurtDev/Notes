import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { iconSet } from '../utils/icon'; 
import userStore from '../stores/userStore';
import { DropdownMenu } from './DropdownMenu';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

export default function Header(){
    const { 
        setIsEditingNotes, 
        showSettings,
        setShowSettings,
        setShowSortDropdown,
        showDropdown,
        setShowDropdown,
        readOnly, 
        setReadOnly,
        noteObj,
        setNoteObj,
        selectedFolder,
        searchString, 
        setSearchString, 
        notesToEdit,
        isEditingNotes,
        setNotesToEdit,
        setShowFolderForm,
        isLoading, 
    } = userStore()
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const location = useLocation().pathname.slice(1)
    const iconsToShow = 
    iconSet(
        showSettings, 
        setShowSettings, 
        showSearch, 
        setShowSearch, 
        showDropdown, 
        setShowDropdown, 
        setIsEditingNotes, 
        setShowSortDropdown, 
        navigate,
        readOnly, 
        setReadOnly, 
        notesToEdit,
        isEditingNotes,
        setNotesToEdit,
        setShowFolderForm 
    ).get(location)
    
    function generateButtons(string){
        return iconsToShow.map((icon) => (
            <>
                {icon.position === string &&
                    <button onClick={icon.func} className="button--transparent" style={{visibility: icon?.isVisible || "visible"}}>
                        <FontAwesomeIcon icon={icon.icon} />
                    </button>
                }
            </>
            )
        );
    }
    return (
        <header className='header'>
          <div className="button__wrapper--left">{generateButtons("left")}</div>
            {location === "NoteEditor" 
                ? <input className='input input--search' type='text' placeholder='Title' value={noteObj.title} onChange={(e) =>  setNoteObj({...noteObj, title: e.target.value})} /> 
                :  (location === "Home" && showSearch 
                    ? <input autoFocus className='input input--search' id='search' type='text' placeholder='Search' value={searchString} onChange={(e) =>  setSearchString(e.target.value)} onBlur={() => setShowSearch(false)}/>
                    : <h1>{selectedFolder.name}</h1>
                )
            }
          <div className="button__wrapper--right">
          {location === "NoteEditor" && <FontAwesomeIcon className={`loadingIcon ${isLoading ? "show" : ""}`} icon={faRotate}/>}
          {generateButtons("right")}
          </div>
        <DropdownMenu location={location} />
        </header>
    );
}