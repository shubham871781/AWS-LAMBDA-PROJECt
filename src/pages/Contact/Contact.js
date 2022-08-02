import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    RadioGroup, TextField
} from "../../commocomponent/FormFields";
import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { API_URL, ADDCONTACTDETAILS, ALLCONTACTDETAILS, EDITCONTACTDETAILS } from "../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { Formik, Form } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { TEXT_FIELD, EMAIL, URL, PHONEREG } from "../../Validation";
import * as Yup from "yup";
import Loader from "../../commocomponent/Loader"
const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    submit: {
        top: "17px"
    },
}))

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const success = () => { }
    const { setValue } = useForm();
    const [region, SetselectRegion] = useState('');
    const [city, SetselectCity] = useState('');
    const classes = useStyles();
    const [userRequest, setUserRequest] = useState({
        user: null,
    });
    const [contractdetail, setcontractdetail] = useState({});
    useEffect(() => {
        setLoading(true)
        const url = `${API_URL}/${ALLCONTACTDETAILS}`;

        axios.post(url, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        }).then(response => response.data)
            .then((data) => {
                setLoading(false)
                setUserRequest({
                    user: data.data.Contacts
                });
                setcontractdetail(data.data.Contacts)
            })

    }, []);
    const { user } = userRequest;
    if (user) {
        setValue('website', user.website);
        setValue('phoneNumber', user.phoneNumber);
        setValue('email', user.email);
        setValue('location', user.location);
        setValue('title', user.title);
        setValue('description', user.description);
    }
    const onSubmit = (values, e) => {
        setLoading(true)
        const url = `${API_URL}/${ADDCONTACTDETAILS}`;
        axios.post(url, {
            website: values.website,
            phoneNumber: values.phoneNumber,
            email: values.email,
            location: values.location,
            title: values.title,
            description: values.description,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((response) => {
               
                if (response.status === 200) {
                    success(toast.success(response.data.message))
                    navigate('/dashboard/contact', { replace: true });
                }
                setLoading(false)
            })

    };
    const onSubmit1 = (values, e) => {
        setLoading(true)
        const url1 = `${API_URL}/${EDITCONTACTDETAILS}`;
        axios.post(url1, {
            id: user[0].id,
            phoneNumber: values.phoneNumber,
            email: values.email,
            website: values.website,
            location: values.location,
            title: values.title,
            description: values.description,
        }, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        })
            .then((response) => {

                if (response.status === 200) {
                    success(toast.success(response.data.message))
                }
                navigate('/dashboard/contact', { replace: true });
                setLoading(false)
            })

    };

    if (!contractdetail) { return false; }

    if (!contractdetail.length) {
        return (
            <>
             {loading && (
               <Loader />
            )}
                <ToastContainer />
                <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">Add Contract Details</Typography>
                    </Box>

                    <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>

                                    <Formik
                                        key="one"
                                        enableReinitialize
                                        initialValues={{
                                            website: "",
                                            phoneNumber: "",
                                            email: "",
                                            location: "",
                                            title: "",
                                            description: "",

                                        }}
                                        validationSchema={Yup.object().shape({
                                            phoneNumber: Yup.string()
                                                .required("phoneNumber  is required"),
                                            email: Yup.string()
                                                .matches(EMAIL, "Enter valid email.")
                                                .required("Email is required"),
                                            website: Yup.string()
                                                .required("website is required")
                                                .matches(URL, "Enter valid url."),
                                            location: Yup.string()
                                                .required("location is required"),
                                            title: Yup.string()
                                                .required("title is required"),
                                            description: Yup.string()
                                                .required("Dser Name is required"),


                                        })}
                                        onSubmit={values => {
                                            onSubmit(values)

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
                                                            <TextField
                                                                label="Website"
                                                                type="text"
                                                                name="website"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Location"
                                                                type="text"
                                                                name="location"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Title"
                                                                type="text"
                                                                name="title"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Description"
                                                                type="text"
                                                                name="description"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
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
    } else {

        return (
            <>
             {loading && (
               <Loader />
            )}
                <ToastContainer />
                <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">Edit Contract Details</Typography>

                    </Box>

                    <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>

                                    <Formik
                                        key="one"
                                        enableReinitialize
                                        initialValues={{
                                            phoneNumber: (user[0] && user[0].phoneNumber) ? user[0].phoneNumber : "",
                                            email: (user[0] && user[0].email) ? user[0].email : "",
                                            website: (user[0] && user[0].website) ? user[0].website : "",
                                            location: (user[0] && user[0].location) ? user[0].location : "",
                                            title: (user[0] && user[0].title) ? user[0].title : "",
                                            description: (user[0] && user[0].description) ? user[0].description : "",

                                        }}
                                        validationSchema={Yup.object().shape({
                                            phoneNumber: Yup.string()
                                                .required("phoneNumber  is required"),
                                            email: Yup.string()
                                                .matches(EMAIL, "Enter valid email.")
                                                .required("Email is required"),
                                            website: Yup.string()
                                                .required("website is required")
                                                .matches(URL, "Enter valid url."),
                                            location: Yup.string()
                                                .required("location is required"),
                                            title: Yup.string()
                                                .required("title is required"),
                                            description: Yup.string()
                                                .required("Dser Name is required"),


                                        })}
                                        onSubmit={values => {
                                            onSubmit1(values)

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
                                                                label="Phone Number"
                                                                type="text"
                                                                name="phoneNumber"
                                                                value={contractdetail.website}
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
                                                            <TextField
                                                                label="Website"
                                                                type="text"
                                                                name="website"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Location"
                                                                type="text"
                                                                name="location"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Title"
                                                                type="text"
                                                                name="title"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Description"
                                                                type="text"
                                                                name="description"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}

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
            </>
        );
    }
}