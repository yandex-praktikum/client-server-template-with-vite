import { ThemeConfig } from "antd/lib/config-provider/context";

export enum ThemeNames {
    Dark = "DARK",
    Light = "LIGHT",
}

export type DesignConfig = ThemeConfig & {
    token: { colorLight: string; colorLink: string };
};

export type ThemeObject = {
    design: DesignConfig;
    name: ThemeNames;
    images: Record<string, string>;
    components?: Record<string, Record<string, string>>;
};
