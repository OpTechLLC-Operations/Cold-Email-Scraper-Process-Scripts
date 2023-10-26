const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// The base columns you want to check for in each .csv file
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

// Read the files in the current directory
fs.readdir(".", (err, files) => {
  if (err) {
    console.error("Failed to list files in the directory.", err);
    return;
  }

  console.log("Listing files in the directory...");

  // Loop through each file to check if it is a .csv
  files.forEach((file) => {
    if (path.extname(file) === ".csv") {
      console.log(`Processing file: ${file}`);
      const columnsInFile = new Set();

      // Create a read stream for each .csv file
      fs.createReadStream(file)
        .pipe(csv())
        .on("headers", (headers) => {
          headers.forEach((header) => columnsInFile.add(header));
        })
        .on("data", (data) => {
          // You can process each row of data here, if needed
        })
        .on("end", () => {
          console.log(`Completed processing: ${file}`);
          console.log(`Number of columns in the file: ${columnsInFile.size}`);

          // Check for missing columns
          const missingColumns = baseFileColumns.filter(
            (column) => !columnsInFile.has(column)
          );

          if (missingColumns.length === 0) {
            console.log(
              `All columns in baseFileColumns are present in ${file}.`
            );
          } else {
            console.log(
              `Missing columns in ${file}: ${missingColumns.join(", ")}`
            );
          }
        })
        .on("error", (error) => {
          console.error(`An error occurred while processing ${file}: `, error);
        });
    }
  });
});
