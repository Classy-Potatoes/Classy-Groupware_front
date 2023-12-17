import {Outlet} from "react-router-dom";
import Header from '../../dashBoard/components/common/Header';
import NoteNavbar from '../components/common/NoteNavbar';

function NoteLayout() {

    return (
        <>
            <Header/>
            <div className="notes-container">
                <NoteNavbar/>
                <main className="note-main-container">
                    <Outlet/>
                </main>
            </div>
        </>
    );

}

export default NoteLayout;