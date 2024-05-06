import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {
    buttonVariant: "primary" | "secondary" | "tertiary";
    children?: React.ReactNode;
    variant?: "contained" | "outlined" | "text";
    fixedWidth?: boolean;
}

const CoreButton: React.FC<Props> = ({
    children,
    variant = "outlined",
    fixedWidth = false,
    ...props
}) => {
    const styles = {
        boxShadow: "none !important",
        width: fixedWidth ? 300 : "auto",
    };

    switch (props.buttonVariant) {
        case "primary":
            variant = "contained";
            break;
        case "secondary":
            variant = "outlined";
            break;
        case "tertiary":
            variant = "text";
            break;
        default:
            variant = "outlined";
    }

    return (
        <Button
            variant={variant}
            disableElevation
            sx={{
                ...styles,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CoreButton;
