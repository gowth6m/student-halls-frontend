import { Stack, StackProps, SxProps } from "@mui/material";
import React from "react";

interface Props extends StackProps {
    children?: React.ReactNode;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    mobileDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    gap?: number;
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "flex-start" | "center" | "flex-end";
    paddingX?: number;
    paddingY?: number;
    sx?: SxProps;
    ref?: React.RefObject<HTMLDivElement>;
}

const Row: React.FC<Props> = ({
    children,
    mobileDirection = "row",
    gap = 2,
    justifyContent = "flex-start",
    alignItems = "flex-start",
    paddingX = 0,
    paddingY = 0,
    flexDirection = "row",
    sx,
    ref,
    ...otherProps
}) => {
    return (
        <Stack
            sx={{
                flexDirection: {
                    xs: mobileDirection,
                    sm: flexDirection,
                    md: flexDirection,
                },
                gap: gap,
                justifyContent: justifyContent,
                alignItems: alignItems,
                width: "100%",
                paddingX: paddingX,
                paddingY: paddingY,
                ...sx,
            }}
            ref={ref}
            {...otherProps}
        >
            {children}
        </Stack>
    );
};

export default Row;
