import React from "react";
import { Button } from "react-bootstrap";
import ImageUploading from "react-images-uploading";

const PhotoComponent = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div className="photoComp">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        name="images"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="buttons d-flex justify-content-around">
              <Button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </Button>
              <Button onClick={onImageRemoveAll}>Remove all images</Button>
            </div>

            {imageList.map((image, index) => (
              <div key={index} className="image-item ">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onImageUpdate(index)}
                  >
                    Click here to update
                  </div>
                  <Button
                    className="image-item-btn-close"
                    onClick={() => onImageRemove(index)}
                  >
                    X
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default PhotoComponent;
