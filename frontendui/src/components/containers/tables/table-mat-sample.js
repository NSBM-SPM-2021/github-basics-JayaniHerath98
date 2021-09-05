import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import officials_service from "../../../services/officials_service";
import Chips from "../chips/chips";
import Loadder from "../loadder/loadder";
import CustomButton from "../main/buttons/button";
import { Button } from "@material-ui/core";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: 'hidden'
  }
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function SampleTable() {
  const classes = useStyles();
  var [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = async () => {
    console.log("HII");
    await officials_service.getOfficials().then((users)=>{
        setRows(users);
        
        
    })
  }

  const sortData = (array, order, orderBy) => {
    if(array.length>0){
      array.sort((a,b)=>{
        if (a[orderBy] < b[orderBy]) { return -1; }
        if (a[orderBy] > b[orderBy]) { return 1; }
        return 0;
      })
      if(order==='descending') array.reverse();
    }
    // console.debug(array[0][orderBy]);
    
    setRows((rows)=>null);
    setRows([...array]);
  }

  const sortDataOriginal = (array) => {
    console.log("SRT");
    if(array.length>0){
      array.sort((a,b)=>{
        if (a.username < b.username) { return -1; }
        if (a.username > b.username) { return 1; }
        return 0;
      })
    }
    console.debug(array);
    setRows((rows)=>null);
    setRows([...array]);
  }

  useEffect(() => {
    getData();
    
    return () => {
      
    }
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="left">Contact No. (Username) |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'contactno')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'contactno')}></i>
            </TableCell>
            <TableCell align="left">Name |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'username')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'username')}></i>
            </TableCell>
            <TableCell align="left">NIC No. |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'nic')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'nic')}></i>
            </TableCell>
            <TableCell align="left">User Status |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'status')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'status')}></i>
            </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {rows&&rows.length>0&&rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="left">{row.contactno}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.nic}</TableCell>
                <TableCell align="left"><Chips type="tag" color="primary" values={[{title: row.status, link: '/users/{ID}'}]} /></TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
    {
        rows.length===0?
        <Loadder/>
        :null
    }
    </>
  );
}
