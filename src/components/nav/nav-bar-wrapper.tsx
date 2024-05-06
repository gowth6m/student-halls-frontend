import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";

interface Props {
    children?: React.ReactNode;
}

const NavBarWrapper: React.FC<Props> = ({ children }) => {
    return (
        <>
            <AppBar
                sx={{
                    outline: "none",
                    boxShadow: 0,
                    backgroundColor: "background.paper",
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "100%",
                        px: 2,
                    }}
                >
                    {children}
                </Toolbar>
            </AppBar>

            {/* Invisible height for appbar */}
            <Box
                sx={{
                    height: {
                        xs: 64,
                        md: 64,
                    },
                }}
            />
        </>
    );
};

export default NavBarWrapper;
