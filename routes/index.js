var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {messages, title: "Welcome To Mini Message Board"});
});

router.get('/new', function(req, res, next) {
  res.render('form', {title: "Write Message"});
});

router.post('/new', [
body("msgtxt")
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("Message text is required"),

body("author")
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("Author is required"),

(req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('form', {title: "Write Message", errors: errors.array()});
    return;
  } else {
    messages.push({
      text: req.body.msgtxt,
      user: req.body.author,
      added: new Date()
    });
    res.redirect('/');
  }
}
]);

module.exports = router;
