import React, { ReactNode } from "react"
import { Card, CardProps } from "react-bootstrap"
import CardTitle from "./CardTitle"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"

interface CustomCardComponent extends React.FC<{ children: ReactNode } & CardProps> {
    Title: typeof CardTitle
    Body: typeof CardBody
    Footer: typeof CardFooter
}

const CustomCard: CustomCardComponent = ({ children, ...props }) => {
    return (
        <Card className="shadow" {...props}>
            {children}
        </Card>
    )
}

CustomCard.Title = CardTitle
CustomCard.Body = CardBody
CustomCard.Footer = CardFooter

export default CustomCard
