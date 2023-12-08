function AllMember({member, onSelect, isSelected }) {


    return (
        <div
            className="approvallineItem-memberLists"
        >
            <table className="approvalLine-memberList-table">
                <tbody>
              <tr>
                  <td>
                      <input
                          type="checkbox"
                          id={`checkbox-${member.memberCode}`}
                          value={member.memberCode}
                          onChange={onSelect}
                          checked={isSelected}
                          className="approval-memberCode-ck"
                      />
                      </td>
                  <td>{member.deptName}</td>
                  <td>{member.jobName}</td>
                  <td>{member.infoName}</td>
              </tr>
                </tbody>
            </table>



        </div>
    );
}

export default AllMember