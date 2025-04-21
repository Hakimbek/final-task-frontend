import { useState } from "react";
import { Label } from "reactstrap";

interface SelectProps {
    value: string;
    fieldName: string;
    setValue: (field: string, value: string) => void;
    data: { id: string, name: string }[] | undefined;
    label: string;
}

export const Select = ({ value, fieldName, setValue, data, label }: SelectProps) => {
    const [visible, setVisible] = useState(false);

    const handleSelect = (value: string) => {
        setValue(fieldName, value);
        setVisible(false);
    }

    return (
        <div className="cursor-pointer">
            <Label>{label}</Label>
            <div
                className="text-theme rounded select-theme p-2 d-flex justify-content-between align-items-center"
                onClick={() => setVisible(!visible)}
            >
                <div>{value}</div>
                <div>
                    <i className={`bi ${visible ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
                </div>
            </div>
            {
            visible && (
                    <div
                        className=" mt-1 position-absolute select-theme rounded d-flex flex-column z-1"
                        style={{ width: 350 }}
                    >
                        {
                            data?.map(({ id, name }) => (
                                <button
                                    key={id}
                                    className="button-theme"
                                    type="button"
                                    onClick={() => handleSelect(name)}
                                >
                                    {name}
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
