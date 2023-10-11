import { faEllipsisVertical, faGear, faMagnifyingGlass, faChevronLeft, faBookOpen, faFolder, faBan } from '@fortawesome/free-solid-svg-icons';

export const iconSet = (
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
        notestoEdit,
        isEditingNotes,
        setNotesToEdit,
        setShowFolderForm, 
        showFolderForm 
        ) => new Map([
    ["Home", [
            {icon: faFolder, position: "right", func: () => setShowFolderForm(!showFolderForm), isVisible: notestoEdit.length > 0 ? "visible" : "hidden"},
            {icon: faBan, position: "right", func: () => {setIsEditingNotes(!isEditingNotes), setNotesToEdit([])}, isVisible: notestoEdit.length > 0 ? "visible" : "hidden"},
            {icon: faGear, position: "left", func: () =>  setShowSettings(!showSettings)},
            {icon: faMagnifyingGlass, position: "right",func: () => setShowSearch(!showSearch)},
            {icon: faEllipsisVertical, position: "right", func: () => {setShowDropdown(!showDropdown), setIsEditingNotes(false),setShowSortDropdown(false)}},
    ]],
    ["NoteEditor", [
            {icon: faChevronLeft, position: "left", func: () => navigate("/Home")},
            {icon: faBookOpen, position: "right", func: () => setReadOnly(!readOnly)},
            {icon: faEllipsisVertical,  position: "right", func: () => setShowDropdown(!showDropdown)},
    ]],
])
