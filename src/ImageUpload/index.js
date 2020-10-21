import React from "react";

const ImageUpload = () => {
  const convertBase64 = (event) => {
    console.log(event.target.files[0]);
    var file = document.querySelector("input[type=file]")["files"][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
      baseString = reader.result;
      console.log(baseString);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <form action="/action_page.php">
        <label for="img">Select image:</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={convertBase64}
        />
      </form>
    </div>
  );
};

export default ImageUpload;
