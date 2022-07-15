import React from "react";
import "./Note.scss";
import "boxicons";
const Note = ({
   title,
   text,
   id,
   changeNote,
   deleteNote,
   handleChangeText,
   handleChangeTitle,
}) => {
   const [editMode, setEditMode] = React.useState(false);
   const modificate = () => {
      setEditMode(!editMode);
      if (editMode === true) changeNote(id, title, text);
   };
   return (
      <div className="note">
         {editMode ? (
            <>
               <div className="titleWrap">
                  <textarea
                     value={title}
                     placeholder={title ? "" : "Take a title..."}
                     onChange={(e) => handleChangeTitle(id, e)}
                     rows={
                        Math.floor(title.length / 20) === 0
                           ? 1
                           : Math.floor(title.length / 20) + 1
                     }
                  />
               </div>
               <div className="textWrap">
                  <textarea
                     value={text}
                     onChange={(e) => handleChangeText(id, e)}
                     placeholder={text ? "" : "Take a note..."}
                     rows={
                        Math.floor(text.length / 27) === 0
                           ? 1
                           : Math.floor(text.length / 27) + 1
                     }
                  />
               </div>
            </>
         ) : (
            <>
               <div className="titleWrap">
                  <h1>{title}</h1>
               </div>
               <div className="textWrap">
                  <p>{text}</p>
               </div>
            </>
         )}

         <div className="buttonBlock">
            <button onClick={() => deleteNote(id)}>
               <box-icon name="trash"></box-icon>
            </button>
            <button onClick={() => modificate()}>
               <box-icon
                  name="edit"
                  type="solid"
                  color={editMode ? "#ffc812" : "#000"}
               ></box-icon>
            </button>
         </div>
      </div>
   );
};

export default Note;
