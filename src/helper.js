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

      // remove all src attributes from body
      const srcAttributes = documentBody.querySelectorAll("[src]");
      srcAttributes.forEach((srcAttribute) => srcAttribute.removeAttribute("src"));

      // remove all href attributes from body
      const hrefAttributes = documentBody.querySelectorAll("[href]");
      hrefAttributes.forEach((hrefAttribute) => hrefAttribute.removeAttribute("href"));

      // remove all style attributes from body
      const styleAttributes = documentBody.querySelectorAll("[style]");
      styleAttributes.forEach((styleAttribute) => styleAttribute.removeAttribute("style"));

      return JSON.stringify({[document.URL]: documentBody.innerHTML.replace(/\n/g, '')});
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

export { convertUrlToData, getFinalData };