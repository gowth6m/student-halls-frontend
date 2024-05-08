import { Box, Container, TextField } from "@mui/material";
import React from "react";
import CoreText from "../core/core-text";
import HeroSearch from "./hero-search";

const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundColor: "divider",
            }}
        >
            <Container
                sx={{
                    py: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CoreText textVariant={"subtitle"}>
                    Welcome to the Hero Section
                </CoreText>
                <HeroSearch />
            </Container>
        </Box>
    );
};

export default HeroSection;
