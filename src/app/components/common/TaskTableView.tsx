import { useState } from "react"
import ReactStaticTable from "./ReactStaticTable"
import { TaskRow } from "@/types/common/TeamSection"
import { ColumnDef } from "@tanstack/react-table"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
type TaskTableProps = {
    sections: TaskSection[]
}
const ExpandedRow = ({ row }: { row: TaskRow }) => {
    const d = row.details

    return (
        <tr className="expanded-row-wrapper">
            <td colSpan={6}>
                <div className="expanded-task">
                    <div className="expanded-task__meta">
                        <div className="meta-item">
                            <span className="label">Task:</span>
                            <span className="value">{row.title}</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Category:</span>
                            <span className="value">{d.category}</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Priority:</span>
                            <span className="value">{d.priority}</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Calendar:</span>
                            <span className="value">{d.calendar}</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Progress:</span>
                            <span className="value">{d.progress}%</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Assigned:</span>
                            <span className="value">{d.assignedTo}</span>
                        </div>

                        <div className="meta-item">
                            <span className="label">Due Date:</span>
                            <span className="value">{d.dueDate}</span>
                        </div>
                    </div>

                    <div className="expanded-task__section">
                        <div className="section-title">Tags</div>
                        <div className="tags">
                            {d.tags.map((tag) => (
                                <span key={tag} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="expanded-task__section">
                        <div className="section-title">Notes</div>
                        <p className="notes">{d.notes}</p>
                    </div>

                    <div className="expanded-task__section">
                        <div className="section-title">Checklist</div>
                        <div className="checklist">
                            {d.checklist.map((c) => (
                                <label key={c.id} className="checklist-item">
                                    <input type="checkbox" checked={c.checked} />
                                    <span>{c.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {d.customDropdown && (
                        <div className="expanded-task__section">
                            <div className="section-title">Custom Drop Down</div>
                            <select className="custom-dropdown">
                                <option value="">{d.customDropdown.label}</option>
                                {d.customDropdown.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="expanded-task__section">
                        <div className="section-title">Media</div>
                        <div className="media-list">
                            {d.media.map((m) => (
                                <a key={m.id} href={m.url} download className="media-item">
                                    📄 {m.name}
                                </a>
                            ))}
                        </div>
                    </div>
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
        cell: ({ row }) => {
            const isOpen = expandedRowId === row.original.id

            return (
                <div className="d-flex align-items-center gap-3">
                    <input
                        type="checkbox"
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log("Selected:", row.original.id)
                        }}
                    />

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
        size: 10,
    },
    { accessorKey: "title", header: "", size: 200 },
    {
        accessorKey: "assignedTo",
        header: "Assigned",
        size: 50,
    },
    {
        accessorKey: "progress",
        header: "Progress",
        size: 35,
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
        size: 10,
        header: "Priority",
    },
    {
        id: "view",
        size: 0,
        header: "",
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

const TaskTableView = ({ sections }: TaskTableProps) => {
    const [expandedRowId, setExpandedRowId] = useState<string | undefined>(undefined)

    return (
        <div className="stacked-tables">
            {sections.map((section) => (
                <div key={section.id}>
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
                    />
                </div>
            ))}
        </div>
    )
}

export default TaskTableView
