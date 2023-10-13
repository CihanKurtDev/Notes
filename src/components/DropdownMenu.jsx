import { deleteNote, deleteFolder, logOut } from '../api/api';
import { useNavigate } from 'react-router-dom'
import userStore from '../stores/userStore';
import {sortSelectedNotes} from '../utils/utils'

export function DropdownMenu({location}){
    const navigate = useNavigate()
    const {
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
            <ul className="dropdown dropdown--edit">
                {location === "Home" && (
                    <>
                        <li><button className='button button--dropdown' onClick={() =>  {setShowSortDropdown(!showSortDropdown), setIsEditingNotes(false)}}>Sort Notes</button></li>
                        <li><button className='button button--dropdown' onClick={() =>  {setIsEditingNotes(true), setShowDropdown(!showDropdown)}}>Edit</button></li>
                        {selectedFolder.name === "Alle Notizen"? 
                            <li><button className='button button--dropdown' onClick={() =>  {setShowFolderForm(!showFolderForm), setShowDropdown(!showDropdown)}}>Create Folder</button></li>
                        : 
                            <li><button className='button button--dropdown' onClick={() =>  {deleteFolder(selectedFolder, setFolders, setSelectedFolder), setShowDropdown(!showDropdown)}}>Delete Folder</button></li>
                        }
                         <li><button className='button button--dropdown' onClick={() =>  logOut(navigate)}>Log Out</button></li>
                    </>
                )}
                {location === "NoteEditor" && <li><button className='button button--dropdown' onClick={() =>  {deleteNote(noteObj, navigate), setShowDropdown(!showDropdown)}}>Delete Note</button></li>}
                {showSortDropdown &&
                    <ul className="dropdown dropdown--sort">
                        <li><button className={`button button--dropdown ${sortOption === "title" && "active"}`} onClick={(e) =>  handleSort(e.target.innerText.toLowerCase())}>Title</button></li>
                        <li><button className={`button button--dropdown ${sortOption === "date" && "active"}`}  onClick={(e) =>  handleSort(e.target.innerText.toLowerCase())}>Date</button></li>
                    </ul>
                }
            </ul>
        }
    </>
    )    
}