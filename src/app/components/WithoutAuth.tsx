import { config } from '@/utils/constants'
import { getCookie } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const WithoutAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
    const NonAuthComponent = (props: P) => {
        const router = useRouter()
        const [authenticated, setAuthenticated] = useState(false)
        const [accessToken, setAccessToken] = useState("")
        useEffect(() => {
            const accessToken = getCookie(config.AUTH.COOKIE_NAME)
            if (accessToken) {
                setAuthenticated(true)
                setAccessToken(accessToken)
            } else {
                setAuthenticated(false)
            }
        }, [])

        if(authenticated && accessToken.length){
            return router.push("/")
        }else if(!authenticated){
            return <WrappedComponent {...props as P} />
        }
    }
    return NonAuthComponent
}

export default WithoutAuth
