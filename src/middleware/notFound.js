module.exports = function(req, res) {
    res.status(404).json({ msg: "not found" });
  };