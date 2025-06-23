"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { removeIsAuthenticated, showSweetAlertWithRedirect } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, ListGroup } from "react-bootstrap"

const UserDropdown = () => {
    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

    const setCustomTimeout = (ms: number, cb: () => void) => {
        if (timerId) {
            clearTimeout(timerId)
        }
        const id = setTimeout(() => cb(), ms)
        setTimerId(id)
    }
    const removeCustomTimeout = (cb?: () => void) => {
        if (timerId) {
            clearTimeout(timerId)
        }
        if (cb) {
            cb()
        }
    }
    const handleLogout = async () => {
        try {
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.LOGOUT)
            if (response.status) {
                removeIsAuthenticated()
                showSweetAlertWithRedirect({
                    icon: ALERT_ICON_TYPE.success,
                    text: response.message,
                    router,
                    url: "/auth/login",
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    })

    return (
        <div
            className="profile-container"
            onMouseEnter={() => {
                setShowDropdown(true)
            }}
            onMouseLeave={() => {
                setCustomTimeout(250, () => setShowDropdown(false))
            }}
        >
            {/* Profile Icon */}
            <img
                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Profile Icon"
                className="profile-icon"
            />

            {/* Dropdown Card */}
            {showDropdown && (
                <Card
                    className="shadow-sm dropdown-card"
                    onMouseEnter={() => {
                        removeCustomTimeout(() => setShowDropdown(true))
                    }}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <Card.Body>
                        <Card.Title>Jane Doe</Card.Title>
                        <Card.Text>jane@acme.com</Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item action className="cursor-pointer">
                            My Profile
                        </ListGroup.Item>
                        <ListGroup.Item action className="cursor-pointer" onClick={handleLogout}>
                            Logout
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            )}
        </div>
    )
}

export default UserDropdown
