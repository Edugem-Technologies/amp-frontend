/**
 * Component to display the header of a tab with an optional loading state.
 *
 * @component
 * @param {string} props.heading - The heading text to display.
 * @param {boolean} [props.loading=false] - Flag indicating if the header is in a loading state.
 * @returns {JSX.Element} The JSX element to render.
 */
const TabHeader: React.FC<{ heading: string; loading?: boolean }> = ({ heading, loading }) => {
    return (
        <div className="card-header border-0">
            <div className="card-title m-0">
                {loading ? (
                    <h3 className="fw-bold m-0 loader-heading"></h3>
                ) : (
                    <h3 className="fw-bold m-0">{heading}</h3>
                )}
            </div>
        </div>
    )
}

export default TabHeader
