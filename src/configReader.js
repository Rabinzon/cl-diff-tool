import fs from 'fs';

export default (path) => {
  if (!/\.json$/.test(path)) return false;
  const fileBuffer = fs.readFileSync(path);
  return JSON.parse(fileBuffer);
};
