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
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { makeStyles } from "@material-ui/styles";
import { API_URL, ADDFRONTSETTING, GETFRONTSETTING, EDITFRONTSETTING, IMG_URL } from "../../Apiconstant/Apiconstant"
// components
import { Link as RouterLink, useNavigate , useLocation} from 'react-router-dom';
import Page from '../../components/Page';
import { Formik, Form } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { TEXT_FIELD, EMAIL, URL, PRICE_NUMBER } from "../../Validation";
import * as Yup from "yup";
import Loader from "../../commocomponent/Loader"

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

export default function Frontendsetting() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const success = () => { }
    const {state}=useLocation();
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
        const url = `${API_URL}/${GETFRONTSETTING}`;

        axios.post(url, {
            headers: {
                'x-token': localStorage.getItem('id_token'),
            }
        }).then(response => response.data)
            .then((data) => {
                setLoading(false)

                setUserRequest({
                    user: data.data.Frontsettings
                });
                setcontractdetail(data.data.Frontsettings)
            })

    }, []);
    const { user } = userRequest;
    if (user) {
        setValue('logoimage', user.logoimage);
        setValue('metadescription', user.metadescription);
        setValue('metakeywords', user.metakeywords);
        setValue('metaauthor', user.metaauthor);
        setValue('websitetitle', user.websitetitle);
        setValue('footertitle', user.footertitle);
        setValue('footercopyright', user.footercopyright);
        setValue('facebook_url', user.facebook_url);
        setValue('instragram_url', user.instragram_url);
        setValue('twitter_url', user.twitter_url);
        setValue('youtube_url', user.youtube_url);
    }
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
        const url1 = `${API_URL}/${ADDFRONTSETTING}`;
        var bodyFormData = new FormData();
        bodyFormData.append("metadescription", values.metadescription);
        bodyFormData.append("metakeywords", values.metakeywords);
        bodyFormData.append("metaauthor", values.metaauthor);
        bodyFormData.append("websitetitle", values.websitetitle);
        bodyFormData.append("footertitle", values.footertitle);
        bodyFormData.append("footercopyright", values.footercopyright);
        bodyFormData.append("facebook_url", values.facebook_url);
        bodyFormData.append("instragram_url", values.instragram_url);
        bodyFormData.append("twitter_url", values.twitter_url);
        bodyFormData.append("youtube_url", values.youtube_url);
        if (vehiclemage.fileList) {
            for (var i = 0; i < vehiclemage.fileList.length; i++) {
                bodyFormData.append("logoimage", vehiclemage.fileList[i].originFileObj);
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
                    // navigate('/dashboard/front-setting', { state: {status:'done'} });
                    window.location.href = '/dashboard/front-setting';

                }
            })

    };
    const onSubmit1 = (values, e) => {
        const url1 = `${API_URL}/${EDITFRONTSETTING}`;
        var bodyFormData = new FormData();
        bodyFormData.append("id", user[0].id);
        bodyFormData.append("metadescription", values.metadescription);
        bodyFormData.append("metakeywords", values.metakeywords);
        bodyFormData.append("metaauthor", values.metaauthor);
        bodyFormData.append("websitetitle", values.websitetitle);
        bodyFormData.append("footertitle", values.footertitle);
        bodyFormData.append("footercopyright", values.footercopyright);
        bodyFormData.append("facebook_url", values.facebook_url);
        bodyFormData.append("instragram_url", values.instragram_url);
        bodyFormData.append("twitter_url", values.twitter_url);
        bodyFormData.append("youtube_url", values.youtube_url);
        if (vehiclemage.fileList) {
            for (var i = 0; i < vehiclemage.fileList.length; i++) {
                bodyFormData.append("logoimage", vehiclemage.fileList[i].originFileObj);
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
                    // navigate('/dashboard/front-setting', { state: {status:'done'} });
                    // window.location.href = '/dashboard/gallery-image';
                    window.location.href = '/dashboard/front-setting';


                }
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
                <Page websitetitle="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">Add Front setting Details</Typography>
                    </Box>

                    <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>

                                    <Formik
                                        key="one"
                                        enableReinitialize
                                        initialValues={{
                                            metadescription: "",
                                            metakeywords: "",
                                            metaauthor: "",
                                            websitetitle: "",
                                            footertitle: "",
                                            footercopyright: "",
                                            facebook_url: "",
                                            instragram_url: "",
                                            twitter_url: "",
                                            youtube_url: "",

                                        }}
                                        validationSchema={Yup.object().shape({
                                            metadescription: Yup.string()
                                                .required("Meta Description  is required"),
                                            metakeywords: Yup.string()
                                                .required("Meta Keywords is required"),
                                            metaauthor: Yup.string()
                                                .required("Meta Author is required"),
                                            websitetitle: Yup.string()
                                                .required("Website Title is required"),
                                            footertitle: Yup.string()
                                                .required("Footer Title is required"),
                                            footercopyright: Yup.string()
                                                .required("Footer Copyright is required"),
                                            facebook_url: Yup.string()
                                                .matches(URL, "Enter valid Facebook Url.")
                                                .required("Facebook Url is required"),
                                            instragram_url: Yup.string()
                                                .required("Instragram Url is required")
                                                .matches(URL, "Enter valid Instragram Url"),
                                            twitter_url: Yup.string()
                                                .matches(URL, "Enter valid Twitter Url.")
                                                .required("Twitter Url is required"),
                                            youtube_url: Yup.string()
                                                .matches(URL, "Enter valid Youtube Url.")
                                                .required("Youtube Url is required"),

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
                                                                label="Meta Description"
                                                                type="text"
                                                                name="metadescription"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Meta Keywords"
                                                                type="text"
                                                                name="metakeywords"
                                                                className="metakeywords1"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Meta Author"
                                                                type="text"
                                                                name="metaauthor"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Website Title"
                                                                type="text"
                                                                name="websitetitle"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Footer Title"
                                                                type="text"
                                                                name="footertitle"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Footer Copyright"
                                                                type="text"
                                                                name="footercopyright"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Facebook Url"
                                                                type="text"
                                                                name="facebook_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Instragram Url"
                                                                type="text"
                                                                name="instragram_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Twitter Url"
                                                                type="text"
                                                                name="twitter_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Youtube Url"
                                                                type="text"
                                                                name="youtube_url"
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
                <ToastContainer />
                <Page websitetitle="Pragati Manav Seva Sansthan (PMSS) Raghogarh">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">Edit Front setting Details</Typography>

                    </Box>

                    <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>

                                    <Formik
                                        key="one"
                                        enableReinitialize
                                        initialValues={{
                                            metadescription: (user[0] && user[0].metadescription) ? user[0].metadescription : "",
                                            metakeywords: (user[0] && user[0].metakeywords) ? user[0].metakeywords : "",
                                            metaauthor: (user[0] && user[0].metaauthor) ? user[0].metaauthor : "",
                                            websitetitle: (user[0] && user[0].websitetitle) ? user[0].websitetitle : "",
                                            footertitle: (user[0] && user[0].footertitle) ? user[0].footertitle : "",
                                            footercopyright: (user[0] && user[0].footercopyright) ? user[0].footercopyright : "",
                                            facebook_url: (user[0] && user[0].facebook_url) ? user[0].facebook_url : "",
                                            instragram_url: (user[0] && user[0].instragram_url) ? user[0].instragram_url : "",
                                            twitter_url: (user[0] && user[0].twitter_url) ? user[0].twitter_url : "",
                                            youtube_url: (user[0] && user[0].youtube_url) ? user[0].youtube_url : "",

                                        }}
                                        validationSchema={Yup.object().shape({
                                            metadescription: Yup.string()
                                                .required("Meta Description  is required"),
                                            metakeywords: Yup.string()
                                                .required("Meta Keywords is required"),
                                            metaauthor: Yup.string()
                                                .required("Meta Author is required"),
                                            websitetitle: Yup.string()
                                                .required("Website Title is required"),
                                            footertitle: Yup.string()
                                                .required("Footer Title is required"),
                                            footercopyright: Yup.string()
                                                .required("Footer Copyright is required"),
                                            facebook_url: Yup.string()
                                                .matches(URL, "Enter valid Facebook Url.")
                                                .required("Facebook Url is required"),
                                            instragram_url: Yup.string()
                                                .required("Instragram Url is required")
                                                .matches(URL, "Enter valid Instragram Url"),
                                            twitter_url: Yup.string()
                                                .matches(URL, "Enter valid Twitter Url.")
                                                .required("Twitter Url is required"),
                                            youtube_url: Yup.string()
                                                .matches(URL, "Enter valid Youtube Url.")
                                                .required("Youtube Url is required"),
                                            })}
                                        onSubmit={values => {
                                            onSubmit1(values)
                                            console.log(values.user[0].logoimage)

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
                                                                label="Meta Description"
                                                                type="text"
                                                                name="metadescription"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Meta Keywords"
                                                                type="text"
                                                                name="metakeywords"
                                                                className="metakeywords1"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Meta Author"
                                                                type="text"
                                                                name="metaauthor"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Website Title"
                                                                type="text"
                                                                name="websitetitle"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Footer Title"
                                                                type="text"
                                                                name="footertitle"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Footer Copyright"
                                                                type="text"
                                                                name="footercopyright"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Facebook Url"
                                                                type="text"
                                                                name="facebook_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Instragram Url"
                                                                type="text"
                                                                name="instragram_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Twitter Url"
                                                                type="text"
                                                                name="twitter_url"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Youtube Url"
                                                                type="text"
                                                                name="youtube_url"
                                                            />
                                                        </Grid>
                                                        <div className={classes.edit}>
                                                            <div className="avatar-upload">
                                                                <div className={classes.avatarpreview}>
                                                                    {vehiclemage == "notset" &&
                                                                        user &&
                                                                        user[0].logoimage ? (
                                                                        <img
                                                                            src={
                                                                                "" +
                                                                                IMG_URL +
                                                                                "" +
                                                                                user[0].logoimage +
                                                                                ""
                                                                            }
                                                                            className=""
                                                                            alt="user image"
                                                                            width="220"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            id="imagePreview"
                                                                            style={{
                                                                                backgroundImage: "url(" + vehiclemage + ")",
                                                                            }}
                                                                        ></div>
                                                                    )}
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