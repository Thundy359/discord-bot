const fs = require("fs");
const path = require("path");

// Export a function that lists files or folders in a directory
module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];

  // Read contents of the directory, including metadata about each item
  const files = fs.readdirSync(directory, { withFileTypes: true });

  // Loop through each item in the directory
  for (const file of files) {
    const filePath = path.join(directory, file.name); // Get the full path of the item

    // If foldersOnly is true, add folders to the array
    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    }
    // Otherwise, add only files to the array
    else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};
