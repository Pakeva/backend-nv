import { model, Schema } from "mongoose";

const CompanySchema = new Schema({
  img: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: Schema.Types.ObjectId
})

CompanySchema.methods.toJSON = function () {
  const {
    __v,
    _id,
    ...rest
  } = this.toObject();

  //You know what it means
  return { id: _id, ...rest };
};

export default model("Company", CompanySchema);
