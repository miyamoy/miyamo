import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
    author: "miyamo",
    date: {
        locale: "ja-JP",
        options: {
            day: "numeric",
            month: "short",
            year: "numeric"
        },
    },
    description: "miyamo",
    lang: "ja",
    ogLocale: "ja_JP",
    sortPostsByUpdatedDate: true,
    title: "miyamo",
};

export const menuLinks: { path: string, title: string }[] = [
    {
        path: "/",
        title: "Home",
    },
    {
        path: "/about/",
        title: "About",
    },
    {
        path: "posts",
        title: "Blog",
    },
];

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
    styleOverrides: {
        borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		uiLineHeight: "inherit",
    },
    themeCssSelector(theme, { styleVariants }) {
        if (styleVariants.length >= 2) {
            const baseTheme = styleVariants[0]?.theme;
            const altTheme  = styleVariants.find((v) => v.theme.type != baseTheme?.type)?.theme;
            if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`; 
        }
        return `[data-theme='${theme.type}']`;
    },
    themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
}