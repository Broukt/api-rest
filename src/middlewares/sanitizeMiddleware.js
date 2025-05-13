const xss = require("xss");

function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return;
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val === "string") {
      obj[key] = xss(val);
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (typeof item === "string") {
          val[idx] = xss(item);
        } else {
          sanitizeObject(item);
        }
      });
    } else if (typeof val === "object") {
      sanitizeObject(val);
    }
  });
}

module.exports = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
};
