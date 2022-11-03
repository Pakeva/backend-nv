import {model, Schema} from "mongoose";


const ShippingSchema = new Schema({
    origin: {
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        int_number: {
            type: String,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country:{
            type: String,
            default: "MX"
        },
        reference: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
    },
    destination: {
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        int_number: {
            type: String,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country:{
            type: String,
            default: "MX"
        },
        reference: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
    },
    package: {
        weight: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        length: {
            type: Number,
            required: true,
        },
        declaredValue: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    shipment:  {
        ObjectId: {
            type: String,
            required: true,
        },
        ShippingId: {
            type: String,
            required: true,
        },
        carrier: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        insurance: {
            type: Number,
        },
        currency: {
            type: String,
            default: "MXN"
        },
        days: {
            type: String,
            required: true,
        },
        extra: {
            type: String,
            required: true,
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

ShippingSchema.methods.toJSON = function(){
    const {__v ,_id,...rest } = this.toObject();
    // return category;

    //You know what it means
    return {id:_id,...rest};
}


export default model('Shipping', ShippingSchema);