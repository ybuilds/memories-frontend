import React, { useState } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts.js"; 

const Form = () => {
    const style = useStyles();
    const [postData, setPostData] = useState({creator: "", title: "", message: "", tags: "", selectedFile: ""});
    const dispatch = useDispatch();

    const convertToB64 = (file) => {
        if(!file)
            return;

        const reader = new FileReader();

        reader.onload = () => {
            setPostData((prev) => ({
                ...prev,
                selectedFile: reader.result
            }));
        };

        reader.onerror = (err) => {
            console.log(err.message);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        console.log("Submitting memory...", postData);
        event.preventDefault();
        dispatch(createPost(postData));
    };

    const clear = () => {
        
    };
    
    return(
        <Paper className={style.paper}>
            <form autoComplete="off" noValidate className={`${style.root} ${style.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Create a memory</Typography>
                
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event) => setPostData({...postData, creator: event.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => setPostData({...postData, title: event.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => setPostData({...postData, message: event.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event) => setPostData({...postData, tags: event.target.value})}/>
                <div className={style.fileInput}>
                    <input type="file" accept="image/*" onChange={(event) => convertToB64(event.target.files[0])}/>
                </div>
                <Button className={style.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="error" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;