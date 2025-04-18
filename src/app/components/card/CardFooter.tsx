import React, { ReactNode } from "react"
import { Card, CardFooterProps } from "react-bootstrap"

const CardFooter: React.FC<{ children: ReactNode } & CardFooterProps> = ({
    children,
    ...props
}) => {
    return (
        <Card.Title className="p-2" {...props}>
            {children}
        </Card.Title>
    )
}

export default CardFooter
