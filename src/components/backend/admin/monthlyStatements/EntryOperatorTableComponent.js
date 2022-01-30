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


const EntryOperatorTable = () => {
    const entryOperators = useSelector((state) => state.monthlyStatementDetails.entryOperators);

  const renderList = entryOperators.map((staff) => {
    return (
        <StyledTableRow key={staff.id}>
                <StyledTableCell align="right">{staff.name}</StyledTableCell>
                <StyledTableCell align="right">{staff.phone}</StyledTableCell>
                <StyledTableCell align="right">{staff.salary}</StyledTableCell>
           </StyledTableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
        <h5 style={{fontSize:'1rem'}}>Entry Operators</h5>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Staff Name</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Salary</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           <>
           {Object.keys(entryOperators).length === 0 ? (
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

export default EntryOperatorTable;