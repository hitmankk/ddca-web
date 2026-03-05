const { Parser } = require("json2csv");

exports.downloadCSV = (res, data, fields, filename) => {
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(filename);
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "CSV Export Failed", error: err.message });
  }
};
