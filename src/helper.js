import puppeteer from "puppeteer";

const convertUrlToData = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${url}`);
    const data = await page.evaluate(() => {
      const documentBody = document.querySelector("body");

      // remove all script tags from body
      const scriptTags = documentBody.querySelectorAll("script");
      scriptTags.forEach((scriptTag) => scriptTag.remove());

      // remove all svg tags from body
      const svgTags = documentBody.querySelectorAll("svg");
      svgTags.forEach((svgTag) => svgTag.remove());

      // remove all style tags from body
      const styleTags = documentBody.querySelectorAll("style");
      styleTags.forEach((styleTag) => styleTag.remove());

      // remove all ins tags from body
      const insTags = documentBody.querySelectorAll("ins");
      insTags.forEach((insTag) => insTag.remove());

      // remove all id attributes from body
      const idAttributes = documentBody.querySelectorAll("[id]");
      idAttributes.forEach((idAttribute) => idAttribute.setAttribute("id", ""));

      // remove all class attributes from body
      const classAttributes = documentBody.querySelectorAll("[class]");
      classAttributes.forEach((classAttribute) => classAttribute.setAttribute("class", ""));

      // remove all src attributes from body
      const srcAttributes = documentBody.querySelectorAll("[src]");
      srcAttributes.forEach((srcAttribute) => srcAttribute.setAttribute("src", ""));

      // remove all href attributes from body
      const hrefAttributes = documentBody.querySelectorAll("[href]");
      hrefAttributes.forEach((hrefAttribute) => hrefAttribute.setAttribute("href", ""));

      // remove all style attributes from body
      const styleAttributes = documentBody.querySelectorAll("[style]");
      styleAttributes.forEach((styleAttribute) => styleAttribute.removeAttribute("style"));

      // remove all the \n and \t from the HTML
      let innerHTML = documentBody.innerHTML;
      innerHTML = innerHTML.replace(/\n/g, '').replace(/\t/g, '');

      // remove all the comments from the HTML
      innerHTML = innerHTML.replace(/<!--[\s\S]*?-->/g, '');

      // replace all the text in the body with ACEMACEMACEMACEMACEMACEM
      innerHTML = innerHTML.replace(/>(.*?)</g, '>ACEMACEMACEMACEMACEMACEM<');

      return JSON.stringify({ [document.URL]: innerHTML });
    });

    return data;
  } catch (error) {
    console.log("Error!!!: Generating Data");
    throw error;
  }
};

const getFinalData = (variable, finalData) => {
  return `const ${variable} = [${finalData.toString()}];\n\nexport default ${variable};`;
};

// Traverse through all text nodes and replace their content with an empty string
function removeAllTextNodes(element) {
  if (element.nodeType === 3) { // Text node
      element.nodeValue = '';
  } else {
      for (var i = 0; i < element.childNodes.length; i++) {
          removeAllTextNodes(element.childNodes[i]);
      }
  }
}

export { convertUrlToData, getFinalData };