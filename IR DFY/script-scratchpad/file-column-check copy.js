const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { createWriteStream } = require("fs");
const { writeFile } = require("fs/promises");
const ExcelJS = require("exceljs");

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

const stagingDir = path.join(__dirname, "staging_results");

// Ensure staging results directory exists
if (!fs.existsSync(stagingDir)) {
  fs.mkdirSync(stagingDir);
}

const outputWorkbook = new ExcelJS.Workbook();
const worksheet = outputWorkbook.addWorksheet("Results");
worksheet.columns = [
  { header: "File Name", key: "fileName" },
  { header: "Number of Columns", key: "columnCount" },
  { header: "Status", key: "status" },
];

fs.readdir(__dirname, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === ".csv" && file !== "base.csv") {
      let columns = [];
      fs.createReadStream(file)
        .pipe(csv())
        .on("headers", (header) => {
          columns = header;
        })
        .on("end", () => {
          const status =
            columns.length === baseFileColumns.length &&
            columns.every((col, index) => col === baseFileColumns[index])
              ? "Match"
              : "Mismatch";
          worksheet.addRow({
            fileName: file,
            columnCount: columns.length,
            status: status,
          });
        });
    }
  });
});

// Save the Excel file once processing is done
setTimeout(() => {
  outputWorkbook.xlsx
    .writeFile(path.join(stagingDir, "results.xlsx"))
    .then(() => {
      console.log("Results saved!");
    })
    .catch((err) => {
      console.error("Error saving the results:", err);
    });
}, 5000); // 5 seconds delay should be enough but you might want to adjust based on the number and size of CSV files
