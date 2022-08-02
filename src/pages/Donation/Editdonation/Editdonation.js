import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    RadioGroup, TextField
} from "../../../commocomponent/FormFields";
import { Input } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { TEXT_FIELD, EMAIL, PHONEREG, PRICE_NUMBER } from "../../../Validation";

import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Moment from 'moment';
import { API_URL, EDITDONATION, SINGLEDONATION, ALLCONTRY, ALLSTATE, ALLCITY } from "../../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Page from '../../../components/Page';
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CityDropdown } from 'react-country-region-selector';

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    submit: {
        top: "17px"
    }
}))
toast.configure()

export default function Editdonation() {
    const navigate = useNavigate();
    let { id } = useParams();
    const success = () => { }

    const { setValue } = useForm();
    const [editstatus, seteditstatus] = useState("1");
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);
    const [countryname, setcountryname] = useState(selected.label);
    const [countryid, setcountryid] = useState(selected.value);
    const [cityname, setcityname] = useState(selected2.label);
    const [cityid, setcityid] = useState(selected2.value);
    const [statename, setstatename] = useState(selected1.label);
    const [stateid, setstateid] = useState(selected1.value);
    const [email, setemail] = useState()
    const [userName, setuserName] = useState()
    const [phoneNumber, setphoneNumber] = useState()
    const [donationprice, setdonationprice] = useState()
    const [message, setmessage] = useState()

    const classes = useStyles();

    useEffect(() => {
        setcountryid(selected.value);
        setcountryname(selected.label)
        setstateid(selected1.value);
        setstatename(selected1.label)
        setcityid(selected2.value);
        setcityname(selected2.label)

    }, [selected, selected1, selected2]);
    const url = `${API_URL}/${SINGLEDONATION}`;
    const updatelotteryurl = `${API_URL}/${EDITDONATION}`;
    const [userRequest, setUserRequest] = useState({
        loading: false,
        user: null,
    });
    const onSubmit = (values, e) => {

        axios.post(updatelotteryurl, {
            id: id,
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            countryid: selected ? selected.value : "",
            cityid: selected2 ? selected2.value : "",
            stateid: selected1 ? selected1.value : "",
            countryname: selected ? selected.label : "",
            cityname: selected2 ? selected2.label : "",
            statename: selected1 ? selected1.label : "",
            donationprice: values.donationprice,
            message: values.message,
            status: values.status,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    success(toast.success(response.data.message))
                    navigate('/dashboard/donation', { replace: true });
                }

            })

    };
    useEffect(() => {
        axios.post(url, {
            id: id,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((response) => {
                setUserRequest({
                    user: response.data.data.donation,
                });
                let user = response.data.data.donation;
                if (user) {
                    setuserName(user.userName);
                    setphoneNumber(user.phoneNumber);
                    setdonationprice(user.donationprice);
                    setemail(user.email);
                    setcountryname(user.countryname);
                    setstatename(user.statename);
                    setstateid(user.stateid);
                    setcityname(user.cityname);
                    setcityid(user.cityid);
                    setcountryid(user.countryid);
                    setmessage(user.message);

                }
                if (response.data.data.donation.status == true) {
                    seteditstatus("1");
                } else {
                    seteditstatus("0");
                }
            })

    }, []);
    const { user } = userRequest;


    const [lables1, setlables] = useState([]);
    useEffect(() => {
        const url = `${API_URL}/${ALLCONTRY}`;

        axios.get(url, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        }).then(response => response.data)
            .then((data) => {
                setUserRequest(data.data.donation);
                let lablearray = [];
                for (let index = 0; index < data.data.donation.length; index++) {
                    lablearray.push({ 'label': data.data.donation[index].name || data.data.donation[index].id, 'value': data.data.donation[index].id })
                }
                setlables(lablearray);
            })

    }, []);
    const [lables2, setlables2] = useState([]);
    useEffect(() => {
        const url1 = `${API_URL}/${ALLSTATE}`;
        axios.post(url1, {
            id: selected.value,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((data) => {
                console.log(data.data.data.donation)
                let lablearray = [];
                for (let index = 0; index < data.data.data.donation.length; index++) {
                    lablearray.push({ 'label': data.data.data.donation[index].name || data.data.data.donation[index].id, 'value': data.data.data.donation[index].id })
                }
                setlables2(lablearray);
            })

    }, [selected]);
    const [lables3, setlables3] = useState([]);
    useEffect(() => {
        const url2 = `${API_URL}/${ALLCITY}`;
        axios.post(url2, {
            id: selected1.value,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((data) => {
                let lablearray = [];
                for (let index = 0; index < data.data.data.donation.length; index++) {
                    lablearray.push({ 'label': data.data.data.donation[index].name || data.data.data.donation[index].id, 'value': data.data.data.donation[index].id })
                }
                setlables3(lablearray);
            })

    }, [selected1]);
    const selectcity1 = () => {
        success(toast.warning("please select city"));
    }

    const selectcountry1 = () => {
        success(toast.warning("please select country"));
    }
    const selectstate1 = () => {
        success(toast.warning("please select state"));
    }


    return (
        <>
            <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Edit Donation</Typography>
                </Box>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                <Formik
                                    key="one"
                                    enableReinitialize
                                    initialValues={{
                                        userName: userName ? userName : "",
                                        phoneNumber: phoneNumber ? phoneNumber : "",
                                        email: email ? email : "",
                                        donationprice: donationprice ? donationprice : "",
                                        status: editstatus ? editstatus : "",
                                        message: message ? message :""
                                    }}
                                    validationSchema={Yup.object().shape({
                                        userName: Yup.string()
                                            .required("User Name is required")
                                            .matches(TEXT_FIELD, "only letter allowed."),
                                        email: Yup.string()
                                            .matches(EMAIL, "Enter valid email.")
                                            .required("Email is required"),
                                        phoneNumber: Yup.string()
                                            .required("Mobile Number is required")
                                            .matches(PHONEREG, "Invalid mobile number!"),
                                        donationprice: Yup.string()
                                            .required("Donation Price is required")
                                            .matches(PRICE_NUMBER, "only number allowed."),
                                    })}

                                    onSubmit={values => {
                                       // if (selected.value && selected1.value &&  selected2.value) {
                                            onSubmit(values)
                                       // }


                                    }}
                                >
                                    {({ setFieldValue,
                                        touched,
                                        values, }) => (
                                        <>
                                            <Form key="oneForm">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Full Name"
                                                            type="text"
                                                            name="userName"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Phone Number"
                                                            type="text"
                                                            name="phoneNumber"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Email"
                                                            type="text"
                                                            name="email"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                           
                                                            value={{ label: countryname, value: countryid } ? { label: countryname, value: countryid } : selected}
                                                            options={lables1}
                                                            onChange={setSelected}
                                                            selected={{ label: countryname, value: countryid }}
                                                            placeholder="Select Country"
                                                            name="Country"
                                                            
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            value={{ label: statename, value: stateid } ? { label: statename, value: stateid } : selected1}
                                                            options={lables2}
                                                            onChange={setSelected1}
                                                            selected={{ label: statename, value: stateid }}
                                                            placeholder="Select State"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            value={{ label: cityname, value: cityid } ? { label: cityname, value: cityid } : selected2}
                                                            options={lables3}
                                                            onChange={setSelected2}
                                                            selected={{ label: cityname, value: cityid }}
                                                            placeholder="Select City"
                                                            name="City"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Donation Rrice"
                                                            type="text"
                                                            name="donationprice"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Donation Message"
                                                            type="text"
                                                            name="message"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RadioGroup
                                                            name="status"
                                                            label="Status"
                                                            children={[
                                                                { value: "1", label: "Active " },
                                                                { value: "0", label: "Inactive " },
                                                            ]}
                                                            onChange={() => { }}
                                                            id="statusId"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                    onClick={(event) => { selectcountry1(event); selectstate1(); selectcity1(); }}
                                                >
                                                    Edit
                                                </Button>

                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Page>
            <ToastContainer />

        </>
    );
}
