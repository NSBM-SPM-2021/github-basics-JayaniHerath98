import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import officials_service from '../../../services/officials_service';
import CustomButton from '../main/buttons/button';
import { Delete, Update, Sort } from '@material-ui/icons';
import Loadder from '../loadder/loadder';
import { Button, Divider, Menu, MenuItem } from '@material-ui/core';

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

    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
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

export default function UsersTable() {
  const classes = useStyles();
  var [rows, setRows] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [notapprovedUsers, setNotApprovedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [type, setType] = useState('APPROVED');

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
    await officials_service.getOfficials().then((users)=>{
        setRows(users);
        users.forEach((user)=>{
            if(user.status==='APPROVED'){
                console.log("APPROVED");
                setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
            } else if(user.status==='NOT APPROVED'){
                console.log("NOT APPROVED");
                setNotApprovedUsers(notapprovedUsers=>[...notapprovedUsers, user]);
            } else if(user.status==='DISABLE'){
                console.log("BLOCKED");
                setBlockedUsers(blockedUsers=>[...blockedUsers, user]);
            }
        });
    })
  }

    const deleteUser = async (id) => {
        // setUsers(await officials_service.deleteOfficial(id))
        await officials_service.deleteOfficial(id)
    }

    const updateUserStatus = async (id, user, status) => {
        user.status = status;
        // setUsers(await officials_service.updateOfficial(id, user))
        await officials_service.updateOfficial(id, user);
    }

    // MENU RELATED ============================================================
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    // =============================================================== MOVE

    useEffect(() => {
        getData();
        return () => {

        }
    }, [])

  return (
    <>
    <TableContainer component={Paper} className={classes.container}>
      <div className="ct-table-heading">
        {/* <CustomButton text={'APPROVED'} icon={null} color="success" onClick={()=>setType('APPROVED')}></CustomButton>
        <CustomButton text={'NOT APPROVED'} icon={null} color="warning" onClick={()=>setType('NOT APPROVED')}></CustomButton>
        <CustomButton text={'BLOCKED'} icon={null} color="danger" onClick={()=>setType('DISABLE')}></CustomButton> */}
        <Button variant="contained" color="primary" onClick={(e) => handleClick(e)}>
          <Sort/>
        </Button>
        <br></br>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem><CustomButton text={'APPROVED'} icon={null} color="success" onClick={()=>{setType('APPROVED'); setPage(0)}}></CustomButton></MenuItem>
          <MenuItem><CustomButton text={'PENDING'} icon={null} color="warning" onClick={()=>{setType('NOT APPROVED'); setPage(0)}}></CustomButton></MenuItem>
          <MenuItem><CustomButton text={'BLOCKED'} icon={null} color="secondary" onClick={()=>{setType('DISABLE'); setPage(0)}}></CustomButton></MenuItem>
          <Divider/>
          <MenuItem><CustomButton text={'ACCENDING'} icon={null} color="info" onClick={()=>handleClose}></CustomButton></MenuItem>
          <MenuItem><CustomButton text={'DESENDING'} icon={null} color="info" onClick={()=>handleClose}></CustomButton></MenuItem>
        </Menu>
        
      </div>
      <div className="ct-table-heading">
        
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">NIC No.</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">NIC Number</TableCell>
            <TableCell align="left">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {type==='NOT APPROVED'&&notapprovedUsers&&notapprovedUsers.length>0 && notapprovedUsers.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.contactno}>
              <TableCell component="th" scope="row">
                {row.contactno}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">

                <CustomButton text={'APPROVE'} icon={null} color="success" onClick={
                                        ()=>{
                                            updateUserStatus(row.contactno, row, "APPROVED"); 
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.contactno !== row.contactno)); 
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, row]);
                                        }}></CustomButton>
                <CustomButton text={'VIEW'} icon={null} color="info" onClick={() => null}></CustomButton>
                <CustomButton text={'DELETE'} icon={null} color="danger" onClick={
                                        ()=>{
                                            deleteUser(row.contactno);
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.contactno !== row.contactno));
                                        }}></CustomButton>

              </TableCell>
            </TableRow>
          ))}

            {type==='APPROVED'&&approvedUsers&&approvedUsers.length>0 && approvedUsers.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.contactno}>
              <TableCell component="th" scope="row">
                {row.contactno}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">

                <CustomButton className="btn btn-primary float-right" text={'BLOCK'} icon={null} color="warning" onClick={
                                        ()=>{
                                            updateUserStatus(row.contactno, row, "DISABLE"); 
                                            setApprovedUsers(approvedUsers.filter(item => item.contactno !== row.contactno));
                                            setBlockedUsers(approvedUsers=>[...approvedUsers, row]);
                                        }}></CustomButton>
                <CustomButton className="btn btn-primary float-right" text={'VIEW'} icon={null} color="info" onClick={() => null}></CustomButton>
                <CustomButton className="btn btn-primary float-right" text={'DELETE'} icon={null} color="danger" onClick={
                                        ()=>{
                                            deleteUser(row.contactno);
                                            setApprovedUsers(approvedUsers.filter(item => item.contactno !== row.contactno));
                                        }}></CustomButton>

              </TableCell>
            </TableRow>
          ))}

            {type==='DISABLE'&&blockedUsers&&blockedUsers.length>0 && blockedUsers.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.contactno}>
              <TableCell component="th" scope="row">
                {row.contactno}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.nic}</TableCell>
              <TableCell align="left">

                <CustomButton className="btn btn-primary float-right" text={'UNBLOCK'} icon={null} color="secondary"onClick={
                                        ()=>{
                                            updateUserStatus(row.contactno, row, "APPROVED");
                                            setBlockedUsers(blockedUsers.filter(item => item.contactno !== row.contactno));
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, row]);
                                    }}></CustomButton>
                <CustomButton className="btn btn-primary float-right" text={'VIEW'} icon={null} color="primary" onClick={() => null}></CustomButton>
                <CustomButton className="btn btn-primary float-right" text={'DELETE'} icon={null} color="danger" onClick={
                                        ()=>{
                                            deleteUser(row.contactno);
                                            setBlockedUsers(blockedUsers.filter(item => item.contactno !== row.contactno));
                                    }}></CustomButton>

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
      {type==='NOT APPROVED'&&(<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={notapprovedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)}
      {type==='APPROVED'&&(<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={approvedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)}
      {type==='DISABLE'&&(<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={blockedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)}
    </TableContainer>
    {
        rows.length===0?<Loadder/>:null
    }
    </>
  );
}