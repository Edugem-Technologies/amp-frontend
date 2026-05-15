"use client"

import Link from "next/link"
import { Accordion } from "react-bootstrap"

interface TeamMember {
    id: number
    name: string
    avatar: string | null
    initial: string
    visible: boolean
    assign: boolean
}

interface TeamAccordionProps {
    team: TeamMember[]
}

const TeamAccordion = ({ team }: TeamAccordionProps) => {
    return (
        <Accordion className="v1" defaultActiveKey="">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Team</Accordion.Header>

                <Accordion.Body>
                    <div className="people-list">
                        <div>
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-row-dashed table-row-gray-300 align-middle gx-1 gy-2 mb-0">
                                        <thead>
                                            <tr className="fw-bold fs-7 text-purple">
                                                <th className="min-w-100px pt-0">Team</th>
                                                <th className="pt-0 text-center">Visible</th>
                                                <th className="pt-0 text-center">Assign</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {team.map((member) => (
                                                <tr key={member.id}>
                                                    {/* TEAM MEMBER */}
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="symbol symbol-25px me-2">
                                                                <img
                                                                    src={member.avatar as string}
                                                                    width={35}
                                                                    height={35}
                                                                    alt={member.name}
                                                                />
                                                            </div>
                                                            <div className="d-flex justify-content-start flex-column">
                                                                <Link
                                                                    href="#"
                                                                    className="text-dark fs-7"
                                                                >
                                                                    {member.name}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* VISIBLE */}
                                                    <td className="text-center visible">
                                                        <div className="d-inline-flex form-check form-switch form-check-custom form-check-solid">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input h-20px w-30px"
                                                                defaultChecked={member.visible}
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* ASSIGN */}
                                                    <td className="text-center assign">
                                                        <div className="d-inline-flex form-check form-switch form-check-custom form-check-solid">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input h-20px w-30px"
                                                                defaultChecked={member.assign}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TeamAccordion
