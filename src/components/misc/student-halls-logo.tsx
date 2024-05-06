import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const StudentHallsLogo = () => {
    return (
        <Box display={"flex"} alignItems={"center"}>
            <CardMedia
                component="img"
                image={"/logo.svg"}
                alt="Student Halls Logo"
                sx={{
                    width: 40,
                    height: 40,
                    display: "inline",
                    marginRight: 1,
                }}
            />
            <Typography variant="h5" display={"inline"} color={"primary.main"}>
                Student
            </Typography>
            <Typography
                variant="h5"
                display={"inline"}
                color={"secondary.dark"}
            >
                Halls
            </Typography>
        </Box>
    );
};

export default StudentHallsLogo;
