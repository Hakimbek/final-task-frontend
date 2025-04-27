import { OpenResponseButton } from "./button/OpenResponseButton.tsx";
import { DeleteResponseButton } from "./button/DeleteResponseButton.tsx";
import { Spinner } from "../spinner/Spinner.tsx";
import { useGetResponsesByUserIdQuery } from "../../app/api/responseApi.ts";
import { useAppSelector } from "../../app/hook/hooks.ts";
import { selectUserId } from "../../app/slice/authSlice.ts";
import { useTranslation } from "react-i18next";

export const UserResponses = () => {
    const userId = useAppSelector(selectUserId) || '';
    const { data, isLoading } = useGetResponsesByUserIdQuery(userId);
    const { t } = useTranslation();

    if (isLoading) return <Spinner />;

    return (
        <div className="d-flex flex-column text-theme p-5 gap-4">
            <div className="fs-3 d-flex justify-content-start">{t("responses")}</div>
            <div className="d-flex flex-column gap-2">
                {
                    data?.map(response => (
                        <div
                            key={response.id}
                            className="p-3 rounded d-flex justify-content-between align-items-center template-theme"
                        >
                            <div>{response.template.title}</div>
                            <div>
                                <OpenResponseButton responseId={response.id} />
                                <DeleteResponseButton responseId={response.id} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
