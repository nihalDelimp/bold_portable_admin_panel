export const handleDownloadQRCode = async (svgDataUrl: string, fileName: string) => {
  // Show a confirmation popup before initiating the download
  if (window.confirm("Do you want to download the QR code?")) {
    try {
      const svgBlob = await (await fetch(svgDataUrl)).blob();
      const url = window.URL.createObjectURL(svgBlob);

      // Create a temporary link
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = fileName;

      // Simulate a click on the link to initiate the download
      downloadLink.click();

      // Clean up the temporary link and object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during download:", error);
      // Handle any errors that occurred during the download process
      // You can display an error message or take appropriate actions here
    }
  }
};
