import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { iconSet } from '../utils/icon'; 
import userStore from '../stores/userStore';

export default function Header(){
    const { 
        setIsEditingNotes, 
        showSettings,
        setShowSettings,
        setShowSortDropdown,
        showDropdown,
        setShowDropdown,
        readOnly, 
        setReadOnly,
    } = userStore()
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const location = useLocation().pathname.slice(1)
    const iconsToShow = 
    iconSet(
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
        setReadOnly
    ).get(location)
    
    function generateButtons(string){
        return iconsToShow.map((icon) => (
            <>
                {icon.position === string && 
                    <button onClick={icon.func} className="button--transparent" x={icon}>
                        <FontAwesomeIcon icon={icon.icon} />
                    </button>
                }
            </>
            )
        );
    }

    return (
        <header className='header'>
          <div className="button__wrapper--left">{generateButtons("left")}</div>
          {showSearch ? <input autoFocus className={`input input--search input--header ${showSearch && "open"}`} type='text' placeholder='Title' onBlur={() => setShowSearch(false)}/> : <p onClick={() => setShowSearch(true)}>Titel</p>}
          <div className="button__wrapper--right">{generateButtons("right")}</div>
        </header>
      );

}