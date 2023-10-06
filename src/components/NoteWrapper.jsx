import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import userStore from '../stores/userStore';
import { useNavigate } from 'react-router-dom'
import { getNote } from '../api/api';

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

    const [divSize, setDivSize] = useState((10 / 100) * window.innerWidth);
    const [divsPerRow, setDivsPerRow] = useState(Math.floor(window.innerWidth/ divSize));
    const [amountOfRows, setAmountOfRows] = useState(Math.ceil(data.length / divsPerRow));

    useEffect(() => {
    function handleResize() {
        const updatedDivSize = Math.ceil((10 / 100) * window.innerWidth < 150 ? 150: (10 / 100) * window.innerWidth)
        setDivSize(updatedDivSize)
        setDivsPerRow(Math.floor(window.innerWidth/ divSize))
        setAmountOfRows(Math.ceil(data.length / divsPerRow))
    }

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
            onClick={() =>getNote(data[dataIndex].id, setNoteObj, noteObj, navigate)}
            >
                <input type='checkbox' checked={notesToEdit.includes(data[dataIndex].toString()) || checkAllNotes} style={{visibility: isEditingNotes? "visible" : "hidden"}} onChange={(e) =>handleCheck(e, notesToEdit, setNotesToEdit)}/>
                <div 
                key={data[dataIndex].id} 
                className='note-preview' 
                style={{width: divSize, height: divSize * 0.9, display: "flex", justifyContent: "center"}}
                >
                    <p>{data[dataIndex]?.content?.replace(/<[^>]*>/g, '')}</p>
                </div>
                <div  className='note-info'>
                    <p>{data[dataIndex]?.title ||"Kein Titel"}</p>
                    <sub>{data[dataIndex].date}</sub>
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



            