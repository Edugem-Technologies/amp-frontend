export interface LabelPropsType extends React.HTMLProps<HTMLLabelElement> {
    label?: string
    labelClass?: string
    isRequired?: boolean
    isTitleCaseRequired?: boolean
    renderInput?: () => React.ReactNode
}
