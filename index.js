const { resolve } = require("path");
const fs = require("fs");
function isProjectDir(dir) {
  return fs.existsSync(resolve(dir, "package.json"));
}
const retryDeps = 5;
module.exports = function (file) {
  const filePath1 = resolve(process.cwd(), file);
  if (fs.existsSync(filePath1)) {
    return file;
  }
  let currentDir = process.cwd();
  for (let i = 0; i < retryDeps && !isProjectDir(currentDir); i++) {
    currentDir = resolve(currentDir, "../");
    const filePath = resolve(currentDir, file);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return file;
};
