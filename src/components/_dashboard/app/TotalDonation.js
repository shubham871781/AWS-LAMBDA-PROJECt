import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { API_URL, DONATIONLIMIT } from "../../../Apiconstant/Apiconstant"
// material
import {
    Card,
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../components/_dashboard/user';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------
import { makeStyles } from "@material-ui/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'userName', label: 'User Name', alignRight: false },
    { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'state', label: 'State', alignRight: false },
    { id: 'city', label: 'City', alignRight: false },
    { id: 'donationprice', label: 'Donation Price', alignRight: false },

    { id: '' }
];

// ----------------------------------------------------------------------

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
    return order === 'asc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.userName.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    button: {
        color: "#000",
        float: "right",
        width: "110px",
        height: "47px",
        fontWeight: "bold",
        backgroundColor: "rgba(0, 171, 85, 0.08)",
        right: "65px"
    },
    modal: {
        color: "#000",
        float: "right",
        width: "110px",
        height: "47px",
        fontWeight: "bold",
        backgroundColor: "rgba(0, 171, 85, 0.08)",
        right: "65px"
    },
}))
export default function TotalDonation() {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userRequest, setUserRequest] = useState([]);
    useEffect(() => {
        const url = `${API_URL}/${DONATIONLIMIT}`;

        axios.get(url, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        }).then(response => response.data)
            .then((data) => {
                setUserRequest(data.data.donation);
            })

    }, []);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = userRequest.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);

    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userRequest.length) : 0;

    const filteredUsers = applySortFilter(userRequest, getComparator(order, orderBy), filterName);
    const isUserNotFound = filteredUsers.length === 0;
    return (
        <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
            <ToastContainer />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Latest Donation
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/donation"
                    >
                       View All
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        selected={selected}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={userRequest.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, userName, phoneNumber, email, countryname, statename, cityname, donationprice } = row;
                                            const isItemSelected = selected.indexOf(id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">{id}</TableCell>
                                                    <TableCell align="left">{userName}</TableCell>
                                                    <TableCell align="left">{phoneNumber}</TableCell>
                                                    <TableCell align="left">{email}</TableCell>
                                                    <TableCell align="left">{countryname} </TableCell>
                                                    <TableCell align="left">{statename} </TableCell>
                                                    <TableCell align="left">{cityname} </TableCell>
                                                    <TableCell align="left">{donationprice} </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={userRequest.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
