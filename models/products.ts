import {Schema, model} from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    description: {type: String},
    img: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'the price is required']
    },
    amount: {type: Number},
    available: {
        type: Boolean,
        // trim: true,
        default: true,
        required: [true, 'the availability is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})


ProductSchema.methods.toJSON = function(){
    const {__v ,_id, ...prod } = this.toObject();

    return {id:_id,...prod};
}

export default model('Product', ProductSchema);
