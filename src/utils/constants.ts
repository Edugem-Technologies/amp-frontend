export const config = {
    AUTH: {
        COOKIE_NAME: "__AT__",
    },
    LOCAL_STORAGE_VARIABLES: {
        USER__UUID: "user_uuid",
        COOKIE_CHOICE: "cookie_choice",
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
        GOOGLE: "Google" as "Google",
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
    API_VERSION: "api/v1",
}
