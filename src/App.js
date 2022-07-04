import Note from "./components/Note";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Count from "./components/Count";
import CreateArea from "./components/CreateArea";
function App() {
   const [notes, setNotes] = useState([]);
   useEffect(() => {
      try {
         axios.get("http://localhost:8080/notes").then((res) => {
            setNotes(res.data);
         });
      } catch (error) {
         console.log(error, "Ошибка при загрузке данных");
      }
   }, [setNotes]);

   const deleteNote = (id) => {
      try {
         axios.delete(`http://localhost:8080/notes/${id}`);
         setNotes(
            notes.filter((note) => {
               return note.id !== id;
            })
         );
      } catch (error) {
         console.log(error, "Ошибка при удалении");
      }
   };
   const changeNote = (id, newTitle, newText) => {
      try {
         axios.patch(`http://localhost:8080/notes/${id}`, {
            title: newTitle,
            text: newText,
         });
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
   const addNote = (title = "", text = "") => {
      try {
         axios.post(`http://localhost:8080/notes`, {
            title: title,
            text: text,
         });
         axios.get("http://localhost:8080/notes").then((res) => {
            setNotes(res.data);
         });
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
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

export default App;
