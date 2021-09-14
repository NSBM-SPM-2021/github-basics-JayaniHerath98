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
import books_service from "../../../services/books_service";
import Chips from "../chips/chips";
import Loadder from "../loadder/loadder";
import BooksModalDialog from '../main/forms/books-popup';


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

export default function BooksTable() {
  const classes = useStyles();
  var [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = async () => {
    console.log("HII");
    // await officials_service.getOfficials().then((users)=>{
    //     setRows(users);
    // })
    await books_service.getBooks().then((books)=>{
      setRows(books);
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
      <div className="ct-table-heading">
        <BooksModalDialog />
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="left">Name |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'name')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'nanme')}></i>
            </TableCell>
            <TableCell align="left">Author |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'author')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'author')}></i>
            </TableCell>
            <TableCell align="left">Publisher |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'published')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'published')}></i>
            </TableCell>
            <TableCell align="left">Categorry |
              <i class="fas fa-arrow-circle-up" onClick={()=>sortData(rows, 'acendings', 'published')}></i> 
              <i class="fas fa-arrow-circle-down" onClick={()=>sortData(rows, 'descending', 'published')}></i>
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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.published}</TableCell>
                <TableCell align="left"><Chips type="tag" color="primary" values={[{title: row.category, link: '/users/{ID}'}]} /></TableCell>
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
