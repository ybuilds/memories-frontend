import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts.js";

const App = () => {
    const style = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={style.appBar} position="static" color="inherit">
                <Typography className={style.heading} variant="h2">Memories</Typography>
                <img className={style.image} src={memories} alt="memories logo" height={60} />
            </AppBar>

            <Grow in>
                <Container>
                    <Grid container sx={{justifyContent:"space-between", alignItems:"stretch"}} spacing={3}>
                        <Grid size={{xs: 12, sm: 7}}>
                            <Posts />
                        </Grid>
                        <Grid size={{xs: 12, sm: 4}}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;