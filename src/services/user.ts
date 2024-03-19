import { config } from "@/utils/constants";
import { fetchGet, fetchPost } from "./service-clients";
import { UserEmailVerifyPropType } from "@/types/auth/user";
import { SignupSchema } from "@/validations/auth/signup"

export const doGetUserByAccessToken = async (token: string) => {
	const url = new URL(process.env.NEXT_PUBLIC_API_URL + `/${config.API_VERSION}/user/get-user-by-token`);
	return await fetchGet(url, token);
};

export const doVerifyUserEmail = async (data: UserEmailVerifyPropType) => {
	const url = new URL(process.env.NEXT_PUBLIC_API_URL + `/${config.API_VERSION}/user/confirm-verification-code`);
	return await fetchPost(url, data, '');
};

export const doSendOtpEmail = async (data: { email: string }) => {
	const url = new URL(process.env.NEXT_PUBLIC_API_URL + `/${config.API_VERSION}/user/resend-verification-code`);
	return await fetchPost(url, data, '');
};

export const doCreateUser = async (data: Omit<SignupSchema, "confirm_password">) => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + `/${config.API_VERSION}/user/create`)
    return await fetchPost(url, data, "")
}
