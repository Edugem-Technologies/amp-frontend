import { Dispatch, SetStateAction } from "react"
import { User } from "../auth/User"

export type BaseUpdateUserProps = {
    handleClose: () => void
    user: User | null
    setRefetch: Dispatch<SetStateAction<boolean>>
}
