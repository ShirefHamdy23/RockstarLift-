import React from "react";
import ImageUploading from "react-images-uploading";

const Upload = ({ handleChange, imgExtension, maxFileSize, defaultImages }) => {
  const onDrop = (pictureFiles, pictureDataURLs) => {
    const newImagesUploaded = pictureDataURLs.slice(defaultImages.length);
    handleChange(newImagesUploaded);
  };

  return (
    <ImageUploading
      withIcon={false}
      withLabel={false}
      withPreview={true}
      buttonText={"Add photos"}
      fileSizeError={"File size is too big!"}
      fileTypeError={"This extension is not supported!"}
      onChange={onDrop}
      imgExtension={imgExtension}
      maxFileSize={maxFileSize}
      defaultImages={defaultImages}
    />
  );
};

export default Upload;
