import fs from 'fs';

export default (req, res) => {
  // console.log(req.headers)
  res.status(200).json({ message: 'File operations completed.' });
};
