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

   return (
      <div>
         <form>
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
                  rows={isExpanded ? 3 : 1}
               ></textarea>
            </p>
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
                     : { background: "#ffc812", cursor: "pointer" }
               }
            >
               <box-icon name="plus"></box-icon>
            </button>
         </form>
      </div>
   );
}

export default CreateArea;
