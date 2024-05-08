"use client";

import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import CoreIcon from "../core/core-icon";

const HeroSearch = () => {
    return (
        <TextField
            placeholder="Type to search"
            variant="outlined"
            // value={searchInput}
            // onChange={handleSearchOnChange}
            sx={{
                my: 2,
                width: {
                    xs: "100%",
                    sm: "70%",
                    md: "50%",
                    lg: "30%",
                    xl: "30%",
                },
                borderRadius: 30,
            }}
            InputProps={{
                style: {
                    borderRadius: 30,
                    borderStyle: "dashed",
                    outline: "none",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <CoreIcon.MagnifyingGlass />
                    </InputAdornment>
                ),
                autoComplete: "off",
            }}
        />
    );
};

export default HeroSearch;
