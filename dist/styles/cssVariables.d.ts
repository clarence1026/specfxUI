/**
 * CSS变量的TypeScript接口
 * 提供在JavaScript/TypeScript中使用CSS变量的便捷方式
 */
/**
 * CSS变量的TypeScript接口
 * 可以在JavaScript/TypeScript中直接使用
 *
 * 示例:
 * import { cssVariables } from 'speccapitals-common/styles';
 *
 * const style = {
 *   color: cssVariables.colors.primary,
 *   padding: cssVariables.spacing.md,
 *   borderRadius: cssVariables.border.radius.default,
 * };
 */
export declare const cssVariables: {
    colors: {
        primary: string;
        secondary: string;
        success: string;
        warning: string;
        error: string;
        info: string;
        white: string;
        black: string;
        gray: {
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        background: {
            default: string;
            light: string;
            dark: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
        };
        border: {
            default: string;
            light: string;
            dark: string;
        };
    };
    spacing: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    font: {
        family: string;
        size: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        lineHeight: {
            tight: string;
            normal: string;
            loose: string;
        };
    };
    border: {
        width: string;
        style: string;
        radius: {
            sm: string;
            default: string;
            lg: string;
            xl: string;
            circle: string;
        };
    };
    shadow: {
        sm: string;
        default: string;
        md: string;
        lg: string;
        xl: string;
    };
    transition: {
        fast: string;
        default: string;
        slow: string;
        timing: string;
    };
    zIndex: {
        negative: string;
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        auto: string;
        dropdown: string;
        sticky: string;
        fixed: string;
        modal: string;
        popover: string;
        tooltip: string;
    };
    grid: {
        columns: string;
        gutter: string;
    };
    screens: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    components: {
        button: {
            height: {
                sm: string;
                default: string;
                lg: string;
            };
        };
        input: {
            height: {
                sm: string;
                default: string;
                lg: string;
            };
        };
        table: {
            headerBg: string;
            rowHoverBg: string;
        };
        modal: {
            headerPadding: string;
            bodyPadding: string;
            footerPadding: string;
        };
    };
};
export default cssVariables;
