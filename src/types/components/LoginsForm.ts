import { LoginSchemaType } from "@/validations/auth/Login"
import { UseFormReturn } from "react-hook-form"

export interface LoginFormProps {
    hookForm: UseFormReturn<LoginSchemaType>
}
