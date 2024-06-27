/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderGroup, Row, RowModel } from "@tanstack/react-table"

export interface DraggableTableRowPropType {
    row: Row<any>
}

/**
 * Interface for the properties required by the Drag and Drop component.
 */
export interface DragAndDropPropType {
    /**
     * The data array that the Drag and Drop component will operate on.
     *
     * @type {any[]}
     */
    data: any[]

    /**
     * Function to update the data array.
     *
     * @type {React.Dispatch<React.SetStateAction<any[]>>}
     */
    setData: React.Dispatch<React.SetStateAction<any[]>>

    /**
     * Optional callback function that gets called after an item is dragged and dropped.
     *
     * @param {number} oldIndex - The original index of the item before it was moved.
     * @param {number} newIndex - The new index of the item after it has been moved.
     *
     * @type {(oldIndex: number, newIndex: number) => void}
     */
    callback?: (oldIndex: number, newIndex: number) => void

    /**
     * Function to get the header groups for the table.
     *
     * @returns {HeaderGroup<any>[]} An array of header groups.
     *
     * @type {() => HeaderGroup<any>[]}
     */
    getHeaderGroups: () => HeaderGroup<any>[]

    /**
     * Function to get the row model for the table.
     *
     * @returns {RowModel<any>} The row model of the table.
     *
     * @type {() => RowModel<any>}
     */
    getRowModel: () => RowModel<any>

    /**
     * Optional flag to indicate if the component is in a loading state.
     *
     * @type {boolean}
     */
    loading?: boolean

    /**
     * Optional flag to disable the drag and drop functionality.
     *
     * @type {boolean}
     */
    disabled?: boolean
}
