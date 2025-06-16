import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import Image from "next/image"
import { useRouter } from "next/navigation"
import GoogleLogo from "../../../../public/images/Google-logo.svg"
import PrimaryButton from "../button/PrimaryButton"

const SocialLogin = () => {
    const router = useRouter()
    const handleGoogleLogin = async () => {
        try {
            router.push(CONFIG.API_ENDPOINTS.GOOGLE_LOGIN.href)
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <PrimaryButton
            buttonTitle="Login with Google"
            onClick={handleGoogleLogin}
            customClassName="mt-3 py-2"
            buttonContentClass="d-flex gap-3 flex-center"
        >
            <Image src={GoogleLogo} alt="google-logo" />
        </PrimaryButton>
    )
}

export default SocialLogin
