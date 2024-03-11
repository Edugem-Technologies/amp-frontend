import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { OtpModalPropType } from '@/types/components/otp-modal'
import { doSendOtpEmail, doVerifyUserEmail } from '@/services/user'
import toast from 'react-hot-toast'
import { config } from '@/utils/constants'
import { ErrorType } from '@/types/common/error'
import { signIn } from 'aws-amplify/auth'
import { setCookie } from 'cookies-next'
import { OtpSchema, OtpValidationSchema } from '@/validations/auth/otp'
import CustomButton from './Button'

const OTPModal: React.FC<OtpModalPropType> = ({ show, setShow, email, password }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<OtpSchema>({ resolver: zodResolver(OtpValidationSchema) })

    const handleClose = () => setShow(false);
    const submitHandler = async (data: OtpSchema) => {
        const requestData = {
            email,
            verification_code: data.otp
        }
        try {
            const response = await doVerifyUserEmail(requestData);
            if (response && response.status && response.data) {
                toast(config.MESSAGES.USER_EMAIL_VERIFIED, config.TOASTER_OPTIONS.SUCCESS);
                const cognitoUser = await signIn(email, password);
                if (cognitoUser && cognitoUser.signInUserSession && cognitoUser.signInUserSession.accessToken.jwtToken) {
                    setCookie(config.AUTH.COOKIE_NAME, cognitoUser.signInUserSession.accessToken.jwtToken)
                    handleClose();
                    router.replace({ pathname: '/plans' });
                }
            }
        } catch (error) {
            const { message } = error as ErrorType
            toast(message, config.TOASTER_OPTIONS.ERROR);
        }
    }

    const resendOtp = async () => {
        try {
            toast.dismiss();
            const response = await doSendOtpEmail({ email });
            if (response && response.status) {
                toast(config.MESSAGES.OTP_RESENT_SUCCESS, config.TOASTER_OPTIONS.SUCCESS);
            } else {
                toast(config.MESSAGES.OTP_RESENT_FAIL, config.TOASTER_OPTIONS.ERROR);
            }
        } catch (error) {
            const { message } = error as ErrorType
            toast(message, config.TOASTER_OPTIONS.ERROR);
        }

    }
    return (
        <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose} centered className='v-otp-modal'>
            <Modal.Body>
                <div className='v-forgot-password-section'>
                    <div className="container">
                        <div className="v-form-container p-3">
                            <div className='v-login p-0'>
                                <div className="v-tagline">
                                    <h1>Enter OTP</h1>
                                </div>
                                <div className='v-caption'>
                                    <p>We have sent OTP to your email address</p>
                                </div>
                                <div className='v-form-content'>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className='v-form-group mt-0'>
                                            <label htmlFor="otp">Enter OTP  <span className='text-danger'>*</span></label>
                                            <input type="text" placeholder='E.g. 345862' {...register('otp')} />
                                            {errors.otp && errors.otp.message ? <span className='text-danger'>{errors.otp.message}</span> : <></>}
                                        </div>
                                        <div className='v-form-submit-btn'>
                                            <CustomButton className='v-submit-btn v-fill-btn-hover' type='submit' isSubmitting={isSubmitting} title={'Submit'} />
                                        </div>
                                        <div className='v-resend-otp'>
                                            <button type='button' onClick={resendOtp}>Didn&apos;t receive a code ? Resend</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default OTPModal