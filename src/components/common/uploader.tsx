import { UploadIcon } from "@components/icons/upload-icon";
import { useUploadMutation } from "@data/upload/use-upload.mutation";
import { useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import Spinner from "@components/ui/loaders/spinner/spinner";

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value)
      ? value.map(({ thumbnail }) => ({ preview: thumbnail }))
      : [{ preview: value.thumbnail }];
  }
  return images;
};
export default function Uploader({ onChange, value, name, onBlur }: any) {
  const [files, setFiles] = useState<FileWithPath[]>(getPreviewImage(value));
  const { mutate: upload, isLoading: loading } = useUploadMutation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      upload(
        acceptedFiles, // it will be an array of uploaded attachments
        {
          onSuccess: (data) => {
            if (onChange) {
              onChange(data);
            }
          },
        }
      );
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any, idx) => (
    <div
      className="inline-flex flex-col overflow-hidden border border-gray-100 rounded mt-2 mr-2 relative"
      key={idx}
    >
      <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
        <img src={file.preview} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            "border-dashed dark:border-neutral-700 border-2 border-gray-300 h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-gossamer-400 focus:outline-none",
        })}
      >
        <input {...getInputProps()} name={name} onBlur={onBlur} />
        <UploadIcon className="text-gray-300" />
        <p className="text-body dark:text-neutral text-sm mt-4 text-center">
          <span className="text-primary font-semibold">Faça upload de uma imagem </span> ou
           arrastar e soltar <br />
          <span className="text-xs text-gray-500 dark:text-neutral">PNG, JPG</span>
        </p>
      </div>

      {(!!thumbs.length || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="h-16 flex items-center mt-2 ml-2">
              <Spinner simple={true} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
