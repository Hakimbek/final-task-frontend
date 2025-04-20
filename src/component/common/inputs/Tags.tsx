import { Button, Label } from "reactstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TagsProps {
    tags: string[];
    setTags: (field: string, tags: string[]) => void;
}

export const Tags = ({ tags, setTags }: TagsProps) => {
    const [value, setValue] = useState('');
    const { t } = useTranslation();

    const handleAdd = (value: string) => {
        if (!tags.includes(value)) setTags("tags", [...tags, value]);
        setValue('');
    }

    const handleDelete = (value: string) => {
        setTags("tags", tags.filter((tag) => tag !== value));
    }

    return (
        <div className="mt-3 d-flex flex-column">
            <Label>{t("tags")}</Label>
            <div className="d-flex gap-1 flex-wrap">
                {
                    tags.map((tag) => (
                        <div
                            key={tag}
                            className="my-1 d-flex tags-theme rounded-pill px-2 p-1 gap-1 align-items-center justify-content-between"
                        >
                            <small>{tag}</small>
                            <button className="button-theme p-0" onClick={() => handleDelete(tag)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))
                }
            </div>
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
        </div>
    )
}
