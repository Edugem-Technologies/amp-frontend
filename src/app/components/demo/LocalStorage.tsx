"use client"
import useLocalStorage from "@/app/hooks/useLocalStorage"

const LocalStorage = () => {
    const [name, setName] = useLocalStorage("name", "AMP | ADMIN DASHBOARD")
    return (
        <div>
            <h2>useLocalStorage hook</h2>
            <div className="d-flex align-items-center flex-wrap gap-4">
                <p className="m-0">
                    Value obtained from local storage is: <strong> {name}</strong>
                </p>
                <button
                    className="btn btn-primary btn-sm rounded"
                    onClick={() => {
                        setName("Hello World")
                    }}
                >
                    Set value to Hello World
                </button>
            </div>
        </div>
    )
}

export default LocalStorage
