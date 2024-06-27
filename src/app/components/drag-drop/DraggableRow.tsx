import { DraggableTableRowPropType } from "@/types/components/drag-drop"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender } from "@tanstack/react-table"

/**
 * DraggableTableRow component
 *
 * This component represents a table row that can be dragged and dropped
 * using the dnd-kit library.
 *
 * @param {DraggableTableRowPropType} props - The properties for the DraggableTableRow component.
 * @returns {JSX.Element} The rendered draggable table row.
 */
const DraggableTableRow: React.FC<DraggableTableRowPropType> = ({ row }) => {
    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
        id: row.original.id,
    })
    // Style transformation for drag-and-drop
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <tr ref={setNodeRef} style={style} {...listeners} {...attributes} role="row">
            {row.getVisibleCells().map((cell) => (
                <td
                    key={cell.id}
                    style={{
                        width: cell.column.getSize(),
                    }}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    )
}

export default DraggableTableRow
