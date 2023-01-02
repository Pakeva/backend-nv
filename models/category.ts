import {Schema, model} from "mongoose";


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The  name is required']
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'The status is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
})


CategorySchema.methods.toJSON = function(){
    const {__v ,_id, ...cat } = this.toObject();

    return {id:_id,...cat};
}


export default model('Category', CategorySchema);
