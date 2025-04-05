import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  documentType: {
    type: String,
    // enum: ['cnic', 'license', 'passport'],
    required: true
  },

  document: [String],

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: null
  }
  // frontImage: {
  //   type: String,  // URL or path to the stored image
  //   required: true
  // },
  // backImage: {
  //   type: String,  // URL or path to the stored image
  //   required: true
  // },
}, { timestamps: true });

export let Document = mongoose.model('Document', DocumentSchema);