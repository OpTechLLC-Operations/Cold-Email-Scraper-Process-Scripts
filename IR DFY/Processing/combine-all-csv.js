const fs = require("fs");
const path = require("path");

// Create 'result-file' directory if it doesn't exist
const outputDir = "result-file";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Initialize a write stream for the combined.csv file
const writeStream = fs.createWriteStream(path.join(outputDir, "combined.csv"));

// Read the current directory
fs.readdir(".", (err, files) => {
  if (err) {
    console.error(`Error reading the directory: ${err}`);
    return;
  }

  // Filter out only .csv files
  const csvFiles = files.filter((file) => path.extname(file) === ".csv");

  let fileIndex = 0;

  // Function to process each CSV file
  const processNextFile = () => {
    if (fileIndex >= csvFiles.length) {
      // All files processed
      writeStream.end();
      console.log("All CSV files have been combined.");
      return;
    }

    const currentFile = csvFiles[fileIndex];

    // Create read stream for the current CSV file
    const readStream = fs.createReadStream(currentFile);

    // Handle data event to write to combined.csv
    readStream.on("data", (chunk) => {
      writeStream.write(chunk);
    });

    // Handle end event to move to next file
    readStream.on("end", () => {
      fileIndex++;
      processNextFile();
    });

    // Handle error event
    readStream.on("error", (err) => {
      console.error(`An error occurred while reading ${currentFile}: ${err}`);
    });
  };

  // Start processing
  processNextFile();
});
