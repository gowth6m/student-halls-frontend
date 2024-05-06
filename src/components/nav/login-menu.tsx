import { useAuth } from "@/context/auth-provider";
import {
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    SxProps,
} from "@mui/material";
import React, { useState } from "react";
import CoreIcon from "../core/core-icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppSettingStore } from "@/stores/app-settings-store";

interface Props {
    sx?: SxProps;
}

const LoginMenu: React.FC<Props> = ({ sx, ...otherProps }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();
    const { toggleTheme, themeMode } = useAppSettingStore();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Login">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "login-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={sx}
                    {...otherProps}
                >
                    {user?.userImg ? (
                        <Avatar
                            src={user?.userImg}
                            sx={{ width: 28, height: 28 }}
                        />
                    ) : (
                        <CoreIcon.UserCircle size={28} />
                    )}
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                elevation={0}
                PaperProps={{
                    sx: {
                        overflow: "visible",
                        width: 250,
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={() => {
                        router.push(`${pathname}?view=login`);
                    }}
                >
                    <ListItemIcon>
                        <CoreIcon.SignOut size={24} />
                    </ListItemIcon>
                    Login
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        router.push(`${pathname}?view=register`);
                    }}
                >
                    <ListItemIcon>
                        <CoreIcon.UserPlus size={24} />
                    </ListItemIcon>
                    Register
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        toggleTheme();
                    }}
                >
                    <ListItemIcon>
                        {themeMode === "dark" ? (
                            <CoreIcon.Sun size={24} />
                        ) : (
                            <CoreIcon.Moon size={24} />
                        )}
                    </ListItemIcon>
                    {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
                </MenuItem>
            </Menu>
        </>
    );
};
export default LoginMenu;
