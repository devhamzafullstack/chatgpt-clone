import React from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({ setImg }) => {
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

  const authenticator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload`
      );
      if (!response.ok) {
        throw new Error("Failed to get authentication parameters");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setImg((prev) => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const onError = (err) => {
    setImg((prev) => ({ ...prev, isLoading: false, error: err.message }));
    console.error("Upload error:", err);
  };

  const onSuccess = (res) => {
    setImg((prev) => ({
      ...prev,
      isLoading: false,
      error: "",
      dbData: {
        fileId: res.fileId,
        url: res.url,
        filePath: res.filePath,
      },
    }));
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        error: "",
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <label className="flex items-center justify-center p-2 sm:p-2.5 rounded-lg bg-gradient-to-r from-purple-500/30 to-indigo-500/30 hover:from-purple-600/40 hover:to-indigo-600/40 transition-all cursor-pointer hover:scale-105">
        <FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        <IKUpload
          fileName="chat-upload"
          className="hidden"
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          folder="/chat-uploads/"
        />
      </label>
    </IKContext>
  );
};

export default Upload;
