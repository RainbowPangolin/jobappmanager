import fs from 'fs';

function readJSONFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

export default async (req, res) => {

  readJSONFile('pages/api/mockdb/testData.json')
  .then((d) => {
    res.status(200).json(d);
    res.end();
  })
  .catch ((e) => {
    res.status(500).json({ message: `File operations failed: ${e}` });
    res.end();
  })
};