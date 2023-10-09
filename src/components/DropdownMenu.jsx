import { deleteNote, deleteFolder } from '../api/api';
import { useNavigate } from 'react-router-dom'
import userStore from '../stores/userStore';
import {sortSelectedNotes} from '../utils/utils'

export function DropdownMenu({location}){
    const navigate = useNavigate()
    const {
        isEditingNotes, 
        setIsEditingNotes, 
        noteObj, 
        sortOption, 
        setSortOption, 
        selectedFolder, 
        setFolders, 
        setSelectedFolder, 
        showSortDropdown, 
        setShowSortDropdown, 
        setShowDropdown, 
        showDropdown, 
        showFolderForm, 
        setShowFolderForm,
        selectedNotes, 
        setSelectedNotes,
    } = userStore()
    
    
    function handleSort(option){
        setSortOption(option)
        sortSelectedNotes(selectedNotes, setSelectedNotes, option)
        setShowDropdown(false)
        setShowSortDropdown(false)
    }
    
    return(
        <>
            {showDropdown &&  
                <div className="dropdown">
                    {location === "Home" && (
                        <>
                            <button className='button button--dropdown' onClick={() =>  {setShowSortDropdown(!showSortDropdown), setIsEditingNotes(false)}}>Sort Notes</button>
                            <button className='button button--dropdown' onClick={() =>  {setIsEditingNotes(!isEditingNotes), setShowDropdown(!showDropdown)}}>Edit</button>
                            {selectedFolder.name === "Alle Notizen"? 
                                <button className='button button--dropdown' onClick={() =>  {setShowFolderForm(!showFolderForm), setShowDropdown(!showDropdown)}}>Create Folder</button>
                            : 
                                <button className='button button--dropdown' onClick={() =>  {deleteFolder(selectedFolder, setFolders, setSelectedFolder), setShowDropdown(!showDropdown)}}>Delete Folder</button>
                            }
                        </>
                    )}
                    {location === "NoteEditor" && <button className='button button--dropdown' onClick={() =>  {deleteNote(noteObj, navigate), setShowDropdown(!showDropdown)}}>Delete Note</button>}
                    {showSortDropdown &&
                        <div className="dropdown dropdown--sort">
                            <button className={`button button--dropdown ${sortOption === "title" && "active"}`} onClick={(e) =>  handleSort(e.target.innerText.toLowerCase())}>Title</button>
                            <button className={`button button--dropdown ${sortOption === "date" && "active"}`}  onClick={(e) =>  handleSort(e.target.innerText.toLowerCase())}>Date</button>
                        </div>
                    }
                </div>
            }
        </>
    )    
}