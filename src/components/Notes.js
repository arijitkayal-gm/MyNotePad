import React,{useContext, useEffect} from 'react'
import notesContext from '../context/notes/notesContext'
import Notesitem from './Notesitem';
import Addnote from './Addnote';

const Notes = () => {
    const context=useContext(notesContext);
    const {notes,getNotes}=context;
    useEffect(()=>{
        getNotes();
    },[])
    return (
        <>
            <div>
                <Addnote />
            </div>
            <div className='row my-3'>
                <h2>Your Notes:</h2>
                {notes.map((note)=>{
                    return <Notesitem key={note._id} note={note}/>
                })}
                
            </div>
        </>
        
    )
}

export default Notes
