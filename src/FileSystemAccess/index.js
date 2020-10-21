import React from "react";

const FileSystemAccess = () => {
  const onClickBtn = async (e) => {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.arrayBuffer();
    console.log("contents=", contents);
  };
  const onChangeInput = (e) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      contents = contents.replace("data:text/plain;base64,", "");
      console.log("content", contents);
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <button onClick={onClickBtn}>Choose file</button>
      <input type="file" onChange={onChangeInput} />
    </div>
  );
};

export default FileSystemAccess;
