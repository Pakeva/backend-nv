// import { model, Schema } from "mongoose";
//
// const ManualShippingSchema = new Schema({
//   destinationAddress: {
//     zip: {
//       type: Number,
//       required: true,
//     },
//     colony: {
//       type: String,
//       required: true
//     },
//     municipality: {
//       type: String,
//       required: true
//     },
//     state: {
//       type: String,
//       required: true
//     },
//     street: {
//       type: String,
//       required: true
//     },
//     numInt: {
//       type: String,
//       required: true
//     },
//     numExt: {
//       type: String
//     },
//     references: {
//       type: String,
//     },
//     status: {
//       type: String,
//       default: "pending"
//     }
//   },
//   packageDetails: {
//     description: {
//       type: String,
//       required: true
//     }
//   },
//   associated: {
//     id: {
//       type: Schema.Types.ObjectId,
//       required: true
//     },
//     img: {
//       type: String,
//     },
//     name: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: Number,
//     },
//   },
//   company: {
//     id: {
//       type: Schema.Types.ObjectId,
//       required: true
//     },
//     img: {
//       type: String,
//     },
//     name: {
//       type: String,
//       required: [true, 'El nombre es requerido'],
//     },
//     zip:{
//       type: Number,
//       required: [true, 'El código postal es requerido'],
//     },
//     state:{
//       type: String,
//       required: [true, 'El estado es requerido'],
//     },
//     municipality:{
//       type: String,
//       required: [true, 'El municipio es requerido'],
//     },
//     colony: {
//       type: String,
//       required: [true, 'La colonia o fraccionamiento es requerido'],
//     },
//     street: {
//       type: String,
//       required: [true, 'La calle es requerida'],
//     },
//     numExt: {
//       type: String,
//       required: [true, 'La número exterior es requerido'],
//     },
//     numInt: {
//       type: String,
//     },
//     references: {
//       type: String,
//     },
//     phone: {
//       type: Number,
//     },
//   }
// });
//
// ManualShippingSchema.set("timestamps", true);
//
// ManualShippingSchema.methods.toJSON = function () {
//   const {
//     __v,
//     _id,
//     ...rest
//   } = this.toObject();
//
//   //You know what it means
//   return { id: _id, ...rest };
// };
//
// export default model("ManualShipping", ManualShippingSchema);
