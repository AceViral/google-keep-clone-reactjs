import React, { useState } from "react";
import "boxicons";
import "./CreateArea.scss";
function CreateArea({ addNote }) {
   const [isExpanded, setExpanded] = useState(false);

   const [note, setNote] = useState({
      title: "",
      text: "",
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setNote((preValue) => {
         return {
            ...preValue,
            [name]: value,
         };
      });
   }
   function handleExpanded() {
      setExpanded(true);
   }

   function submitButton(event) {
      addNote(note.title, note.text);
      setNote({
         title: "",
         text: "",
      });
      event.preventDefault();
      setExpanded(false);
   }

   const showFile = async (e) => {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
         const text = e.target.result;
         setNote({
            title: "",
            text: text,
         });
         setExpanded(true);
      };
      reader.readAsText(e.target.files[0]);
   };

   return (
      <div>
         <form className="createAreaForm">
            {isExpanded && (
               <input
                  value={note.title}
                  type="text"
                  placeholder="Take a title..."
                  name="title"
                  onChange={handleChange}
               />
            )}
            <p>
               <textarea
                  value={note.text}
                  onClick={handleExpanded}
                  name="text"
                  placeholder="Take a note..."
                  onChange={handleChange}
                  rows={isExpanded ? 4 : 1}
               />
            </p>
            <div className="inputWrapper">
               <input type="file" id="inputFile" onChange={showFile} />
               <label htmlFor="inputFile">
                  <i className="bx bx-pin"></i>
               </label>
            </div>
            <button
               onClick={submitButton}
               disabled={note.text === "" && note.title === "" ? true : false}
               style={
                  note.text === "" && note.title === ""
                     ? {
                          background: "#808080",
                          cursor: "auto",
                          transform: "rotate(45deg)",
                       }
                     : { background: "#febeb0", cursor: "pointer" }
               }
               className="plusBtn"
            >
               <i className="bx bx-plus"></i>
            </button>
         </form>
      </div>
   );
}

export default CreateArea;
