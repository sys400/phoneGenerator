import cheerio from "cheerio";
import axios from "axios";

export default async function handler(req, res) {
  const { data } = await axios.get(
    `https://www.randomphonenumbers.com/us_phone_number/${req.body.number.number}`,
    {
      headers: {
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
  const $ = cheerio.load(data);
  let phoneCollection = [];
  $(".col-md-3.col-sm-6.col-xs-6").each(function () {
    phoneCollection.push($(this).text());
  });
  const lastScraped = new Date().toISOString();

  res.send({ phoneCollection, lastScraped });
}
