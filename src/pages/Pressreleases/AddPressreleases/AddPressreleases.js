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
import { API_URL, ADDPRESSRELEASES } from "../../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Select from "react-select";
import Page from '../../../components/Page';
import { Formik, Form } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload } from "antd";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { CustomSelect } from '../../../commocomponent/FormFields';

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    submit: {
        top: "17px"
    },
    avatarpreview: {
        width: "136px",
        height: "131px"
    },
    svg: {
        display: "noneimportant"
    }
}))

export default function AddPressreleases() {
    const [replymsg, setreplymsg] = useState('');
    ClassicEditor.defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                '|',
                'link',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'insertTable',
                '|',
                'undo',
                'redo'
            ]
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        language: 'en'
    };
    const navigate = useNavigate();
    const success = () => { }
    const classes = useStyles();
    const [userRequest, setUserRequest] = useState([]);
    const [vehiclemage, setVehiclemage] = useState("notset");


    const onChange = ({ fileList }) => {
        setVehiclemage({ fileList });
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [image, SetImage] = useState("notset");

    var resultdiv = {
        display: "flex",
    };

    const renderPhotos = (source) => {
        return source.map((photo) => {
            SetImage(photo);
            return <></>;
        });
    };

    const onSubmit = (values, e) => {
        const url1 = `${API_URL}/${ADDPRESSRELEASES}`;
        var bodyFormData = new FormData();
        bodyFormData.append("title", values.title);
        bodyFormData.append("shortdescription", values.shortdescription);
        bodyFormData.append("longdescription", replymsg);
        bodyFormData.append("posttype", values.posttype);

        if (vehiclemage.fileList) {
            for (var i = 0; i < vehiclemage.fileList.length; i++) {
                bodyFormData.append("Pressreleasesimage", vehiclemage.fileList[i].originFileObj);
            }
        }
        axios
            .post(url1, bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
            .then((response) => {

                if (response.status === 200) {
                    success(toast.success(response.data.message))
                    navigate('/dashboard/press-releases', { replace: true });
                }
            })

    };
    return (
        <>
            <ToastContainer />
            <Page title="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Add Press Releases</Typography>
                </Box>

                <Card className={classes.root} variant="outlined">

                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                <Formik
                                    key="one"
                                    enableReinitialize
                                    initialValues={{
                                        title: "",
                                        shortdescription: "",
                                        longdescription: "",
                                    }}
                                    validationSchema={Yup.object().shape({

                                        shortdescription: Yup.string()
                                            .required("User Name is required"),
                                        title: Yup.string()
                                            .required("User Name is required")
                                    })}

                                    onSubmit={values => {
                                        onSubmit(values)
                                        console.log(values)
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
                                                            label="Title"
                                                            type="text"
                                                            name="title"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Short Description"
                                                            type="text"
                                                            name="shortdescription"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data="<p>Hello from CKEditor 5!</p>"

                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setreplymsg(data);
                                                                console.log({ event, editor, data });
                                                            }}
                                                            onBlur={(event, editor) => {
                                                                console.log('Blur.', editor);
                                                            }}
                                                            onFocus={(event, editor) => {
                                                                console.log('Focus.', editor);
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <div className={classes.edit}>
                                                            <div className="avatar-upload">
                                                                <div className={classes.avatarpreview}>

                                                                </div>
                                                                <div
                                                                    className="result"
                                                                    style={resultdiv}
                                                                    id="file-image"
                                                                >
                                                                    {renderPhotos(selectedFiles)}
                                                                </div>
                                                                <div>
                                                                    <Upload
                                                                        name="choosephoto"
                                                                        listType="picture-card"
                                                                        onChange={onChange}
                                                                        onPreview={onPreview}
                                                                    >
                                                                        {"Upload"}
                                                                    </Upload>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <label for="select">Select File type *</label>
                                                        <CustomSelect
                                                            name="posttype"
                                                            children={[{ "value": "withimg", "label": "withimg" }, { "value": "withvedio", "label": "withvedio" }]}
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
}
