import Form from "./Form.tsx";
import Input from "../inputs/Input.tsx";
import { useState } from "react";
import Textarea from "../inputs/Textarea.tsx";
import { useTranslation } from "react-i18next";
import { Select } from "../inputs/Select.tsx";
import Visibility from "../inputs/Visibility.tsx";
import { Button, Spinner } from "reactstrap";
import { useCreateQuestionMutation } from "../../../app/api/questionApi.ts";
import * as React from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const questionTypes = [
    { id: "Text", name: "Text" },
    { id: "Textarea", name: "Textarea" },
    { id: "Number", name: "Number" },
]

const AddQuestionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Text');
    const [isVisible, setIsVisible] = useState(true);
    const { t } = useTranslation();
    const [createQuestion, { isLoading }] = useCreateQuestionMutation();
    const navigate = useNavigate();
    const { templateId } = useParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createQuestion({ title, description, type, isVisible, templateId: templateId || '' })
            .unwrap()
            .then(result => {
                navigate(`/template/${result.templateId}`)
            })
            .catch(() => toast("Something went wrong"));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                label={t("title")}
                placeholder={t("title")}
                type="text"
                value={title}
                onChange={setTitle}
                rules="^.+$"
                error={"Title is required"}
            />
            <Textarea
                label={t("description")}
                placeholder={t("description")}
                value={description}
                onChange={setDescription}
                rules="^.+$"
                error={"Description is required"}
            />
            <Select topic={type} setTopic={setType} data={questionTypes} label="type" />
            <Visibility isVisible={isVisible} setIsVisible={setIsVisible} />
            <Button
                disabled={title.length === 0 || description.length === 0 || isLoading}
                color="warning"
                className="mt-3 d-flex align-items-center gap-2 justify-content-center"
            >
                {t("add")}
                <Spinner
                    size="sm"
                    color="black"
                    type="grow"
                    className={`position-absolute ${isLoading ? "visible" : "invisible"}`}
                    style={{ margin: "0 0 0 80px" }}
                />
            </Button>
        </Form>
    )
}

export default AddQuestionForm;