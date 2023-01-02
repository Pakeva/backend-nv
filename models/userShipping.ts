import { model, Schema } from "mongoose";

const UserShippingSchema = new Schema({
  products: {
    type: Array,
    required: [true, 'The products are required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'on-course', 'completed', 'canceled', 'rejected'],
    default: "pending"
  }
})

UserShippingSchema.set("timestamps", true);

UserShippingSchema.methods.toJSON = function () {
  const {
    __v,
    _id,
    ...rest
  } = this.toObject();

  //You know what it means
  return { id: _id, ...rest };
};

export default model("UserShipping", UserShippingSchema);
