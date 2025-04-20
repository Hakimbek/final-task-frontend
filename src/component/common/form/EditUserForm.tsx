import { useEffect, useState } from "react";
import { useAuth } from "../../../app/hook/useAuth.ts";
import Input from "../inputs/Input.tsx";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "reactstrap";
import { useEditUserMutation } from "../../../app/api/userApi.ts";
import { useAppSelector } from "../../../app/hook/hooks.ts";
import { selectUserId } from "../../../app/slice/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./Form.tsx";
import * as React from "react";

export const EditUserForm = () => {
    const userId = useAppSelector(selectUserId) || ''
    const { t } = useTranslation();
    const { isLoading, user } = useAuth();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [editUser, { isLoading: isEditing }] = useEditUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstname(user?.firstname);
            setLastname(user?.lastname);
        }
    }, [isLoading])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        editUser({ firstname, lastname, id: userId })
            .unwrap()
            .then(() => navigate("/profile/user"))
            .catch(() => toast("Something went wrong"));
    }

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                label={t("firstname")}
                placeholder={t("firstname")}
                type="text"
                value={firstname}
                onChange={setFirstname}
                rules="^.+$"
                error={t("error.firstname")}
            />
            <Input
                label={t("lastname")}
                placeholder={t("lastname")}
                type="text"
                value={lastname}
                onChange={setLastname}
                rules="^.+$"
                error={t("error.lastname")}
            />
            <Button
                disabled={firstname.length === 0 || lastname.length === 0 || isEditing}
                color="warning"
                className="mt-3 d-flex align-items-center gap-2 justify-content-center"
            >
                {t("edit")}
                <Spinner
                    size="sm"
                    color="black"
                    type="grow"
                    className={`position-absolute ${isEditing ? "visible" : "invisible"}`}
                    style={{ margin: "0 0 0 80px" }}
                />
            </Button>
        </Form>
    )
}