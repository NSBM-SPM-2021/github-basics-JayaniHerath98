import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import organization_service from '../../../services/organization_service';
import CustomButton from '../main/buttons/button';
import BooksModalDialog from '../main/forms/books-popup';
import Loadder from '../loadder/loadder';

const useStyles = makeStyles({
  overrides: {
    MuiTypography: {
      paging: {
        fontSize: [46, "!important"]
      }
    }
  },
  container: {
    maxHeight: '87vh',

  },

  root: {
    width: '100%',
    display: 'flex',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse:'collapse',
   
  },

});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function DepartmentTable() {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  var [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async () => {
    setRows(await organization_service.getOrganizations())
  }

  const deleteOrganization = async (id) => {
    await organization_service.deleteOrganization(id)
    // setOrganizations(await organization_service.getOrganization(id));
  }

  const updateOrganizationStatus = async (id, organization, status) => {
    organization.status = status;
    // setOrganizations(await organization_service.updateOrganization(id, organization))
  }

  useEffect(() => {
    getData();
    return () => {

    }
  }, [])

  return (
    <>
    <TableContainer component={Paper} className={classes.container}>
      <div className="ct-table-heading">
        <BooksModalDialog />
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name of Department</TableCell>
            <TableCell align="right">Contact Numbers</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Incharge</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.contact[0]}, {row.contact[1]}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.incharge}</TableCell>
              <TableCell align="right">

                <Link to={`${url}/organization?id=${row.id}`}><CustomButton text={'VIEW'} icon={null} color="primary" onClick={() => null}></CustomButton></Link>
                <CustomButton text={'DELETE'} icon={null} color="danger" onClick=
                {
                  ()=>{
                      deleteOrganization(row.id);
                      setRows(rows.filter(item => item.id !== row.id));
                  }
                }></CustomButton>

              </TableCell>
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
        rows.length===0?<Loadder/>:null
    }
    </>
  );
}