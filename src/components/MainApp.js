import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Count from "./Count";
import CreateArea from "./CreateArea";
import Note from "./Note";

function MainApp() {
   const [notes, setNotes] = useState([]);
   const hostUrl = "http://localhost:8080/v1/";
   const getNotes = async () => {
      await axios.get(hostUrl + "notes").then((res) => {
         setNotes(res.data.data);
      });
   };
   const deleteNoteFunction = async (id) => {
      await axios.delete(hostUrl + `notes/${id}`);
      setNotes(
         notes.filter((note) => {
            return note.id !== id;
         })
      );
   };
   useEffect(() => {
      try {
         getNotes();
      } catch (error) {
         console.log(error, "Ошибка при загрузке данных");
      }
   }, [setNotes]);

   const deleteNote = (id) => {
      try {
         deleteNoteFunction(id);
      } catch (error) {
         console.log(error, "Ошибка при удалении");
      }
   };
   const changeNote = (id, newTitle, newText) => {
      try {
         if (newTitle === "" && newText === "") {
            deleteNoteFunction(id);
         } else {
            const fetchData = async () => {
               await axios.patch(hostUrl + `notes/${id}`, {
                  title: newTitle,
                  text: newText,
               });
            };
            fetchData();
         }
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };
   const addNote = (title = "", text = "") => {
      try {
         const fetchData = async () => {
            axios.post(hostUrl + `notes`, {
               title: title,
               text: text,
            });
         };
         fetchData();
         getNotes();
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };
   const handleChangeText = (id, e) => {
      setNotes(
         notes.map((note) =>
            note.id === id ? { ...note, text: e.target.value } : note
         )
      );
   };
   const handleChangeTitle = (id, e) => {
      setNotes(
         notes.map((note) =>
            note.id === id ? { ...note, title: e.target.value } : note
         )
      );
   };

   return (
      <div className="App">
         <Header />
         <Count
            count={
               notes.length === 0
                  ? "Empty"
                  : `Showing ${notes.length} Notes in Database`
            }
         />
         <CreateArea addNote={addNote} />
         {notes.map((note) => (
            <Note
               key={note.id}
               title={note.title}
               text={note.text}
               id={note.id}
               changeNote={changeNote}
               deleteNote={deleteNote}
               handleChangeText={handleChangeText}
               handleChangeTitle={handleChangeTitle}
            />
         ))}
      </div>
   );
}
export default MainApp;
