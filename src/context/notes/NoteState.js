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
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTNlYmEyOWNmNjhkYzgyYzMyZTRhIn0sImlhdCI6MTY4MTcxMTM3Nn0.nOoUcd_rzPnfx3veXD5DRMyNcIAA92bqgHIw1xDo6Qg"
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
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTNlYmEyOWNmNjhkYzgyYzMyZTRhIn0sImlhdCI6MTY4MTcxMTM3Nn0.nOoUcd_rzPnfx3veXD5DRMyNcIAA92bqgHIw1xDo6Qg"
          },
          body: JSON.stringify({title:title.toString(),description:description.toString(),tag:tag.toString()})
        });

        //clientside
        console.log(t,tag);
        const note={
          "_id": "643cf72a1483058cc3bbau8t",
          "user": "643a3eba29cf68dc82c32e4a",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-04-17T07:37:14.323Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }

      //Edit Note
      const editNote=async (id,title,description,tag)=>{
        //serverside
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: "POST",
          headers:{
            'Content-Type':"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTNlYmEyOWNmNjhkYzgyYzMyZTRhIn0sImlhdCI6MTY4MTcxMTM3Nn0.nOoUcd_rzPnfx3veXD5DRMyNcIAA92bqgHIw1xDo6Qg"
          },
          body: JSON.stringify({title,description,tag})
        });
        const json=response.json();
        console.log(json);
        //clientside
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id===id) {
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }

      //Delete Note
      const deleteNote=async (id)=>{
        //serverside
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: "DELETE",
          headers:{
            'Content-Type':"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYTNlYmEyOWNmNjhkYzgyYzMyZTRhIn0sImlhdCI6MTY4MTcxMTM3Nn0.nOoUcd_rzPnfx3veXD5DRMyNcIAA92bqgHIw1xDo6Qg"
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