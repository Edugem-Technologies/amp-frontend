/**
 * NoData Component
 *
 * A simple functional component that displays a message indicating that no records were found.
 * This component is centered horizontally and vertically using margin utilities from a CSS framework.
 *
 * @returns {JSX.Element} A JSX element containing the no data message.
 */
const NoData: React.FC = () => {
    return (
        <div className={`mt-5 mb-5 mx-auto text-center`}>
            <span className="text-center">No records found</span>
        </div>
    )
}

export default NoData
