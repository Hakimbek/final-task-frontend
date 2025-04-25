import { TemplatesHeader } from "./header/TemplatesHeader.tsx";
import { TemplateItems } from "./item/TemplateItems.tsx";

export const Templates = () => {
    return (
        <div className="p-5 d-flex flex-column gap-4">
            <TemplatesHeader />
            <TemplateItems />
        </div>
    )
}
