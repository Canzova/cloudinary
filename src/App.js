import "./App.css";
import { useState } from "react";

function App() {
  const [pdf, setPdf] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (pdf === null) {
      console.log("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append("file", pdf);
    data.append("upload_preset", "my_cloud");
    data.append("cloud_name", "dte3ayeuj");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dte3ayeuj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();

      console.log(cloudData.version);
      const version = cloudData.version;
      console.log(cloudData.public_id);
      const public_link = cloudData.public_id;
      const temp =
        "https://res.cloudinary.com/dte3ayeuj/image/upload/v" +
        version +
        "/" +
        public_link +
        ".jpg";

      setUrl(temp);
      console.log(temp);

      // Display success message or perform further actions
    } catch (error) {
      console.error("Image upload failed:", error);
      // Display error message or perform error handling
    }
  };

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
