import { ManualShippingProps, TypesRequest } from "../interfaces";
import { Response } from "express";
import { errorResponse } from "../helpers";
import { Category, User } from "../models";
import ManualShipping from "../models/manualShipping";
import { ENUM_STATUS } from "../utils";


const getShipping = async (req: TypesRequest<string>, res: Response) => {
  const id = req.params.id;

  const shipping = await ManualShipping.findById(id);

  if (!shipping) {
    return res.status(401).json({
      msg: "No existe el envio consultado"
    });
  }

  return res.status(200).json({
    shipping
  });
};

const updateShippingStatus = async (req: TypesRequest<string>, res: Response) => {
  const id = req.params.id;
  //@ts-ignore
  const status = req.body.status.toLowerCase();

  if(!ENUM_STATUS.includes(status)){
    return res.status(401).json({
      msg: "No es un status valido"
    });
  }

  const shipping = await ManualShipping.findByIdAndUpdate(id, {
    status
  }, {new: true});

  if (!shipping) {
    return res.status(401).json({
      msg: "No existe el envio consultado"
    });
  }

  return res.status(200).json({
    shipping
  });
};

const getAllShippings = async (req: TypesRequest<any>, res: Response) => {
  const id = req.user?._id;

  if(req.user?.rol === 'CLIENT'){
    const shippingsCompany = await ManualShipping.find({
      "company.id": id
    });

    if (!shippingsCompany.length) {
      return res.status(401).json({
        msg: "No cuentas con envios realizados"
      });
    }

    return res.status(200).json({
      shippingsCompany
    });
  }


  if(req.user?.rol === 'ASSOCIATED'){
    const shippingsAssociated = await ManualShipping.find({
      "associated.id": id
    });

    if (!shippingsAssociated.length) {
      return res.status(401).json({
        msg: "No cuentas con envios realizados"
      });
    }

    return res.status(200).json({
      shippingsAssociated
    });
  }

  return res.status(200).json({
    msg: 'Al parecer no cuentas con envios realizados'
  });

};

const addNewShipping = async (req: TypesRequest<ManualShippingProps>, res: Response) => {
  const company = req.user!;

  if (!company) {
    return res.status(400).json({
      msg: "Al parecer no tienes activa tu sesion"
    });
  }

  const shipping = req.body;

  if (!shipping) {
    return res.status(400).json({
      msg: "Es necesaria la informacion del envio"
    });
  }

  const associated = await User.findById(shipping.associated);
  if (!associated) {
    return res.status(401).json({
      msg: "El asociado/repartidor no esta registrado o ha sido dado de baja"
    });
  }

  const newShipping = new ManualShipping({
    destinationAddress: { ...shipping.destinationAddress },
    packageDetails: shipping.packageDetails,
    associated: {
      id: associated.id,
      img: associated.img,
      name: associated.name,
      phone: associated.phone
    },
    company: {
      id: company._id,
      img: company.img,
      name: company.name,
      zip: company.zip,
      state: company.state,
      municipality: company.municipality,
      colony: company.colony,
      street: company.street,
      numExt: company.numExt,
      numInt: company.numInt,
      references: company.referencer,
      phone: company.phone,
    }
  });

  try {
    await newShipping.save();

    return res.status(201).json({
      msg: "Envio realizado con exito",
      shipping: {
        id: newShipping.id,
        originAddress: newShipping.company,
        associated: newShipping.associated,
        destinationAddress: newShipping.destinationAddress,
        packageDetails: newShipping.packageDetails,
        status: newShipping.status
      }
    });
  } catch (e) {
    errorResponse(e, res);
  }

};

export {
  getShipping,
  getAllShippings,
  updateShippingStatus,
  addNewShipping
};
