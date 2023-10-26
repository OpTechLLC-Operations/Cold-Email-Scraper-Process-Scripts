const fs = require("fs");
const csv = require("csv-parser");

const baseFileColumns = [
  "name",
  "phone",
  "email",
  "email_host",
  "website",
  "category",
  "address",
  "city",
  "region",
  "zip",
  "country",
  "google_rank",
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "googlestars",
  "googlereviewscount",
  "yelpstars",
  "yelpreviewscount",
  "facebookstars",
  "facebookreviewscount",
  "facebookpixel",
  "googlepixel",
  "criteopixel",
  "seo_schema",
  "googleanalytics",
  "linkedinanalytics",
  "uses_wordpress",
  "mobilefriendly",
  "uses_shopify",
  "domain_registration",
  "domain_expiration",
  "domain_registrar",
  "domain_nameserver",
  "instagram_name",
  "instagram_is_verified",
  "instagram_is_business_account",
  "instagram_media_count",
  "instagram_highlight_reel_count",
  "instagram_followers",
  "instagram_following",
  "instagram_category",
  "instagram_average_likes",
  "instagram_average_comments",
  "ads_yelp",
  "ads_facebook",
  "ads_instagram",
  "ads_messenger",
  "ads_adwords",
  "g_maps",
  "g_maps_claimed",
  "search_keyword",
  "search_city",
];

fs.readdir("./", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const csvFiles = files.filter((file) => file.endsWith(".csv"));

  csvFiles.forEach((file) => {
    let headers = [];

    fs.createReadStream(file)
      .pipe(csv())
      .on("headers", (headerList) => {
        headers = headerList;
      })
      .on("end", () => {
        console.log(`Finished reading ${file}`);

        const missingHeaders = baseFileColumns.filter(
          (column) => !headers.includes(column)
        );

        if (missingHeaders.length > 0) {
          console.log(
            `Missing headers in ${file}: ${missingHeaders.join(", ")}`
          );
        } else {
          console.log(`${file} contains all required headers.`);
        }
      });
  });
});
