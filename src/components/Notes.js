import React,{useContext, useEffect, useRef, useState} from 'react'
import notesContext from '../context/notes/notesContext'
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const nav=useNavigate();
    const [note,setNote]=useState({id:"",utitle:"",udescription:"",utag:""});
    const context=useContext(notesContext);
    const {notes,getNotes,editNote}=context;
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getNotes();
        }
        else{
            nav("/login");
        }
        // eslint-disable-next-line
    },[])
    const ref=useRef(null);
    const refClose=useRef(null);

    const updateNote=(currentNote)=>{
        //to open modal for edit
        ref.current.click();
        //to populate the input with existing data to be edited.
        setNote({id:currentNote._id,utitle:currentNote.title,udescription:currentNote.description,utag:currentNote.tag});
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:[e.target.value]});

    }

    const handleClick=(e)=>{
        
        console.log("Update note");
        editNote(note.id,note.utitle,note.udescription,note.utag);
        refClose.current.click();
        props.showAlert("Note updated","success");
    }

    return (
        <>
            
            <Addnote showAlert={props.showAlert}/>

            
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="utitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="utitle" name="utitle" aria-describedby="emailHelp" value={note.utitle} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="udescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="udescription" name="udescription" value={note.udescription} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="utag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="utag" name="utag" value={note.utag} onChange={onChange}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.utitle.toString().length<5 || note.udescription.toString().length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                </div>
                </div>
            </div>
            </div>
            
            <div className='row my-3'>
                <h2>Your Notes:</h2>
                <div className='container'>
                    {notes.length===0 && 'No Notes'}
                </div>
                {notes.map((note)=>{
                    return <Notesitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
                })}
                
            </div>
        </>
        
    )
}

export default Notes
