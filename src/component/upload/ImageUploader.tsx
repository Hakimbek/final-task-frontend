import { useState, useRef } from 'react';
import { useLazyGetSignedUrlQuery } from "../../app/api/uploadApi.ts";
import { useUploadImageMutation } from "../../app/api/userApi.ts";
import { useAppSelector } from "../../app/hook/hooks.ts";
import { selectUserId } from "../../app/slice/authSlice.ts";
import { Button, Spinner } from "reactstrap";

const ImageUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [getSignedUrl] = useLazyGetSignedUrlQuery();
    const [uploadImage] = useUploadImageMutation();
    const [loading, setLoading] = useState(false);
    const userId = useAppSelector(selectUserId);
    const inputRef = useRef<HTMLInputElement>(null);

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

        await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        await uploadImage({ url: imageUrl, id: userId || '' });
        setLoading(false);
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
                    <Spinner color="warning" size="sm" type="grow" />
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

export default ImageUploader;
