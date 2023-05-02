import React,{useContext,useState} from 'react'
import notesContext from '../context/notes/notesContext'

const Addnote = (props) => {
    const context=useContext(notesContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:[e.target.value]});
    }

    const handleClick=(e)=>{
        //prevent reload of page
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note added","success");
    }
  

    return (
        <div>
            <h2>Add Note</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button disabled={note.title.toString().length<5 || note.description.toString().length<5 } type="submit" className="btn btn-info" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
