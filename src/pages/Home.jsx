import Header from '../components/Header';
import { useEffect } from 'react';
import userStore from '../stores/userStore';
import { NoteWrapper } from '../components/NoteWrapper';
import { getUserNotes } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate()
    const { 
        searchString, 
        setNotesToEdit, 
        notes, 
        selectedNotes,
        setSelectedNotes,
        folders,
        checkAllNotes,
        setNotes,
        setNoteObj,
        setIsLoaded,
        setReadOnly
    } = userStore()

    useEffect(() => {
        getUserNotes(setNotes, setIsLoaded, navigate)
        setNoteObj({})
        setNotesToEdit([])
        setReadOnly(false)
    }, [])

    useEffect(() => {
        setSelectedNotes(notes)
    },[folders])

    useEffect(() => {
        setNotesToEdit(selectedNotes)
    },[checkAllNotes])

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
            <NoteWrapper data={selectedNotes} />
        </div>    
    )
}