// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any
export type AnyObject = Record<string, Any>

export interface CheckValidPhoneNumberArgsTyps {
    country: AnyObject
    data: string
}
