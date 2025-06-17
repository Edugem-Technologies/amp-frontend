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
        <div className="d-flex mt-3">
            <PrimaryButton
                buttonTitle="Login with Google"
                onClick={handleGoogleLogin}
                customClassName=" w-100"
                buttonContentClass="d-flex gap-3 flex-center"
            >
                <Image src={GoogleLogo} alt="google-logo" width={20} height={20} />
            </PrimaryButton>
        </div>
    )
}

export default SocialLogin
