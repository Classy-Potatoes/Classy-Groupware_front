import * as React from 'react';
import Button from "@mui/material/Button";
import {Pagination, Stack} from "@mui/material";

 function ApprovalPagingBar({pageInfo, setCurrentPage}) {
    // const pageNumber = [...Array(pageInfo.endPage - pageInfo.startPage + 1).keys()]
    //                                 .map(key => key + pageInfo.startPage);

    const pageNumber = [];
        return(
     <Stack spacing={2} direction="row" alignItems="center" sx={{justifyContent: 'center'}}>
         <Pagination count={pageInfo.maxPage} page={pageInfo.currentPage} onChange={(_, page) => setCurrentPage(page)} showFirstButton showLastButton />

         <ul className="paging-ul">
             {pageNumber.map((num) => (
                 <li key={num}>
                     <Button
                         className="page-btn"
                         style={pageInfo.currentPage === num ? { backgroundColor: 'orange' } : null}
                         onClick={() => setCurrentPage(num)}
                         disabled={pageInfo.currentPage === num}
                     >
                         {num}
                     </Button>
                 </li>
             ))}

         </ul>
     </Stack>
        );
 };

export default ApprovalPagingBar;