import { DragAndDropPropType } from "@/types/components/drag-drop"
import { handleError } from "@/utils/handle-error"
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { flexRender } from "@tanstack/react-table"
import { useMemo } from "react"
import CustomSkeleton from "../common/CustomSkeleton"
import NoData from "../common/NoData"
import DraggableTableRow from "./DraggableRow"

/**
 * DragAndDrop component allows for draggable and sortable table rows.
 *
 * @component
 * @param {DragAndDropPropType} props - The properties for the DragAndDrop component.
 * @returns {JSX.Element} The rendered DragAndDrop component.
 */
const DragAndDrop: React.FC<DragAndDropPropType> = ({
    data,
    callback,
    setData,
    getHeaderGroups,
    getRowModel,
    loading,
    disabled,
}) => {
    /**
     * Creates an array of item IDs from the data.
     *
     * @returns {string[]} Array of item IDs.
     */
    const items = useMemo(() => data?.map(({ id }) => id), [data])
    // Define the sensors for dragging functionality
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 0,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {}),
    )
    /**
     * Handles the drag end event.
     * Here any logic can be written for drag event.
     * @param {DragEndEvent} event - The drag end event.
     */
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active.id !== over?.id && over?.id) {
            const oldIndex = items.indexOf(active.id.toString())
            const newIndex = items.indexOf(over.id.toLocaleString())
            new Promise((resolve) => {
                setData(arrayMove(data, oldIndex, newIndex))
                return resolve(null)
            })
                .then(() => {
                    if (callback) callback(oldIndex, newIndex)
                })
                .catch(handleError)
        }
    }
    /**
     * Calculates the total number of columns in the table.
     *  It is helpful for spanning columns in case of no data.
     * @returns {number} The total number of columns.
     */
    const totalColumns = getHeaderGroups().reduce(
        (acc, headerGroup) => acc + headerGroup.headers.length,
        0,
    )
    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <table className="table dataTable align-middle table-row-dashed fs-6 gy-5 episode-react-table first-child-fix-width">
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="text-start text-primary fw-bold fs-7 text-uppercase gs-0"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={`min-w-100px ${
                                        header.column.getCanSort() ? "cursor-pointer sorting" : ""
                                    } ${
                                        header.column.getIsSorted()
                                            ? "sorting_" + header.column.getIsSorted()
                                            : ""
                                    } `}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ width: `${header.getSize()}px` }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="fw-semibold text-dark">
                    {loading ? (
                        <tr>
                            <td colSpan={totalColumns}>
                                <CustomSkeleton stopHorizontalScrolling />
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={totalColumns}>
                                <NoData />
                            </td>
                        </tr>
                    ) : (
                        <SortableContext
                            items={items}
                            strategy={verticalListSortingStrategy}
                            disabled={disabled}
                        >
                            {getRowModel().rows.map((row) => {
                                return <DraggableTableRow key={row.original.id} row={row} />
                            })}
                        </SortableContext>
                    )}
                </tbody>
            </table>
        </DndContext>
    )
}

export default DragAndDrop
