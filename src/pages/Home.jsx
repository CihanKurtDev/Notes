import Header from '../components/Header';
import { useEffect } from 'react';
import userStore from '../stores/userStore';

export default function Home(){
    const { 
        searchString, 
        setNotesToEdit, 
        notes, 
        selectedNotes,
        setSelectedNotes,
        folders,
        checkAllNotes,
    } = userStore()

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
            <Header props={{title: "Alle Notizen"}}/>
        </div>    
    )
}