export function sortSelectedNotes(selectedNotes, setSelectedNotes, sortOption) {
    if(!sortOption) {
        setSelectedNotes([...selectedNotes || ""])
        return
    }
    setSelectedNotes(
        [...selectedNotes].sort((a, b) => {
            if (sortOption === "date") {
                if (a[sortOption] > b[sortOption]) return 1
                if (a[sortOption] < b[sortOption]) return -1
                return 0
            } else {
                return a[sortOption || ""].localeCompare(b[sortOption || ""])
            }
        })
    );
}

export function handleCheck(e, notesToEdit, setNotesToEdit){
    if(!notesToEdit.includes(e.currentTarget.getAttribute("dataset-id"))){
        setNotesToEdit([...notesToEdit, e.currentTarget.getAttribute("dataset-id")])
    } else {
        const fiteredNotesToEdit = notesToEdit.filter((ele) => ele !== e.currentTarget.getAttribute("dataset-id"))
        setNotesToEdit(fiteredNotesToEdit)
    }
}