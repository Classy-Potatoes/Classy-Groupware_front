import {Outlet} from "react-router-dom";
import Header from '../../dashBoard/components/common/Header';
import NoteNavbar from '../../note/components/common/NoteNavbar';

function NoteLayout() {

    return (
        <>
            <Header/>
            <NoteNavbar/>
            <main className="note-main">
                <Outlet/>
            </main>
        </>
    );

}

export default NoteLayout;