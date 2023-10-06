export async function handleSubmit(e, navigate) {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:3000/', {
            method: "POST",
            credentials: 'include',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("name").value, 
                password: document.getElementById("password").value
            })
        })
        const data = await res.json()
        if(data.user) {
            navigate("/Home")
        }
    } catch(error) {
        const inputs = document.getElementsByTagName('input')
        for(let i = 0; i< inputs.length; i++) {
            inputs[i].style.border = "1px solid red"
        }
        console.log(error)
    }
}

export async function handleRegistration(e, navigate) {
    e.preventDefault(); 
    try {
        const res = await fetch('http://localhost:3000/Registration', {
            method: "POST",
            credentials: 'include',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: document.getElementById("email").value, 
                name: document.getElementById("name").value, 
                password: document.getElementById("password").value, 
            })
        })
        const data = await res.json()
        if (!noteObj.id) {
            setNoteObj({...noteObj, id: data.id})
        }
    } catch(error) {
        const inputs = document.getElementsByTagName('input')
        for(let i = 0; i< inputs.length; i++) {
            inputs[i].style.border = "1px solid red"
        }
        console.log(error)
    } finally {
        () => navigate("/")
    }
}

export async function getNote(id, setNoteObj, noteObj, navigate){
    try {
        const res = await fetch(`http://localhost:3000/Notes/${id}`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log(data)
        setNoteObj({...data.row})
    } catch(error) {
        console.log(error)
    } finally {
        console.log()
        navigate("/NoteEditor")
    }
}

export async function getUserNotes(setNotes, setIsLoaded, navigate){
    try {
        const res = await fetch(`http://localhost:3000/Notes/`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }
        
        const user = await res.json()
        if(user.isAuthorized) {
            setNotes(user.rows)
            setIsLoaded(true)
        } else {
            navigate("/")
        }
    }catch(error){
        (err) => console.log(err)
    }
}

export async function getNotesInFolders(folderId, setSelectedNotes, notes){
    const filteredNotes = []
    try {
        const res = await fetch(`http://localhost:3000/NotesInFolder/${folderId}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const noteIds = new Set(data.rows.map(row => row.noteId))
        for (const note of notes) {
            if (noteIds.has(note.id)) {
              filteredNotes.push(note)
            } 
        }
        
    }catch (error) {
        console.log(error)
    } finally {
        () => setSelectedNotes(filteredNotes)
    }
}

export async function saveNoteState(value, dayjs, noteObj, setNoteObj, setIsLoading, selectedFolder) {
    setIsLoading(true)
    console.log(noteObj)
    try {
        const res = await fetch("http://localhost:3000/Notes", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                folderId: selectedFolder.id,
                content: value,
                date: dayjs().format("DD.MM.YYYY"),
                time: dayjs().format("HH:mm:ss"),
                id: noteObj.id || null,
                title: noteObj.title || "Kein Titel",
            }),
        });

        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json();
        
        if (!noteObj.id) {
            setNoteObj({...noteObj, id: data.id})
        }
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false)
    }
}