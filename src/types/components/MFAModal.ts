import { DefaultModalPropType } from "./Modal"

/**
 * Props for modals related to Multi-Factor Authentication (MFA).
 *
 * @interface MFAModalProps
 * @extends DefaultModalPropType
 *
 * @property {boolean} isMFAEnabled - Indicates if MFA is currently enabled for the user.
 *
 * @example
 * <AuthModal
 *   onClose={handleClose}
 *   isMFAEnabled={user.isMFAEnabled}
 *   onAdded={handleMFASuccess}
 * />
 */
export interface MFAModalProps extends DefaultModalPropType {
    isMFAEnabled: boolean
}
