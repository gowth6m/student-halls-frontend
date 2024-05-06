"use client";

import { AppBar, Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
import NavBarWrapper from "./nav-bar-wrapper";
import StudentHallsLogo from "../misc/student-halls-logo";
import UserMenu from "./user-menu";
import { useAuth } from "@/context/auth-provider";
import LoginMenu from "./login-menu";

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
    const { user } = useAuth();

    return (
        <NavBarWrapper>
            {/* Logo */}
            <StudentHallsLogo />

            {/* Nav links */}

            {/* Search */}
            {/* <TextField size="small" /> */}

            {/* User */}
            {user ? <UserMenu /> : <LoginMenu />}
        </NavBarWrapper>
    );
};

export default NavBar;
