import { useState } from "react"
import ReactStaticTable from "./ReactStaticTable"
import { TaskRow } from "@/types/common/TeamSection"
import { ColumnDef } from "@tanstack/react-table"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import BaseStaticSelect from "../input/BaseStaticSelect"
type TaskTableProps = {
    sections: TaskSection[]
    tableWClassName?: string
}
const ExpandedRow = ({ row }: { row: TaskRow }) => {
    const d = row.details

    return (
        <tr className={`expanded-row-wrapper row-expand tr-priority-${d.priority}`}>
            <td colSpan={6}>
                <div className="expand-container">
                    <table className="table table-flush mb-0">
                        <tbody>
                            <tr>
                                <td className="fw-bolder">Task:</td>
                                <td>{row.title}</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Category:</td>
                                <td>{d.category}</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Priority:</td>
                                <td>{d.priority}</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Calendar:</td>
                                <td>{d.calendar}</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Progress:</td>
                                <td>{d.progress}%</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Assigned:</td>
                                <td>{d.assignedTo}</td>
                            </tr>

                            <tr>
                                <td className="fw-bolder">Due Date:</td>
                                <td>{d.dueDate}</td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    <hr />
                                </td>
                            </tr>

                            <tr>
                                <td className="fw-bolder" colSpan={2}>
                                    Tags
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    {d.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-white text-dark fw-normal me-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    <hr />
                                </td>
                            </tr>

                            <tr>
                                <td className="fw-bolder" colSpan={2}>
                                    Notes
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>{d.notes}</td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    <hr />
                                </td>
                            </tr>

                            <tr>
                                <td className="fw-bolder" colSpan={2}>
                                    Checklist
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    {d.checklist.map((c, index) => (
                                        <div
                                            key={index}
                                            className="form-check form-check-sm form-check-custom mb-1"
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={c.checked}
                                                readOnly
                                                id={`checklist-${c.id}`}
                                            />

                                            <label
                                                className="form-check-label strikethrough"
                                                htmlFor={`checklist-${c.id}`}
                                            >
                                                {String(index + 1).padStart(2, "0")} : {c.label}
                                            </label>
                                        </div>
                                    ))}
                                </td>
                            </tr>

                            {d.customDropdown && (
                                <>
                                    <tr>
                                        <td colSpan={2}>
                                            <hr />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="fw-bolder" colSpan={2}>
                                            Custom Drop Down
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}>
                                            <div className="f-custom w-200px">
                                                <BaseStaticSelect
                                                    isCheckBoxDropdowns={true}
                                                    isMulti={true}
                                                    options={d.customDropdown.options.map(
                                                        (opt) => ({
                                                            label: opt,
                                                            value: opt,
                                                            data: opt,
                                                        }),
                                                    )}
                                                    selectedOptionValue={[]}
                                                    onSelected={(selected) => {
                                                        console.log("selected", selected)
                                                    }}
                                                    className="w-100"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )}

                            <tr>
                                <td colSpan={2}>
                                    <hr />
                                </td>
                            </tr>

                            <tr>
                                <td className="fw-bolder" colSpan={2}>
                                    Media
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    {d.media.map((m, index) => (
                                        <a
                                            key={index}
                                            href={m.url}
                                            download
                                            className="text-decoration-underline d-block mb-1"
                                        >
                                            {m.name}
                                        </a>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}

export const taskColumns = (
    expandedRowId: string | undefined,
    setExpandedRowId: (id: string | undefined) => void,
    sectionName: string,
): ColumnDef<TaskRow>[] => [
    {
        id: "select_expand",
        header: sectionName,
        meta: {
            tdClassName: "icons",
        },
        size: 70,
        cell: ({ row }) => {
            const isOpen = expandedRowId === row.original.id

            return (
                <div className="d-flex justify-content-start align-items-center flex-shrink-0">
                    <div className="form-check form-check-sm form-check-custom form-check-solid me-1">
                        <input
                            type="checkbox"
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log("Selected:", row.original.id)
                            }}
                        />
                    </div>

                    <div
                        className=" cursor-pointer"
                        style={{
                            fontSize: "22px",
                            transition: "transform 0.2s ease",
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            setExpandedRowId(isOpen ? undefined : row.original.id)
                        }}
                    >
                        <PlayArrowIcon />
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "title",
        size: 1150,
        meta: {
            tdClassName: "task",
        },
        header: "",
    },
    {
        accessorKey: "assignedTo",
        size: 280,
        meta: {
            tdClassName: "assigned text-nowrap",
        },
        header: "Assigned",
    },
    {
        accessorKey: "progress",
        size: 210,
        header: "Progress",
        meta: {
            tdClassName: "text-end",
        },
        cell: ({ getValue }) => (
            <div className="progress">
                <div
                    className="progress-bar bg-success"
                    style={{ width: `${getValue<number>()}%` }}
                />
            </div>
        ),
    },
    {
        accessorKey: "priority",
        size: 190,
        header: "Priority",
        meta: {
            tdClassName: "priority text-nowrap",
        },
    },
    {
        id: "view",
        size: 70,
        header: "",
        meta: {
            tdClassName: "actions",
        },
        cell: ({ row }) => (
            <div
                className="d-flex justify-content-end w-100"
                onClick={() => {
                    console.log("View task:", row.original.id)
                }}
            >
                <div className="view-icon cursor-pointer">
                    <RemoveRedEyeIcon />
                </div>
            </div>
        ),
    },
]

type TaskSection = {
    id: string
    name: string
    rows: TaskRow[]
}

const TaskTableView = ({ sections, tableWClassName }: TaskTableProps) => {
    const [expandedRowId, setExpandedRowId] = useState<string | undefined>(undefined)

    return (
        <div className="stacked-tables">
            {sections.map((section, index) => (
                <div key={index}>
                    <ReactStaticTable
                        data={section.rows}
                        columns={taskColumns(expandedRowId, setExpandedRowId, section.name)}
                        tableProps={{
                            expandedRowId,
                            renderExpandedRow: (rowId) => {
                                const row = section.rows.find((r) => r.id === rowId)
                                return row ? <ExpandedRow row={row} /> : null
                            },
                        }}
                        tableWClassName={tableWClassName}
                    />
                </div>
            ))}
        </div>
    )
}

export default TaskTableView
