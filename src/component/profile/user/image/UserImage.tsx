interface UserImageProps {
    imageUrl: string | undefined;
}

export const UserImage = ({ imageUrl }: UserImageProps) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            {
                imageUrl ? (
                    <img src={imageUrl} alt="User image" width={100} height={100} className="rounded-circle" />
                ) : (
                    <div
                        style={{width: "100px", height: "100px"}}
                        className="rounded-circle template-theme d-flex justify-content-center align-items-center">
                        <i className="bi bi-person"></i>
                    </div>
                )
            }
        </div>
    )
}
