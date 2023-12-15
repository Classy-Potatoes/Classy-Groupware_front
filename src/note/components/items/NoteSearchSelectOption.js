

const NoteSearchSelectOption = ({ messageType, searchCondition, onChangeHandler, options }) => {
    const getOptionsForMessageType = (messageType) => {
        switch (messageType) {
            case 'received':
                return (
                    <>
                        <option value="전체">전체</option>
                        <option value="보낸 사람">보낸 사람</option>
                        <option value="내용">내용</option>
                    </>
                );
            case 'sent':
                return (
                    <>
                        <option value="전체">전체</option>
                        <option value="받는 사람">받는 사람</option>
                        <option value="내용">내용</option>
                    </>
                );
            case 'important':
                return (
                    <>
                        <option value="전체">전체</option>
                        <option value="보낸 사람">보낸 사람</option>
                        <option value="내용">내용</option>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <select
            name="note-search-options"
            value={ options }
            onChange={ (e) => onChangeHandler({ name: e.target.value }) }
        >
            { getOptionsForMessageType(messageType) }
        </select>
    );

};

export default NoteSearchSelectOption;
