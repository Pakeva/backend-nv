import { ManualShippingProps, TypesRequest } from "../interfaces";
import { Response } from "express";
import { User, UserShipping } from "../models";
import { errorResponse } from "../helpers";

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

  console.log(newUserShipping);

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

export {
  addNewUserShipping
}
