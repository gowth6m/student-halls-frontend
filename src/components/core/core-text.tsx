import React from "react";
import { Typography, TypographyProps, useTheme } from "@mui/material";

interface CoreTextProps
    extends Omit<TypographyProps, "variant" | "fontWeight"> {
    textVariant:
        | "display"
        | "title"
        | "subtitle"
        | "subtitle2"
        | "body"
        | "caption";
    textStyle?: "normal" | "gradient";
    fontWeightOverride?: TypographyProps["fontWeight"];
    fontSizeOverride?: number;
}

type VariantMapping = {
    [key in CoreTextProps["textVariant"]]: {
        variant?: TypographyProps["variant"];
        fontWeight: TypographyProps["fontWeight"];
        fontSize?: number;
    };
};

const variantMapping: VariantMapping = {
    display: { variant: "h2", fontWeight: 900 },
    title: { variant: "h4", fontWeight: 900 },
    subtitle: { fontWeight: 600, fontSize: 30 },
    subtitle2: { fontWeight: 600, fontSize: 20 },
    body: { variant: "body2", fontWeight: 400 },
    caption: { variant: "caption", fontWeight: 300 },
};

const CoreText: React.FC<CoreTextProps> = ({
    textVariant = "body",
    textStyle = "normal",
    children,
    fontWeightOverride,
    fontSizeOverride,
    ...props
}) => {
    const { variant, fontWeight, fontSize } = variantMapping[textVariant];
    const effectiveFontWeight = fontWeightOverride || fontWeight;
    const theme = useTheme();

    if (textStyle === "gradient") {
        return (
            <Typography
                variant={variant}
                fontWeight={effectiveFontWeight}
                fontSize={fontSizeOverride ?? fontSize}
                sx={{
                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                {...props}
            >
                {children}
            </Typography>
        );
    }

    return (
        <Typography
            variant={variant}
            fontWeight={effectiveFontWeight}
            fontSize={fontSizeOverride ?? fontSize}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default CoreText;
