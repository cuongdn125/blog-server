const db = require("../models");

const getLabels = async (req, res) => {
  try {
    const data = await db.Label.findAll();
    const labels = data.map((label) => {
      return {
        value: label.labelName,
        label: label.labelName,
      };
    });
    res.status(200).json(labels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLabels,
};
