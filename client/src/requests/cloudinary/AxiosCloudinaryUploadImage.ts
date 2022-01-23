interface IAxiosCloudinaryUploadImage {
    blob: Blob;
    folder?: string;
}

const AxiosCloudinaryUploadImage = ({ blob, folder = "" }: IAxiosCloudinaryUploadImage) => {
    const formData = new FormData();
    
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
    formData.append("file", blob);
    formData.append("folder", folder);

    return formData;
}

export default AxiosCloudinaryUploadImage;