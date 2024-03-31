import html2canvas from "html2canvas";

export const saveDivAsImage = (name: string) => {
  const element = document.getElementById("chart");
  name = name.split(" ").join("_");
  if (!element) return;
  element.classList.add("photo");
  html2canvas(element, { allowTaint: false, useCORS: true }).then(function (
    canvas
  ) {
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = `${name}_chart.png`;
    link.href = image;
    link.click();
  });

  element.classList.remove("photo");
};
