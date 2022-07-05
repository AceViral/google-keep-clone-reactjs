import Note from "./components/Note";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Count from "./components/Count";
import CreateArea from "./components/CreateArea";
function App() {
   const [notes, setNotes] = useState([]);

   const getNotes = async () => {
      await axios.get("http://localhost:8080/notes").then((res) => {
         setNotes(res.data);
      });
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
         const fetchData = async () => {
            await axios.delete(`http://localhost:8080/notes/${id}`);
            setNotes(
               notes.filter((note) => {
                  return note.id !== id;
               })
            );
         };
         fetchData();
      } catch (error) {
         console.log(error, "Ошибка при удалении");
      }
   };
   const changeNote = (id, newTitle, newText) => {
      try {
         const fetchData = async () => {
            await axios.patch(`http://localhost:8080/notes/${id}`, {
               title: newTitle,
               text: newText,
            });
         };
         fetchData();
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };
   const addNote = (title = "", text = "") => {
      try {
         const fetchData = async () => {
            axios.post(`http://localhost:8080/notes`, {
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

export default App;
