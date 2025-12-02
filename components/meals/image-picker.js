"use client";
import classes from "./image-picker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

function ImagePicker({ label, name, onChange, ...props }) {
  const inputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImageUrl(null);
      setError(null);
      onChange?.(null); // Notify react-hook-form
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      setImageUrl(null);
      onChange?.(null);
      return;
    }

    // Validate file size (20MB limit to match Next.js config)
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(`Image is too large (${fileSizeMB}MB). Maximum size is 20MB.`);
      setImageUrl(null);
      onChange?.(null);
      return;
    }

    // Clear any previous errors
    setError(null);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    // Pass the FileList to react-hook-form
    onChange?.(event.target.files);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imageUrl && !error && <p>No image selected.</p>}
          {error && <p style={{ color: "#dc2626" }}>{error}</p>}
          {imageUrl && (
            <Image src={imageUrl} alt="The image selected by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/*"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleButtonClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
