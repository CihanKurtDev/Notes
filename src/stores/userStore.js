import { create } from 'zustand'

const userStore = create((set) => ({
    // Might change content of userStore
    noteObj: {},
    searchString: "",
    isLoading: false,
    isEditingNotes: false,
    notes: [],
    notesToEdit: [],
    showSettings: false,
    readOnly: false,
    checkAllNotes: false,
    showConfirmForm: false,
    folders: [],
    selectedNotes: [],
    selectedFolder: {name: "Alle Notizen"},
    showFolderForm: false,
    showSortDropdown: false,
    success: false,
    setNoteObj: (obj) => set({noteObj: obj}),
    setShowSortDropdown: (boolean) => set({showSortDropdown: boolean}),
    setShowConfirmForm: (boolean) => set({showConfirmForm: boolean}),
    setSuccess: (boolean) => set({success: boolean}),
    setReadOnly: (boolean) => set({readOnly: boolean}),
    setCheckAllNotes: (boolean) => set({checkAllNotes: boolean}),
    setSelectedFolder: (id) => set({selectedFolder: id}),
    setShowFolderForm: (boolean) => set({showFolderForm: boolean}),
    setSelectedNotes: (array) => set({selectedNotes: array}),
    setFolders: (array) => set({folders: array}),
    setNotes: (array) => set({notes: array}), 
    setIsEditingNotes: (boolean) => set({ isEditingNotes: boolean }),
    setNotesToEdit: (array) => set({notesToEdit: array}),
    setShowSettings : (boolean) => set({ showSettings: boolean }),

    // Header
    showDropdown: false,
    showSearch: false,
    isLoaded: false,
    setIsLoaded: (boolean) => set({ isLoaded: boolean }),
    setSortOption: (string) => set({ sortOption: string }),
    setSearchString: (string) => set({ searchString: string }),
    setShowDropdown:  (boolean) => set({ showDropdown: boolean }),
    setShowSearch:  (boolean) => set({ showSearch: boolean }),
    
    // MyEditor
    setIsLoading: (boolean) => set({ isLoading: boolean }),
}))

export default userStore