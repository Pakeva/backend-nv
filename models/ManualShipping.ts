import { model, Schema } from "mongoose";

const ManualShippingSchema = new Schema({
  destinationAddress: {
    zip: {
      type: Number,
      required: true,
    },
    colony: {
      type: String,
      required: true
    },
    municipality: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    numInt: {
      type: String,
      required: true
    },
    numExt: {
      type: String
    },
    references: {
      type: String,
    }
  },
  packageDetails: {
    description: {
      type: String,
      required: true
    }
  },
  company: {
    id: {
      type: Schema.Types.ObjectId,
    }
  }
})

ManualShippingSchema.set('timestamps', true);

ManualShippingSchema.methods.toJSON = function(){
  const {__v ,_id,...rest } = this.toObject();

  //You know what it means
  return {id:_id,...rest};
}


export default model('ManualShipping', ManualShippingSchema);
