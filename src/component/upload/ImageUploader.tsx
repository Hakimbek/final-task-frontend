import { useState, useRef } from "react";
import { useLazyGetSignedUrlQuery } from "../../app/api/uploadApi.ts";
import { useUploadImageByIdMutation } from "../../app/api/userApi.ts";
import { useAppSelector } from "../../app/hook/hooks.ts";
import { selectUserId } from "../../app/slice/authSlice.ts";
import { Button, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const ImageUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [getSignedUrl] = useLazyGetSignedUrlQuery();
    const [uploadImage] = useUploadImageByIdMutation();
    const [loading, setLoading] = useState(false);
    const userId = useAppSelector(selectUserId);
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleUpload = async () => {
        setLoading(true);

        if (!file) return;

        const { data } = await getSignedUrl({ fileName: file.name, fileType: file.type });
        const uploadUrl = data?.signedUrl;
        const fileKey = data?.key;
        const imageUrl = `https://final-task-images.s3.eu-north-1.amazonaws.com/${fileKey}`;

        if (!uploadUrl) return;

        fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        })
            .then(() => {
                uploadImage({ url: imageUrl, userId: userId || '' });
            })
            .catch(() => toast(t("error.common")))
            .finally(() => {
                setFile(null);
                setLoading(false);
            });
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="d-none"
            />
            {
                loading ? (
                    <Button color="warning">
                        <Spinner size="sm" type="grow" />
                    </Button>
                ) : file ? (
                    <Button onClick={handleUpload} color="warning">
                        <i className="bi bi-cloud-upload"></i>
                    </Button>
                ) : (
                    <Button color="warning" onClick={handleClick}>
                        <i className="bi bi-image"></i>
                    </Button>
                )
            }
        </div>
    );
};
