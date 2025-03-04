const { check, validationResult } = require("express-validator");

const validateUser = [
  check("firstname", "Firstname is required").not().isEmpty(),
  check("lastname", "Lastname is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
