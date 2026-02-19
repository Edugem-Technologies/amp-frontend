import DragAccordionBoard from "@/app/components/common/DragAccordionBoard"
import { Amp2Data } from "@/fixtures/Amp2Data"

export default function Page() {
    return (
        <div className="content-section-wrapper amp-2-wrapper container-fluid h-100">
            <DragAccordionBoard data={Amp2Data} />
        </div>
    )
}
