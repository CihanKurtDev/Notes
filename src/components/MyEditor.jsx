import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import userStore from '../stores/userStore';
import dayjs from 'dayjs';
import { saveNoteState } from '../api/api';

export default function  MyEditor() {
  const { noteObj, setNoteObj, selectedFolder, setIsLoading, readOnly } = userStore()
  const [value, setValue] = useState(noteObj.content  || "")
  const memoizedSaveNoteState = useCallback(saveNoteState, [value])

  function handleNoteChange(content) {
    setValue(content);
    setNoteObj({...noteObj, content})
  }

  useEffect(() => {
    document.getElementsByClassName("ql-toolbar")[0].style.display = readOnly ? "none" : "block"
  },[readOnly])

  useEffect(() => {
      let timer = 
      setTimeout(() => {
        memoizedSaveNoteState(value, dayjs, noteObj, setNoteObj, setIsLoading, selectedFolder);
      }, 2000);
      return () => clearTimeout(timer);
  }, [value, noteObj]);


  return <ReactQuill theme="snow" value={noteObj.content || ""} onChange={handleNoteChange} readOnly={readOnly}/>;
}