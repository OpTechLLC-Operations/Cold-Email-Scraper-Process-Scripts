const fs = require("fs");
const path = require("path");

const directoryPath = __dirname; // Use the current directory where the script is located

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Loop through the files and print only those with a .csv extension
  files.forEach((file) => {
    if (path.extname(file) === ".csv") {
      console.log(file);
    }
  });
});
