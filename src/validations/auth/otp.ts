import { generateErrorMessage } from '@/utils/message-generator';
import { z } from 'zod';

export const OtpValidationSchema = z.object({
	otp: z
		.string({ required_error: generateErrorMessage('OTP') })
		.trim()
		.min(1, { message: generateErrorMessage('OTP') })
});

export type OtpSchema = z.infer<typeof OtpValidationSchema>;
