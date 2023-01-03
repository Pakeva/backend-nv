import { ManualShippingProps, TypesRequest } from "../interfaces";
import { Response } from "express";
import { User, UserShipping } from "../models";
import { errorResponse } from "../helpers";
import ManualShipping from "../models/manualShipping";
import { ENUM_STATUS } from "../utils";

const addNewUserShipping = async (req: TypesRequest<any>, res: Response) => {
  const user = req.user!;

  if (!user) {
    return res.status(400).json({
      msg: "Al parecer no tienes activa tu sesion"
    });
  }

  const products = req.body.products;
  const validProducts = products.some((el:any) => el.id === '');

  if (validProducts) {
    return res.status(400).json({
      msg: "Favor de mandar correctamente el id de los productos"
    });
  }

  if (!products) {
    return res.status(400).json({
      msg: "Son necesarios los productos a pedir"
    });
  }

  const company = await User.findById(req.body.company);
  if (!company) {
    return res.status(401).json({
      msg: "La compania no esta registrada o ha sido dado de baja"
    });
  }

  if (company!.rol !== 'CLIENT') {
    return res.status(401).json({
      msg: "No es una compania valida"
    });
  }

  const newUserShipping = new UserShipping({
    products: req.body.products,
    description: req.body.description,
    user: req.body.user,
    company: req.body.company
  });

  try {
    await newUserShipping.save();

    return res.status(201).json({
      msg: "Envio realizado con exito",
      shipping: newUserShipping
    });
  } catch (e) {
    errorResponse(e, res);
  }

};

const updateUserShippingStatus = async (req: TypesRequest<string>, res: Response) => {
  const id = req.params.id;
  //@ts-ignore
  const status = req.body.status.toLowerCase();

  if(!ENUM_STATUS.includes(status)){
    return res.status(401).json({
      msg: "No es un status valido"
    });
  }

  const userShipping = await UserShipping.findByIdAndUpdate(id, {
    status
  }, {new: true});

  if (!userShipping) {
    return res.status(401).json({
      msg: "No existe el envio consultado"
    });
  }

  return res.status(200).json({
    userShipping
  });
};

const getUserShippings = async (req: TypesRequest<any>, res: Response) => {
  const id = req.user?._id;

  if(req.user?.rol === 'FINAL_USER'){
    const userShippings = await UserShipping.find({
      "user": id
    });
    console.log(userShippings);

    if (!userShippings.length) {
      return res.status(401).json({
        msg: "No cuentas con pedidos realizados"
      });
    }

    return res.status(200).json({
      userShippings
    });
  }

  return res.status(400).json({
    msg: 'El rol no es valido'
  })

};

const getUserShipping = async (req: TypesRequest<string>, res: Response) => {
  const id = req.params.id;

  const shipping = await UserShipping.findById(id);

  if (!shipping) {
    return res.status(401).json({
      msg: "No existe el pedido consultado"
    });
  }

  return res.status(200).json({
    shipping
  });
};


export {
  addNewUserShipping,
  getUserShippings,
  updateUserShippingStatus,
  getUserShipping
}
