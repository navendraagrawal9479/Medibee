import { useState } from 'react';



function ExampleComponent() {
  const [responseText, setResponseText] = useState('');
  function handleFileUpload(file) {
    const data = new FormData();
    data.append('file', file);
  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText);
        const score = response.result[0].prediction[0].score * 100;
        const ocrText = response.result[0].prediction[0].ocr_text;
        console.log(score)
        setResponseText(ocrText);
      }
    });
  
    xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/7d294680-5334-4c02-bb5b-9dde724d7504/LabelFile/?async=false");
    xhr.setRequestHeader("authorization", "Basic " + btoa("dcadbb14-e400-11ed-bb1a-26ce8ce74d24:"));
    xhr.send(data);
  }

  return (
    <div>
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
      <p>Response Text: {responseText}</p>
    </div>
  );
}

export default ExampleComponent;