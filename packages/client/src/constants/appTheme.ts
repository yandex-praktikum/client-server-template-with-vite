import { ThemeNames } from "@/store/slices/theme/typings";

export const LIGHT_THEME = {
    name: ThemeNames.Light,
    design: {
        token: {
            colorPrimary: "#73bf43",
            colorLight: "#ece8ae",
            colorLink: "#02bbd7",
            colorSuccess: "#73bf43",
            colorWarning: "#fca048",
            colorError: "#FF4D4F",
            colorText: "rgba(0, 0, 0, 0.75)",
            colorTextSecondary: "rgba(0, 0, 0, 0.45)",
            colorDisabled: "rgba(0, 0, 0, 0.25)",
            borderRadiusBase: "5px",
            boxShadowBase:
                "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
    },
    images: {
        backgroundLong: `url("/assets/images/bkg-long.png")`,
        ground: "/assets/images/base.png",
        clouds: "/assets/images/clouds.png",
        cloudsRotated: "/assets/images/cloudsRotate.png",
    },
};

export const DARK_THEME = {
    name: ThemeNames.Dark,
    design: {
        token: {
            colorPrimary: "#008793",
            colorLight: "#7fc7c3",
            colorLink: "#07656d",
            colorSuccess: "#73bf43",
            colorWarning: "#fca048",
            colorError: "#FF4D4F",
            colorText: "rgba(0, 0, 0, 0.75)",
            colorTextSecondary: "rgba(0, 0, 0, 0.25)",
            colorDisabled: "rgba(0, 0, 0, 0.45)",
            borderRadiusBase: "5px",
            boxShadowBase:
                "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
    },
    images: {
        backgroundLong: `url("/assets/images/bkg-long-dark.png")`,
        ground: "/assets/images/base-dark.png",
        clouds: "/assets/images/clouds-dark.png",
        cloudsRotated: "/assets/images/cloudsRotate-dark.png",
    },
};

export const MAP_NAME_TO_THEME = {
    LIGHT: LIGHT_THEME,
    DARK: DARK_THEME,
};
