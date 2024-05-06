"use client";

import Column from "@/components/core/column";
import CoreIcon from "@/components/core/core-icon";
import CoreText from "@/components/core/core-text";
import { useAuth } from "@/context/auth-provider";
import { useAppSettingStore } from "@/stores/app-settings-store";
import { capitalizeFirstLetter } from "@/utils/format";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    SxProps,
    Tooltip,
} from "@mui/material";
import { useState } from "react";

// ----------------------------------------------------------------------

interface Props {
    sx?: SxProps;
}

const UserMenu: React.FC<Props> = ({ sx, ...otherProps }) => {
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
            <Tooltip title="User Profile">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "profile-menu" : undefined}
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
                <MenuItem>
                    <Column gap={0}>
                        <CoreText
                            textVariant={"body"}
                            fontSizeOverride={16}
                            fontWeightOverride={700}
                            maxWidth={200}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            display={user?.username ? "block" : "none"}
                        >
                            {capitalizeFirstLetter(user?.firstName)}{" "}
                            {capitalizeFirstLetter(user?.lastName)}
                        </CoreText>
                        <CoreText
                            textVariant={"body"}
                            fontSizeOverride={14}
                            maxWidth={200}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            display={user?.email ? "block" : "none"}
                        >
                            {user?.email}
                        </CoreText>
                    </Column>
                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={() => {
                        logout();
                    }}
                >
                    <ListItemIcon>
                        <CoreIcon.SignOut size={24} />
                    </ListItemIcon>
                    Logout
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

export default UserMenu;
