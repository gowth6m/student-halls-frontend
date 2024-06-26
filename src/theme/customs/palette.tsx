import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";

declare module "@mui/material/styles/createPalette" {
    interface TypeBackground {
        neutral: string;
    }
    interface SimplePaletteColorOptions {
        lighter: string;
        darker: string;
    }
    interface PaletteColor {
        lighter: string;
        darker: string;
    }
}

// SETUP COLORS

export const grey = {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
};

export const primary = {
    lighter: "#FCC5CC",
    light: "#F88C99",
    main: "#F56476",
    dark: "#F22C43",
    darker: "#D30D25",
    contrastText: "#F8F8F8",
};

export const secondary = {
    lighter: "#F9F2F1",
    light: "#EDD9D4",
    main: "#DFBBB1",
    dark: "#D6A79A",
    darker: "#CA8D7D",
    contrastText: "#212B36",
};

export const info = {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#00B8D9",
    dark: "#006C9C",
    darker: "#003768",
    contrastText: "#FFFFFF",
};

export const success = {
    lighter: "#D3FCD2",
    light: "#77ED8B",
    main: "#22C55E",
    dark: "#118D57",
    darker: "#065E49",
    contrastText: "#ffffff",
};

export const warning = {
    lighter: "#FFF5CC",
    light: "#FFD666",
    main: "#FFAB00",
    dark: "#B76E00",
    darker: "#7A4100",
    contrastText: grey[800],
};

export const error = {
    lighter: "#FFE9D5",
    light: "#FFAC82",
    main: "#FF5630",
    dark: "#B71D18",
    darker: "#7A0916",
    contrastText: "#FFFFFF",
};

export const common = {
    black: "#000000",
    white: "#F8F8F8",
};

export const action = {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.5),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
};

const base = {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    grey,
    common,
    divider: alpha(grey[500], 0.3),
    action,
};

// ----------------------------------------------------------------------

export function palette(mode: "light" | "dark") {
    const light = {
        ...base,
        mode: "light",
        text: {
            primary: grey[800],
            secondary: grey[600],
            disabled: grey[500],
        },
        background: {
            paper: grey[200],
            default: grey[200],
            neutral: alpha(grey[500], 0.12),
        },
        action: {
            ...base.action,
            active: grey[600],
        },
    };

    const dark = {
        ...base,
        mode: "dark",
        text: {
            primary: "#FFFFFF",
            secondary: grey[500],
            disabled: grey[600],
        },
        background: {
            paper: grey[800],
            default: grey[800],
            neutral: alpha(grey[500], 0.12),
        },
        action: {
            ...base.action,
            active: grey[500],
        },
    };

    return mode === "light" ? light : dark;
}
