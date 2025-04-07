const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['invite', 'reminder', 'approval'],  
    },
    sender_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    read: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
    },
    project_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', NotificationSchema);
