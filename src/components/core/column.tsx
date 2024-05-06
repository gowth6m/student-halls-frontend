import { Stack, StackProps, SxProps } from "@mui/material";
import React from "react";

interface Props extends StackProps {
    children?: React.ReactNode;
    mobileDirection?: "row" | "column";
    gap?: number;
    justifyContent?: "flex-start" | "center" | "flex-end";
    alignItems?: "flex-start" | "center" | "flex-end";
    width?: string | number;
    height?: string | number;
    sx?: SxProps;
    ref?: React.RefObject<HTMLDivElement>;
}

const Column: React.FC<Props> = ({
    children,
    mobileDirection = "column",
    gap = 2,
    justifyContent = "flex-start",
    alignItems = "flex-start",
    width = "100%",
    height,
    sx,
    ref,
    ...otherProps
}) => {
    return (
        <Stack
            sx={{
                boxSizing: "border-box",
                flexDirection: {
                    xs: mobileDirection,
                    md: "column",
                },
                gap: gap,
                justifyContent: justifyContent,
                alignItems: alignItems,
                width: width,
                height: height,
                ...sx,
            }}
            ref={ref}
            {...otherProps}
        >
            {children}
        </Stack>
    );
};

export default Column;
