import DragAccordionBoard from "@/app/components/common/DragAccordionBoard"
import { Amp2Data } from "@/fixtures/Amp2Data"

export default function Page() {
    return (
        <div className="amp-2-wrapper  h-100 content d-flex flex-column flex-column-fluid pb-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid p-0 pages amp amp-2">
                    <div className="g-5 gx-xxl-8">
                        <div className="fences columns">
                            <DragAccordionBoard data={Amp2Data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
