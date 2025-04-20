import { TemplatesHeader } from "./header/TemplatesHeader.tsx";
import { TemplatesItems } from "./items/TemplatesItems.tsx";

const Templates = () => {
    return (
        <div className="p-5 d-flex flex-column gap-4">
            <TemplatesHeader />
            <TemplatesItems />
        </div>
    )
}

export default Templates;
