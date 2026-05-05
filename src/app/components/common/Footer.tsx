const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="app-container d-flex justify-content-center container-fluid py-3">
                <div className="text-dark order-2 order-md-1">
                    <a href="#" target="_blank" className="text-primary text-hover-primary">
                        Bombay Softwares
                    </a>{" "}
                    <span className="text-muted fw-semibold me-1">
                        {new Date().getFullYear()} &copy;
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
