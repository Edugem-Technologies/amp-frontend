/**
 * CardLoader component
 *
 * This component renders a skeleton loader for a card, which can be styled
 * using the provided `style` prop.
 *
 * @component
 * @param {object} [props] - The props object.
 * @param {object} [props.style] - Optional inline styles for the loader.
 * @returns {JSX.Element} The rendered CardLoader component.
 */
const CardLoader: React.FC<{ style?: object }> = ({ style }) => {
    return (
        <div className="card-skeleton" style={style}>
            <div className="card-loader">
                <div className="card-image-placeholder"></div>
            </div>
        </div>
    )
}

export default CardLoader
