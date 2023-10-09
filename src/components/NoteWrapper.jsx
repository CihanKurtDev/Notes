import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import userStore from '../stores/userStore';
import { useNavigate } from 'react-router-dom'
import { getNote } from '../api/api';
import { handleCheck } from '../utils/utils';

export function NoteWrapper({data}) {
    const { 
        setNoteObj,
        noteObj, 
        isEditingNotes, 
        notesToEdit, 
        setNotesToEdit, 
        setShowDropdown,
        checkAllNotes,
    } = userStore()
    const navigate = useNavigate()

    if(!data) {
        return (
            <>
                <div>No Notes</div>
                <button className="button button--new-note" onClick={() => {setShowDropdown(false),  navigate( "/NoteEditor")}}><FontAwesomeIcon icon={faPenToSquare} style={{width: 20, height: 20}}/></button>
            </>
        )
    }

    const [notesize, setNotesize] = useState(window.innerWidth > 786 ? 10 : 30)
    const [divSize, setDivSize] = useState(((notesize / 100) * window.innerWidth));
    const [divsPerRow, setDivsPerRow] = useState(Math.floor(window.innerWidth/ divSize));
    const [amountOfRows, setAmountOfRows] = useState(Math.ceil(data.length / divsPerRow));

    function handleResize() {
        const gap = 20
        const updatedNotesize = window.innerWidth > 786 ? 10 : 30
        const updatedDivSize = Math.ceil((updatedNotesize / 100) * window.innerWidth)
        const updatedDivsPerRow = Math.floor(window.innerWidth / (updatedDivSize + gap))
        const updatedAmountOfRows = Math.ceil(data.length / updatedDivsPerRow)
        const adjustedDivSize = updatedDivSize + (window.innerWidth - (updatedDivSize * updatedDivsPerRow)) / updatedDivsPerRow - gap
      
        setNotesize((prevSize) => (prevSize !== updatedNotesize ? updatedNotesize : prevSize))
        setDivSize((prevSize) => (prevSize !== adjustedDivSize ? adjustedDivSize : prevSize))
        setDivsPerRow((prevDivs) => (prevDivs !== updatedDivsPerRow ? updatedDivsPerRow : prevDivs))
        setAmountOfRows((prevRows) => (prevRows !== updatedAmountOfRows ? updatedAmountOfRows : prevRows))
    }

    useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
    }, [data.length, divsPerRow])

    const rowDivs = [];
    for (let i = 0; i < amountOfRows; i++) {
    const x = [];
    for (let j = 0; j < divsPerRow; j++) {
        const dataIndex = i * divsPerRow + j;
        if (dataIndex < data.length) {
        x.push(
            <div 
            className='preview-wrapper'
            key={`row${i} item${j}`}
            >
                {isEditingNotes && <input type='checkbox' dataset-id={data[dataIndex].id} checked={notesToEdit.includes(data[dataIndex].id.toString()) || false} onChange={(e) =>handleCheck(e, notesToEdit, setNotesToEdit)}/>}
                <div onClick={() =>getNote(data[dataIndex].id, setNoteObj, noteObj, navigate)}>
                    <div 
                    key={data[dataIndex].id} 
                    className='note-preview' 
                    style={{width: divSize, height: divSize * 0.9, display: "flex", justifyContent: "center"}}
                    >
                        <p>{data[dataIndex]?.content?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                    <div className='note-info' style={{maxWidth: divSize}}>
                        <p>{data[dataIndex]?.title ||"Kein Titel"}</p>
                        <sub>{data[dataIndex].date}</sub>
                    </div>
                </div>
            </div>
        );
        }
    }
    rowDivs.push(<div style={{ display: 'flex', maxWidth: "100vw" }} key={`row${i}`}>{x}</div>);
    }

    return (
    <div className="NoteWrapper" style={{display: 'flex', justifyContent: 'center'}}>
        <div>
        {rowDivs}
        </div>
        <button className="button button--new-note" onClick={() => {setShowDropdown(false),  navigate( "/NoteEditor")}}><FontAwesomeIcon icon={faPenToSquare} style={{width: 20, height: 20}}/></button>
    </div>
    )
    
}



            