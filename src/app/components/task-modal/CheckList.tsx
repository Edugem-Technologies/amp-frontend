export default function CheckList({ data = [] }: any) {
  return (
    <div className="accordion v1 my-6" id="task-check-list">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button fs-6 fw-bold collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#task-check-list_body_1"
          >
            Check List
          </button>
        </h2>

        <div
          id="task-check-list_body_1"
          className="accordion-collapse collapse"
          data-bs-parent="#task-check-list"
        >
          <div className="accordion-body">

            {data.map((item: any) => (
              <label
                key={item.id}
                className="form-check form-check-sm form-check-custom form-check-solid mb-3 align-items-start"
              >
                <input type="checkbox" className="form-check-input" />
                <span className="form-check-label">{item.text}</span>
              </label>
            ))}

            <div className="text-end">
              <button className="btn btn-sm btn-outline-dark">
                Add Checklist
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}