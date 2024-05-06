import {
    ThemeOptions,
    createTheme,
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
    GlobalStyles,
    css,
} from "@mui/material";
import { useMemo } from "react";
import { palette } from "./customs/palette";
import { customShadows } from "./customs/custom-shadows";
import { typography } from "./customs/typography";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useAppSettingStore } from "@/stores/app-settings-store";
import { componentsOverrides } from "./overrides";
import { merge } from "lodash";

type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
    const { themeMode } = useAppSettingStore();

    const memoizedValue = useMemo(
        () =>
            ({
                palette: {
                    ...palette(themeMode),
                },
                customShadows: {
                    ...customShadows(themeMode),
                },
                shape: { borderRadius: 8 },
                typography: typography,
            } as ThemeOptions),
        [themeMode]
    );

    const themeObj = createTheme(memoizedValue);
    themeObj.components = merge(componentsOverrides(themeObj));

    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
            <MuiThemeProvider theme={themeObj}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </NextThemeProvider>
    );
}
