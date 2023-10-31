import Header from '../components/Header';
import { useEffect } from 'react';
import userStore from '../stores/userStore';
import { NoteWrapper } from '../components/NoteWrapper';
import { getNotesInFolders, getUserNotes } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Settings from '../components/Settings';
import FolderForm from '../components/FolderForm';

export default function Home(){
    const navigate = useNavigate()
    const { 
        searchString, 
        setNotesToEdit, 
        notes, 
        selectedNotes,
        setSelectedNotes,
        folders,
        setNotes,
        setNoteObj,
        setIsLoaded,
        showFolderForm,
        selectedFolder
    } = userStore()

    useEffect(() => {
        selectedFolder.id ? getNotesInFolders(selectedFolder.id, setSelectedNotes, notes) : getUserNotes(setNotes, setIsLoaded, navigate)
        setNoteObj({})
        setNotesToEdit([])
    }, [])

    useEffect(() => {
        setSelectedNotes(notes)
    },[folders])

    useEffect(() => {
        if (searchString !== "") {
            const filteredNotes = notes.filter((note) => note.title && note.title.startsWith(searchString))
            setSelectedNotes(filteredNotes)
        } else {
            setSelectedNotes(notes)
        }
    }, [notes, searchString])
    
    return (
        <div className="container">
            <Header title={"Alle Notizen"}/>
            <Settings />
            {showFolderForm && <FolderForm />}
            <NoteWrapper data={selectedNotes} />
        </div>    
    )
}