import {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {authRequest} from "../../common/apis/Api";

function NoteReplyModal({ onClose }) {

    const [replyBody, setReplyBody] = useState('');
    const onChangeBody = (e) => {
      setReplyBody(e.target.value);
    };
    const {noteReceiver} = useSelector(state => state.noteReducer);
    // const noteReplySend = () => {
    //     onSaveReply(replyBody);
    // }

    const onSaveReply = async (replyBody, noteReceiver) => {
        console.log(replyBody, "replyBody");
        console.log(noteReceiver, "noteReceiver");
        try {
            if (!noteReceiver) {
                console.error('noteReceiver가 없음');
                return;
            }
            // API 호출을 통해 쪽지 저장
            const response = await authRequest.post('/cg-api/v1/note/replySend', {
                // sendRequest: {
                    noteReceiver: noteReceiver,
                    noteBody: replyBody,
                // },
            });

            console.log('Saved reply:', response.data);
            onClose();
            toast.success("답장이 전송되었습니다!");
        } catch (error) {
            console.error('Error saving reply:', error);
            toast.error("답장 전송에 실패했습니다.");
        }
    };


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
                  <button onClick={() => onSaveReply(replyBody, noteReceiver)}>보내기</button>
              </div>
          </div>
      </>
    );

}

export default NoteReplyModal;