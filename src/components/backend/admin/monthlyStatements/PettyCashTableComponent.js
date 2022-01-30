import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const PettyCashTable = (props) => {
    const pettyCashes = props.pettyCashes;
  const renderList = pettyCashes.map((data) => {
    return (
        <StyledTableRow key={data.branch_id}>
                <StyledTableCell align="right">{data.branch_name}</StyledTableCell>
                <StyledTableCell align="right">{data.total_petty_cash}</StyledTableCell>
           </StyledTableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
        <h5 style={{fontSize:'1rem'}}>Petty Cash</h5>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Branch Name</StyledTableCell>
            <StyledTableCell align="right">Total Petty Cash</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           <>
           {Object.keys(pettyCashes).length === 0 ? (
                    <StyledTableRow>
                <StyledTableCell align="right" colSpan={4}>
                  <h6 className="mb-0" style={{textAlign: 'center',fontSize:'14px'}}>Loading...</h6>
                </StyledTableCell>
                    </StyledTableRow>
        ): (
           renderList
        )}
           </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PettyCashTable;