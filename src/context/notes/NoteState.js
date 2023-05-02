import { useState } from "react";
import notesContext from "./notesContext";


const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial)

      //Get all Notes
      const getNotes=async()=>{
        //serverside
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method: "GET",
          headers:{
            'Content-Type':"application/json",
            "auth-token":localStorage.getItem("token")
          }
        });
        const json=await response.json();
        //clientside

        console.log(json);
        setNotes(json);
      }

      //Add Note
      const addNote=async(title,description,tag)=>{
        const t=title.toString()
        //serverside
        const response=await fetch(`${host}/api/notes/addnote`,{
          method: "POST",
          headers:{
            'Content-Type':"application/json",
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({title:title.toString(),description:description.toString(),tag:tag.toString()})
        });

        //clientside
        console.log(t,tag);
        const note=await response.json();
        setNotes(notes.concat(note))
      }

      //Edit Note
      const editNote=async (id,title,description,tag)=>{
        //serverside
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: "PUT",
          headers:{
            'Content-Type':"application/json",
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({title:title.toString(),description:description.toString(),tag:tag.toString()})
        });
        const json=response.json();
        console.log(json);

        let newNotes=JSON.parse(JSON.stringify(notes))
        //clientside
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if (element._id===id) {
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
      }

      //Delete Note
      const deleteNote=async (id)=>{
        //serverside
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: "DELETE",
          headers:{
            'Content-Type':"application/json",
            "auth-token":localStorage.getItem("token")
          }
        });
        const json=response.json();
        console.log(json);
        //clientside
        console.log("Deleting a note with id:"+id);
        const newNote=notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
      }


    return (
        <notesContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NoteState;