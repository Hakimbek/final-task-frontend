import { Button, Label } from "reactstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface OptionsProps {
    options: string[];
    setOptions: (field: string, options: string[]) => void;
}

export const Options = ({ options, setOptions }: OptionsProps) => {
    const [value, setValue] = useState('');
    const { t } = useTranslation();

    const handleAdd = (value: string) => {
        if (!options.includes(value)) setOptions("options", [...options, value]);
        setValue('');
    }

    const handleDelete = (value: string) => {
        setOptions("options", options.filter((option) => option !== value));
    }

    return (
        <div className="mt-3 d-flex flex-column">
            <Label>{t("options")}</Label>
            <div className="d-flex gap-1">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    className="input-theme w-100"
                    placeholder={t("addTag")}
                />
                <Button
                    disabled={value.length === 0}
                    color="warning"
                    onClick={() => handleAdd(value)}
                >
                    {t("add")}
                </Button>
            </div>
            <div className="d-flex gap-1 flex-column mt-3">
                {
                    options.map((option) => (
                        <div
                            key={option}
                            className="my-1 d-flex tags-theme rounded-pill px-3 p-2 gap-1 align-items-center justify-content-between"
                        >
                            <div>{option}</div>
                            <button className="button-theme p-0" onClick={() => handleDelete(option)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
