import { downloadData, uploadData } from "aws-amplify/storage";

export const downloadFile = async (key: string, fileName: string) => {
  try {
    const downloadResult = await downloadData({
      key,
    }).result;

    const text = await downloadResult.body.blob();

    const blobUrl = URL.createObjectURL(text);

    const a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    a.href = blobUrl;
    a.download = fileName; // Set the file name for download

    a.click();
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const putFileToS3 = async (key: string, file: any) => {
  try {
    const result = await uploadData({
      key: key,
      data: file,
      options: {
        accessLevel: "guest",
      },
    }).result;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
