import React, { ReactNode } from "react"
import { Card, CardTitleProps } from "react-bootstrap"

const CardTitle: React.FC<{ children: ReactNode } & CardTitleProps> = ({ children, ...props }) => {
    return (
        <Card.Title className="p-2" {...props}>
            {children}
        </Card.Title>
    )
}

export default CardTitle
