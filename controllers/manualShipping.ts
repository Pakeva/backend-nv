import { ManualShippingProps, TypesRequest } from "../interfaces";
import { Response } from "express";
import { errorResponse } from "../helpers";
import { User } from "../models";

const getShipping = (req:TypesRequest<any>,res:Response) => {
  console.log(req.user);

  return res.status(200).json({
    msg: 'hello world'
  })
};

const addNewShipping = async (req:TypesRequest<ManualShippingProps>,res:Response) => {
  // const company = req.user!;
  //
  // if(!company){
  //   return res.status(400).json({
  //     msg: "Al parecer no tienes activa tu sesion"
  //   })
  // }

  const shipping = req.body;

  if(!shipping){
    return res.status(400).json({
      msg: 'Es necesaria la informacion del envio'
    })
  }

  const associated = await User.findById(shipping.associated);
  if(!associated){
    return res.status(401).json({
      msg: 'El asociado/repartidor no esta registrado o ha sido dado de baja'
    })
  }

  // const newShipping = new ManualShipping({
  //   destinationAddress: {...shipping.destinationAddress},
  //   packageDetails: shipping.packageDetails,
  //   associated: {
  //     id: associated.id,
  //     name: associated.name+ associated.firstLastName,
  //     img: associated.img,
  //     phone: associated.phone
  //   },
  //   company: {
  //     id: company._id,
  //     img: company.img,
  //     name: company.name,
  //     zip: company.zip,
  //     state: company.state,
  //     municipality: company.municipality,
  //     colony: company.colony,
  //     street: company.street,
  //     numInt: company.numInt,
  //     numExt: company.numExt,
  //     references: company.referencer,
  //     phone: company.phone
  //   }
  // })

  try {

    // await newShipping.save();

    return res.status(201).json({
      msg: 'Envio realizado con exito',
      shipping: {
        // originAddress: newShipping.company,
        // associated: newShipping.associated,
        // destinationAddress: newShipping.destinationAddress,
        // packageDetails: newShipping.packageDetails,
      }
    })
  } catch (e) {
    errorResponse(e, res);
  }

};




export {
  getShipping,
  addNewShipping
}
