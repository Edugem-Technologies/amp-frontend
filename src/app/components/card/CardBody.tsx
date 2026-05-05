import React, { ReactNode } from "react"
import { Card, CardBodyProps } from "react-bootstrap"

const CardBody: React.FC<{ children: ReactNode } & CardBodyProps> = ({ children, ...props }) => {
    return (
        <Card.Body className="p-2" {...props}>
            {children}
        </Card.Body>
    )
}

export default CardBody
