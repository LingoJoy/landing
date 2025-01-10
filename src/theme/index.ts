import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const {
  success,
  successTextColor,
  mainBlack,
  warningBgColor,
  warningTextColor,
  mainBorder,
  mainBlue,
  whiteColor,
} = colors;

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    empty: true;
    main: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    cardHeader?: React.CSSProperties;
    cardSubtitle?: React.CSSProperties;
    cardText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    cardHeader: true;
    cardSubtitle: true;
    cardText: true;
  }
}

const baselightTheme = createTheme({
  palette: {
    primary: {
      main: "#6472ff",
      light: "#ECF2FF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#ffffff",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: success,
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: successTextColor,
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: mainBlack,
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: "2.25rem",
      lineHeight: "3.75rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      color: "#ffffff",
      textTransform: "capitalize",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "14px",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: "1.35rem",
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
    cardHeader: {
      fontSize: "10px",
      fontWeight: 700,
      lineHeight: "20px",
      letterSpacing: "-0.5px",
    },
    cardSubtitle: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "18px",
      letterSpacing: "-0.5px",
    },
    cardText: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: "-0.5px",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Inter', sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: "auto",
          borderRadius: "30px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          margin: "16px",
          width: "100%",
          maxWidth: "425px",
          boxSizing: "border-box",
          "@media (max-width: 425px)": {
            borderRadius: "0px",
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: "30px",
            border: `1px solid #E0E0E0`,
            maxWidth: "351px",
            boxSizing: "border-box",
            "@media (max-width: 425px)": {
              width: "calc(100% - 32px)",
            },
          },
        },
      ],
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: "contain",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          "&:last-child": {
            paddingBottom: "0px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          maxHeight: "3.125rem",
          width: "auto",
          height: "auto",
          padding: "0.75rem",
          borderRadius: "2rem",
          textAlign: "center",
          border: "none",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background-color 0.3s",
          textTransform: "capitalize",
          display: "inline-block",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            border: "2px solid #1976d2",
          },
        },
        {
          props: { color: "primary" },
          style: {
            backgroundColor: mainBlue,
            color: whiteColor,
            "&:disabled": {
              cursor: "not-allowed",
              backgroundColor: mainBorder,
              color: whiteColor,
            },
            "&:hover": {
              backgroundColor: mainBlue,
            },
          },
        },
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: "#0a66c2",
            "&:hover": {
              backgroundColor: "#16437e",
            },
            "&:disabled": {
              cursor: "not-allowed",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              color: "rgba(0, 0, 0, 0.3)",
            },
          },
        },
        {
          props: { variant: "main" },
          style: {
            minWidth: "300px",
            backgroundColor: mainBlue,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: mainBlue,
            },
          },
        },
        {
          props: { variant: "empty" },
          style: {
            backgroundColor: whiteColor,
            color: mainBlack,
            width: "auto",
            minWidth: "32px",
            p: 0,

            display: "inline-block",
            border: `0.5px solid ${mainBorder}`,
            "&:hover": {
              backgroundColor: whiteColor,
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.wrapped": {
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${mainBorder}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.main",
            "& svg": {
              width: 15,
              height: 15,
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: "8px",
          alignItems: "center",
          borderRadius: "24px",
          maxHeight: 65,
          "& .MuiAlert-icon": {
            marginRight: 14,
            marginLeft: 8,
          },
          "& .MuiAlert-action": {
            padding: "0px",
          },
          "& .MuiAlert-message": {
            width: "100%",
          },
        },
        standardSuccess: {
          color: successTextColor,
          backgroundColor: success,
        },
        standardWarning: {
          color: warningTextColor,
          backgroundColor: warningBgColor,
        },
      },
    },
  },
});

export { baselightTheme };
