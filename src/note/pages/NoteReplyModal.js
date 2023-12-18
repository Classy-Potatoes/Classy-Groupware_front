import {useState} from "react";

function NoteReplyModal({ onClose, onSaveReply }) {

    const [replyBody, setReplyBody] = useState('');
    const onChangeBody = (e) => {
      setReplyBody(e.target.value);
    };
    const noteReplySend = () => {
        onSaveReply(replyBody);
    }

    return (
      <>
          <div className="note-reply-contanier">
              <div className="note-reply-body">
                  <textarea
                      value={ replyBody }
                      onChange={ onChangeBody }
                      rows="4"
                      cols="50"
                  />
                  <button onClick={ onClose }>취소</button>
                  <button onClick={ noteReplySend }>보내기</button>
              </div>
          </div>
      </>
    );

}

export default NoteReplyModal;