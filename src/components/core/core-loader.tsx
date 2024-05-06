import { CircularProgress, Stack, SxProps } from "@mui/material";
import React from "react";

type Props = {
    size?: number;
    color?: "primary" | "secondary";
    sx?: SxProps;
};

const CoreLoader: React.FC<Props> = ({ size = 48, color, sx }) => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: "100%",
                height: "100%",
                ...sx,
            }}
        >
            <CircularProgress
                size={size}
                color={color}
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </Stack>
    );
};

export default CoreLoader;
