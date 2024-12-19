$(document).ready(function () {
  // PDF Download Functionality
  $("#download-pdf").on("click", function () {
    const { jsPDF } = window.jspdf;

    // Target the resume content
    const content = document.getElementById("resume-content");

    html2canvas(content, {
      scale: 2, // High-quality rendering
      useCORS: true,
      logging: true, // Enable logging for debugging
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Initialize jsPDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Get canvas dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate scaling factors
        const scaleFactor = Math.min(
          pdfWidth / imgWidth,
          pdfHeight / imgHeight
        );

        // Calculate new image dimensions to fit A4
        const imgScaledWidth = imgWidth * scaleFactor;
        const imgScaledHeight = imgHeight * scaleFactor;

        // Center the image in the PDF
        const xOffset = (pdfWidth - imgScaledWidth) / 2;
        const yOffset = (pdfHeight - imgScaledHeight) / 2;

        // Add the image to the PDF
        pdf.addImage(
          imgData,
          "PNG",
          xOffset,
          yOffset,
          imgScaledWidth,
          imgScaledHeight
        );

        // Save the PDF
        pdf.save("John_Doe_Resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      });
  });
});
