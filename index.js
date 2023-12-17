import { convertUrlToData, getFinalData } from "./helper.js";
import fs from "fs";

const variable = "scrappedData";
const urls = [
  "https://ioesolutions.esign.com.np/contents/design-of-steel-and-timber-structure-ce-651",
  "https://ioesolutions.esign.com.np/contents/communication-english-sh-651",
  "https://ioesolutions.esign.com.np/contents/engineering-economics-ce-655",
  "https://ioesolutions.esign.com.np/contents/building-technology-ce-652",
  "https://ioesolutions.esign.com.np/contents/sanitary-engineering-ce-656",
  "https://ioesolutions.esign.com.np/contents/transportation-engineering-ce-653",
  "https://ioesolutions.esign.com.np/contents/irrigation-and-drainage-ce-654",
];

const scrapeWebSites = async () => {
  const urlPromises = [];
  urls.forEach((url) => {
    const urlPromise = convertUrlToData(url);
    urlPromises.push(urlPromise);
  });
  let finalData = await Promise.all(urlPromises);
  finalData = finalData.filter((item) => item);

  fs.writeFile(
    "./scrapped.js",
    getFinalData(variable, finalData),
    (err) => {
      if (err) throw err;
      console.log(
        `Success: Scrapping websites (${finalData.length}/${urls.length})`
      );
    }
  );
};

scrapeWebSites()

export default scrapeWebSites;