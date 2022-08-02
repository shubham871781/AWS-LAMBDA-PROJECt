import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    RadioGroup, TextField
} from "../../../commocomponent/FormFields";
import { Input } from 'reactstrap';
import { TEXT_FIELD, EMAIL, PHONEREG, PRICE_NUMBER } from "../../../Validation";
import * as Yup from "yup";

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
import { API_URL, ADDDONATION, ALLCONTRY, ALLSTATE, ALLCITY } from "../../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Select from "react-select";
import Page from '../../../components/Page';
import { Formik, Form } from "formik";
// import { useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CityDropdown } from 'react-country-region-selector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    submit: {
        top: "17px"
    },
}))

export default function Adddonation() {
    const navigate = useNavigate();
    const success = () => { }

    const [region, SetselectRegion] = useState('');
    const [city, SetselectCity] = useState('');
    const classes = useStyles();
    const [userRequest, setUserRequest] = useState([]);
    const [country, SetselectCountry] = useState('');
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);

    const url = `${API_URL}/${ADDDONATION}`;
    const onSubmit = (values, e) => {

        axios.post(url, {
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            countryname: selected.label,
            cityname: selected2.label,
            statename: selected1.label,
            countryid: selected.value,
            cityid: selected2.value,
            stateid: selected1.value,
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
                }
                navigate('/dashboard/donation', { replace: true });
            })

    };
    const [contryid, setContryid] = useState();
    console.log()
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
            <ToastContainer />
            <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Add Donation</Typography>
                </Box>

                <Card className={classes.root} variant="outlined">

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                <Formik
                                    key="one"
                                    enableReinitialize
                                    initialValues={{
                                        userName: "",
                                        phoneNumber: "",
                                        email: "",
                                        donationprice: "",
                                        meassge:"",
                                        status: "0"
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
                                        
                                        if (selected.value && selected1.value && selected2.value) {
                                            onSubmit(values)
                                        }


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
                                                            className="email1"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            options={lables1}
                                                            onChange={setSelected}
                                                            value={selected}
                                                            selected={selected}
                                                            placeholder="Select Country"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            options={lables2}
                                                            onChange={setSelected1}
                                                            value={selected1}
                                                            selected={selected1}
                                                            placeholder="Select State"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            options={lables3}
                                                            onChange={setSelected2}
                                                            value={selected2}
                                                            selected={selected2}
                                                            placeholder="Select City"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Donation Price"
                                                            type="text"
                                                            name="donationprice"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Donation Meassge"
                                                            type="text"
                                                            name="message"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RadioGroup
                                                            name="status"

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
                                                    ADD
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
        </>
    );
}
