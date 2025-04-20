import Form from "./Form.tsx";
import { useEditQuestionByIdMutation, useGetQuestionByIdQuery } from "../../../app/api/questionApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import WarningSpinnerAbsolute from "../spinner/WarningSpinnerAbsolute.tsx";
import { useEffect, useState } from "react";
import Input from "../inputs/Input.tsx";
import Textarea from "../inputs/Textarea.tsx";
import { Select } from "../inputs/Select.tsx";
import Visibility from "../inputs/Visibility.tsx";
import { useTranslation } from "react-i18next";
import { questionTypes } from "./AddQuestionForm.tsx";
import { Button, Spinner } from "reactstrap";
import * as React from "react";
import { toast } from "react-toastify";

const EditQuestionForm = () => {
    const { questionId = '', templateId = '' } = useParams();
    const { data: question, isLoading: isQuestionLoading } = useGetQuestionByIdQuery(questionId);
    const [editQuestionById, { isLoading: isQuestionEditing }] = useEditQuestionByIdMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Text');
    const [isVisible, setIsVisible] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (question) {
            setTitle(question.title);
            setDescription(question.description);
            setType(question.type);
            setIsVisible(question.isVisible);
        }
    }, [isQuestionLoading])

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        editQuestionById({ id: questionId || '', title, description, isVisible, type })
            .unwrap()
            .then(() => {
                navigate(`/template/${templateId}`)
            })
            .catch(() => toast("Something went wrong"));
    }

    if (isQuestionLoading) return <WarningSpinnerAbsolute />

    return (
        <Form onSubmit={handleEdit}>
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
                disabled={title.length === 0 || description.length === 0 || isQuestionEditing}
                color="warning"
                className="mt-4 d-flex align-items-center gap-2 justify-content-center"
            >
                {t("edit")}
                <Spinner
                    size="sm"
                    color="black"
                    type="grow"
                    className={`position-absolute ${isQuestionEditing ? "visible" : "invisible"}`}
                    style={{ margin: "0 0 0 80px" }}
                />
            </Button>
        </Form>
    )
}

export default EditQuestionForm;