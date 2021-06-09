const mongoose = require('mongoose');
mongoose.connect("mongodb://root:pass@localhost:27017", {
  useNewUrlParser: true,
})