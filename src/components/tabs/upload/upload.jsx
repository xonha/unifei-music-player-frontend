import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./upload.module.css";
import CloseIcon from "../../../assets/icons/close_icon.svg";

export function UploadComponent() {
  const dropRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function removeFile(file) {
    setFiles(files.filter((f) => f !== file));
  }

  async function postSongs() {
    const fetchArray = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return fetch("http://localhost:8000/song", {
        method: "POST",
        body: formData,
      });
    });

    setIsLoading(true);

    await Promise.all(fetchArray);

    setIsLoading(false);
  }

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { files: newFiles } = e.dataTransfer;

      if (newFiles && newFiles.length) {
        const newFilesArray = Array.from(newFiles).filter((file) => {
          return file.type.startsWith("audio/");
        });

        setFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
      }
    },
    [setFiles]
  );

  useEffect(() => {
    if (!dropRef.current) return;
    const { current } = dropRef;

    current.addEventListener("dragover", handleDragOver);
    current.addEventListener("drop", handleDrop);

    return () => {
      current.removeEventListener("dragover", handleDragOver);
      current.removeEventListener("drop", handleDrop);
    };
  }, [handleDrop]);

  if (isLoading) {
    return <div style={{ display: "flex" }}>Loading...</div>;
  }

  return (
    <div className={styles.dragAndDropContainer}>
      <div className={styles.dragAndDropArea}>
        Arraste seus arquivos
        <input type="file" ref={dropRef} className={styles.uploadInput} />
      </div>
      <div className={styles.uploadedFiles}>
        {files.map((file) => (
          <div key={Math.random()} className={styles.fileItemContainer}>
            <div className={styles.fileItem}>
              {file.name}
              <img
                className={styles.removeMusicIcon}
                src={CloseIcon}
                alt="remove"
                height={10}
                width={10}
                onClick={() => removeFile(file)}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className={styles.uploadButton} onClick={postSongs}>
          Upload
        </button>
      </div>
    </div>
  );
}
