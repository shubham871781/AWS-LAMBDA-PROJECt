import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    RadioGroup, TextField, UploadFile
} from "../../../commocomponent/FormFields";
import { Input } from 'reactstrap';
import { TEXT_FIELD, EMAIL, PHONEREG, PRICE_NUMBER } from "../../../Validation";
import * as Yup from "yup";
import Select from "react-select";

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
import { API_URL, ADDANNUALREPORT } from "../../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Page from '../../../components/Page';
import { Formik, Form } from "formik";
import { IMAGE } from "../../../Validation/index"
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

export default function AddAnnualReports() {
    const navigate = useNavigate();
    const classes = useStyles();
    const success = () => { }
    const url = `${API_URL}/${ADDANNUALREPORT}`;
    const [driverimgstate, setDriverimgstate] = useState();


    const [selectedFiles, setSelectedFiles] = useState([]);


    const [image, SetImage] = useState(false)
    const [loading, setLoading] = useState(false);
    const [vehicleimageerror, setVehicleimageerror] = useState(false);

    function next() {
        if (!image) {
            setVehicleimageerror(true);
            return false;
        } else {
            setVehicleimageerror(false);
        }
    }
    function onFileChange(event) {
        setDriverimgstate(event);
        return event;
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setDriverimgstate(e.target.files[0]);
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedFiles((prevImages) =>
                prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) =>
                    URL.revokeObjectURL(file)
            );
        }
    }

    const renderPhotos = (source) => {
        return source.map((annual_reports) => {
            SetImage(annual_reports);
            return <></>
                ;
        });
    };
    const [selected, setSelected] = useState([]);
    const [lables1, setlables] = useState([]);
    let minOffset = 0, maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    let lablearray = [];
    for (let x = 0; x <= maxOffset; x++) {
        lablearray.push({ 'label': thisYear - x , 'value': thisYear - x })
    }
    setlables(lablearray);
      function onSubmit(values) {
        const token = localStorage.getItem("token");
        var bodyFormData = new FormData();
        bodyFormData.append('year', selected.value);
        bodyFormData.append('annual_reports', driverimgstate);
        setLoading(true);

        axios.post(url, bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

            .then((response) => {
                setLoading(false);

                if (response.data.status == '200') {
                    success(toast.success(response.data.message))

                }
            }, (error) => {
            });



    }

    return (
        <>
            <ToastContainer />
            <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Add Annual report</Typography>
                </Box>

                <Card className={classes.root} variant="outlined">

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                <Formik
                                    key="one"
                                    enableReinitialize
                                    initialValues={{
                                        year: "",
                                        file: ""

                                    }}
                                    validationSchema={Yup.object().shape({
                                      


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
                                                    <Grid item xs={12} sm={6}>
                                                        <Select
                                                            options={lables1}
                                                            onChange={setSelected}
                                                            value={selected}
                                                            selected={selected}
                                                            placeholder="Select YEAR"
                                                        />
                                                    </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>

                                                        <Input type="file" id="file" multiple onChange={handleImageChange} accept="application/pdf" className="btn btn-primary" hidden />
                                                        <UploadFile handleChange={onFileChange} name="file" id="file" variant="button" buttonColor="#fb0" buttonText="Upload PDF" onChange={handleImageChange} setFieldValue={setFieldValue}>

                                                        </UploadFile>
                                                        {(vehicleimageerror) ? <div style={{ color: "red" }}>This is required</div> : ''}

                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                    onClick={next}
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
