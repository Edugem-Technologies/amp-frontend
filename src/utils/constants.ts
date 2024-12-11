import { CSSObjectWithLabel } from "react-select"

export const API_VERSION = "api/v1"

export const BASE_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/${API_VERSION}`
export const CONFIG = {
    AUTH: {
        COOKIE_NAME: "__AT__",
    },
    LOCAL_STORAGE_VARIABLES: {
        USER__UUID: "user_uuid",
        COOKIE_CHOICE: "cookie_choice",
        ACCESS_TOKEN: "access_token",
    },
    MESSAGES: {
        INVALID_LOGIN_CREDENTIALS: "Invalid email or password",
        ACCESS_TOKEN_EXPIRED: "Access token expired. Please login again",
        USER_EMAIL_VERIFIED: "Email verified successfully",
        USER_LOGIN_SUCCESS: "Great to see you!",
        OTP_RESENT_SUCCESS: "OTP sent successfully",
        OTP_RESENT_FAIL: "Unable to send OTP",
        INVALID_OTP: "Invalid OTP",
        GENERIC_ERROR: "Something went wrong",
        FORM_SUBMITTED_SUCCESS: "Form submitted successfully",
        PASSWORD_RESET_SUCCESS: "Password reset successfully. Please login",
        PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
        PASSWORS_SET_SUCCESS: "Password has been set successfully. Please login",
        UNABLE_TO_LOAD_DATA: "Unable to load data",
        USER_EMAIL_UPDATE_SUCCESS: "User email updated successfully. Please login again",
    },
    DEFAULT_MESSAGES: {
        TOKEN_EXPIRED: "Token expired. Please login again",
    },
    TOASTER_OPTIONS: {
        SUCCESS: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
                background: "#14e4ea",
                color: "#fff",
            },
        },
        ERROR: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
                background: "#CD0000",
                color: "#fff",
            },
        },
        HOLD: {
            duration: 6000,
            style: {
                maxWidth: 450,
                borderRadius: "10px",
                background: "#FFFF00",
                color: "#000",
            },
        },
    },
    DROPDOWN_STYLE: {
        menu: (base: CSSObjectWithLabel) => ({ ...base, zIndex: "9" }),
        valueContainer: (base: CSSObjectWithLabel) => ({
            ...base,
            maxHeight: "37px",
            overflow: "auto",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "#5e6278",
            fontWeight: 500,
            fontSize: "14px",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        option: (base: CSSObjectWithLabel, state: any) => ({
            ...base,
            color:
                state.isDisabled && state.isSelected
                    ? "#fff"
                    : state.isDisabled
                      ? "#808080"
                      : state.isSelected
                        ? "#fff"
                        : "#242565",
            ":hover": { backgroundColor: state.isSelected ? "#242565" : "#DEEBFF" },
            backgroundColor: state.isSelected ? "#242565" : "none",
        }),
    },
    COGNITO_CHALLENGE_NAME: {
        CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE: "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE",
        CONTINUE_SIGN_IN_WITH_MFA_SELECTION: "CONTINUE_SIGN_IN_WITH_MFA_SELECTION",
        CONFIRM_SIGN_IN_WITH_SMS_CODE: "CONFIRM_SIGN_IN_WITH_SMS_CODE",
        CONFIRM_SIGN_IN_WITH_TOTP_CODE: "CONFIRM_SIGN_IN_WITH_TOTP_CODE",
        CONTINUE_SIGN_IN_WITH_TOTP_SETUP: "CONTINUE_SIGN_IN_WITH_TOTP_SETUP",
        CONFIRM_SIGN_UP: "CONFIRM_SIGN_UP",
        RESET_PASSWORD: "RESET_PASSWORD",
        DONE: "DONE",
        CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED: "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
    },
    COGNITO_AUTH_PROVIDERS: {
        // this type assertion is required for login provider to work with typescript
        GOOGLE: "Google" as const,
    },
    COGNITO_AUTH_EXCEPTIONS: {
        // this type assertion is required for login provider to work with typescript
        USER_NOT_CONFIRMED: "UserNotConfirmedException",
    },
    PARAMS: {
        REDIRECT_URL_PARAM: "next",
    },
    CLIENT_UPLOAD_VIA_FILE: {
        TYPES: [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "application/msexcel",
            "application/x-msexcel",
            "application/x-ms-excel",
            "application/x-excel",
            "application/x-dos_ms_excel",
            "application/xls",
            "application/x-xls",
        ],
    },
    URL: {
        LOCALHOST: "http://localhost:3000",
    },
    STATUS: {
        UNAUTHORIZED: 401,
    },
    DEBOUNCE_TIMEOUT: 500,
    PAGINATION: {
        TYPE: "pagination",
        SIZE: 10,
        PAGE: 1,
    },
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
    SKELETON_CONFIGURATION: {
        SKELETON_ROWS_COUNT: 5,
        SKELETON_HEIGHT: 60,
    },
    VALIDATIONS: {
        CHARS_255: 255,
        CHARS_3: 3,
        CHARS_6: 6,
    },

    LOADER_TYPES: {
        TABLE_SKELETON: "table-skeleton",
        CARD_SKELETON: "card-skeleton",
    },
    DEFAULT_TABLE_SKELETON_ROW_COUNT: 4,
    CARD_SKELETON_BASIS: 95,
    STATUS_CODES: {
        NO_CONTENT: 204,
        UNAUTHORIZED: 401,
    },
    API_ENDPOINTS: {
        GET_USER_BY_TOKEN: new URL(`${BASE_API_ENDPOINT}/user/get-user-by-token`),
        CONFIRM_VERIFICATION_CODE: new URL(`${BASE_API_ENDPOINT}/user/confirm-verification-code`),
        RESEND_VERIFICATION_CODE: new URL(`${BASE_API_ENDPOINT}/user/resend-verification-code`),
        CREATE_USER: new URL(`${BASE_API_ENDPOINT}/user/create`),
        VERIFY_GOOGLE_USER: new URL(`${BASE_API_ENDPOINT}/user/idp-callback`),
    },
}
// Endpoints that do not require authentication
export const OPEN_ENDPOINTS: string[] = []
