import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const ProfilePic = () => {
  const id = localStorage.getItem("userId");
  const [imageUrl, setImageUrl] = useState(
    `http://localhost:8000/api/user//image/${id}`
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Card
      className="text-center"
      style={{
        border: "none",
        padding: "20px",
      }}
    >
      <Card.Img
        src={imageUrl}
        alt="Profile Picture"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          display: "block",
          margin: "0px auto",
        }}
      />
      <Card.Body className="btnChoose">
        <Button
          variant="primary"
          onClick={() => document.getElementById("imageInput").click()}
          style={{ width: "100%" }}
        >
          <i className="bi bi-upload"></i> Choose New Photo
        </Button>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Card.Body>
    </Card>
  );
};

export default ProfilePic;
