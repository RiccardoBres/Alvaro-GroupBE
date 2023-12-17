const mongoose = require("mongoose");

const MailingListModel = new mongoose.Schema({
  email: {
      type: String,
      required: true
  },
  isSubscribed: {
      type: Boolean,
      default: true
  }
}, { timestamps: true, strict: true });


module.exports = mongoose.model("MailingList", MailingListModel, "MailingLists");
