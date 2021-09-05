import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
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
import organization_service from '../../../services/organization_service';
import CustomButton from '../main/buttons/button';
import { Delete, Sort, Update } from '@material-ui/icons';
import Loadder from '../loadder/loadder';
import { Button, Divider, MenuItem, Menu } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    // maxHeight: '47vh',

  },

  root: {
    // width: '100%',

    // overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    maxHeight: '25vh',
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

export default function OrganizationUsersTable(props) {
    const classes = useStyles();
    const { path, url } = useRouteMatch();
    const [officials, setOfficials] = useState([]);
    const [approved, setApproved] = useState([]);
    const [type, setType] = useState("ALL");
    var [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const getOfficials = async () => {
        setOfficials(await officials_service.getOfficials());
    }
    const getAssigned = async () => {
        setApproved(props.organization.officials);
        console.log(props.organization.officials);
        // setOfficials(await officials_service.getOfficials());
    }

    const assignOfficial = (id, user, organization) => {
        organization.officials.push({contact:id, name: user});
        organization_service.updateOrganization(organization.id, organization);
    }

    const rejectOfficial = (id, user, organization) => {
        organization.officials.push({contact:id, name: user});
        organization_service.updateOrganization(organization.id, organization);
    }

    const changeTable = (type) => {
        setType(type);
    }

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
    getAssigned();
    getOfficials();
    return () => {

    }
  }, [])

  return (
    <>
    <TableContainer component={Paper} className={classes.container}>
      {/* <div className="filter-pack">
        <CustomButton text={'APPROVED'} icon={null} color="success" onClick={()=>{changeTable("ASSIGNED"); setPage(0)}}></CustomButton>
        <CustomButton text={'ALL USERS'} icon={null} color="primary" onClick={()=>{changeTable("ALL"); setPage(0);}}></CustomButton>
      </div> */}
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
          <MenuItem><CustomButton text={'APPROVED'} icon={null} color="success" onClick={()=>{changeTable("ASSIGNED"); setPage(0)}}></CustomButton></MenuItem>
          <MenuItem><CustomButton text={'ALL USERS'} icon={null} color="primary" onClick={()=>{changeTable("ALL"); setPage(0);}}></CustomButton></MenuItem>
          <Divider/>
          <MenuItem><CustomButton text={'ACCENDING'} icon={null} color="info" onClick={()=>handleClose}></CustomButton></MenuItem>
          <MenuItem><CustomButton text={'DESENDING'} icon={null} color="info" onClick={()=>handleClose}></CustomButton></MenuItem>
        </Menu>
        
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Contact No.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">NIC No.</TableCell>
            {/* <TableCell align="right">Incharge</TableCell> */}
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {type==="ASSIGNED"&&approved&&approved.length>0 && approved
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
            <TableRow key={row.contactno}>
              <TableCell component="th" scope="row">
                {row.contact}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.nic}</TableCell>
              {/* <TableCell align="right">{row.nic}</TableCell> */}
              <TableCell align="right">

                <CustomButton text={'VIEW'} icon={null} color="primary" onClick={()=>null}></CustomButton>
                <CustomButton text={'DELETE'} icon={null} color="danger" onClick={()=>console.log("REMOVE")}></CustomButton>

              </TableCell>
            </TableRow>
          ))}

            {type==="ALL"&&officials&&officials.length>0 && officials
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
            <TableRow key={row.contactno}>
              {/* <TableCell component="th" scope="row">
                {'1'}
              </TableCell> */}
              <TableCell align="left">{row.contactno}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.nic}</TableCell>
              <TableCell align="right">

                <CustomButton className="btn btn-primary float-right" text={'VIEW'} icon={null} color="primary" onClick={() => null}></CustomButton>
                <CustomButton className="btn btn-primary float-right" text={'ASSIGN'} icon={null} color="success" onClick={()=>assignOfficial(row.contactno, row.username, props.organization)}></CustomButton>

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
      {type==="ALL"&&
      (<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={officials.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)
      }
      {type==="ASSIGNED"&&
      (<TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={approved.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />)
      }
    </TableContainer>
    {
        officials.length===0?
        <Loadder/>
        :null
    }
    </>
  );
}