import { faEllipsisVertical, faGear, faMagnifyingGlass, faChevronLeft, faBookOpen } from '@fortawesome/free-solid-svg-icons';

export const iconSet = (showSettings, setShowSettings, showSearch, setShowSearch,showDropdown, setShowDropdown, setIsEditingNotes, setShowSortDropdown, navigate, readOnly, setReadOnly) => new Map([
    ["Home", [
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
