import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";

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

fs.readdir(".", (err, files) => {
  if (err) {
    console.error(`Error reading the directory: ${err}`);
    return;
  }

  const csvFiles = files.filter((file) => path.extname(file) === ".csv");

  csvFiles.forEach((file) => {
    const missingColumns: string[] = [...baseFileColumns];
    fs.createReadStream(file)
      .pipe(csv())
      .on("headers", (headers) => {
        headers.forEach((header) => {
          const index = missingColumns.indexOf(header);
          if (index !== -1) {
            missingColumns.splice(index, 1);
          }
        });

        if (missingColumns.length > 0) {
          console.log(
            `File ${file} is missing the following columns: ${missingColumns.join(
              ", "
            )}`
          );
        } else {
          console.log(`File ${file} contains all required columns.`);
        }
      })
      .on("end", () => {
        console.log(`Finished checking ${file}`);
      })
      .on("error", (err) => {
        console.error(`An error occurred while processing ${file}: ${err}`);
      });
  });
});
