import { Box } from "@mui/material";
import React from "react";
import CoreLoader from "../core/core-loader";
import LoadingTopbar from "../core/loading-topbar";

const LoadingPage = () => {
    return (
        <Box>
            <LoadingTopbar />
            <CoreLoader />
        </Box>
    );
};

export default LoadingPage;
