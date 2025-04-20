import { Input as Radio, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

interface QuestionVisibilityProps {
    isVisible: boolean;
    setIsVisible: (fieldName: string, isVisible: boolean) => void;
}

export const Visibility = ({ isVisible, setIsVisible }: QuestionVisibilityProps) => {
    const { t } = useTranslation();

    return (
        <div className="mt-4">
            <Label>{t("visibility")}</Label>
            <div className="d-flex gap-4">
                <div className="d-flex gap-2">
                    <Label htmlFor="on" className="cursor-pointer">On</Label>
                    <Radio
                        className="cursor-pointer"
                        type="radio"
                        id="on"
                        name="radioOptions"
                        checked={isVisible}
                        onChange={() => setIsVisible("isVisible", !isVisible)}
                    />
                </div>
                <div className="d-flex gap-2">
                    <Label htmlFor="off" className="cursor-pointer">Off</Label>
                    <Radio
                        className="cursor-pointer"
                        type="radio"
                        id="off"
                        name="radioOptions"
                        checked={!isVisible}
                        onChange={() => setIsVisible("isVisible", !isVisible)}
                    />
                </div>
            </div>
        </div>
    )
}
