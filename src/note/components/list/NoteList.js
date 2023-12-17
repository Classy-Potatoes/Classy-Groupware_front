import NoteListItem from "../items/NoteListItem";

function NoteList({ data }) {

    return (
        <div className="notes-div">
            {
                data
                &&
                data.map(note => <NoteListItem key={ note.noteCode } note={ note }/>)
           }
        </div>
    );


}

export default NoteList;