import {model, Schema} from "mongoose";


const BondingAssociatedSchema = new Schema({
    user: Schema.Types.ObjectId,
    associated: Schema.Types.ObjectId
})



BondingAssociatedSchema.methods.toJSON = function(){
    const {__v ,_id, ...rest } = this.toObject();

    return {id:_id,...rest};
}

export default model('BondingAssociated', BondingAssociatedSchema);