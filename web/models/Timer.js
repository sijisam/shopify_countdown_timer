import mongoose from "mongoose";

const TimerSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  startTime: Date,
  endTime: Date,
  promotionText: String,
  displayOptions: {
    color: String,
    size: String,
    position: String,
  },
  urgencyThreshold: Number
});

export default mongoose.models.Timer || mongoose.model("Timer", TimerSchema);