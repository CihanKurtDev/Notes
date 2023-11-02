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

export async function handleRegistration(e, navigate, setSuccess) {
    e.preventDefault(); 
    try {
        await fetch('http://localhost:3000/Registration', {
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
    } catch(error) {
        const inputs = document.getElementsByTagName('input')
        for(let i = 0; i< inputs.length; i++) {
            inputs[i].style.border = "1px solid red"
        }
        console.log(error)
    } finally {
        setSuccess(true)
        new Promise((res) => {
            setTimeout(() => {                
                res()
                navigate("/")
            }, 1000)
        }).then(() => setSuccess(false))
    }
}

export async function getNote(id, setNoteObj, navigate){
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
        navigate("/NoteEditor")
    }
}


export async function logOut(navigate){
    try {
        await fetch(`http://localhost:3000/Logout`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch(error) {
        console.log(error)
    } finally {
        navigate("/")
    }
}

export async function deleteNote(noteObj, navigate, setNoteObj) {
    try {
        const res = await fetch(`http://localhost:3000/Notes/${noteObj.id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: noteObj.id
            }),
        })

        if(!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        if(data) {
            console.log(data)
        }
    } catch ( error ) {
        console.log(error)
    } finally {
        setNoteObj({})
        navigate("/Home")
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

export async function getFolders(setFolders){
    try {
        const res = await fetch(`http://localhost:3000/Folders/`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
    
        const data = await res.json()
        setFolders(data.rows)

    } catch(error) {
        console.error(error)
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
        setSelectedNotes(filteredNotes)
    }
}

export async function saveNoteState(value, dayjs, noteObj, setNoteObj, setIsLoading, selectedFolder) {
    setIsLoading(true)
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
        new Promise((res) => {
            setTimeout(() => {      
                res()          
            }, 500)
        }).then(() => setIsLoading(false))
        
    }
}

export async function createFolder(e, folderName, setFolders, notesToEdit, setNotes, setIsLoaded, setShowSettings){
    e.preventDefault();
    try {
        const res = await fetch(`http://localhost:3000/Folders/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({folderName: folderName, notes: notesToEdit})
        })

        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }
    }catch(error) {
        console.log(error)
    }finally {
        getFolders(setFolders),
        getUserNotes(setNotes, setIsLoaded), 
        setShowSettings(true)
    }
}


export async function deleteFolder(folder, setFolders, setSelectedFolder){
    try {
        const res = await fetch(`http://localhost:3000/deleteFolders/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({folder})
        })
        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }
    } catch(error) {
        console.log(error)
    }finally {
        getFolders(setFolders),
        setSelectedFolder({name: "Alle Notizen"})
    }
}

export default async function insertNotes(folderId, notesToEdit, setIsEditingNotes, setNotesToEdit, setShowFolderForm){
    try {
        const res = await fetch("http://localhost:3000/NotesInFolder", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              folderId: folderId,
              notes: notesToEdit,
            }),
          })
        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log(data)
    } catch(error) {
        console.log(error)
    } finally {
        setIsEditingNotes(false)
        setShowFolderForm(false)
        setNotesToEdit([])
    }
}