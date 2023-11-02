import html2canvas from "html2canvas";

export const saveDivAsImage = () => {
  var element = document.getElementById("chart"); // Replace 'yourDivId' with the actual ID of your div
  if (!element) return;
  element.classList.add("photo");
  html2canvas(element, { allowTaint: false, useCORS: true }).then(function (
    canvas
  ) {
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = "div_image.png";
    link.href = image;
    link.click();
  });

  element.classList.remove("photo");
};
