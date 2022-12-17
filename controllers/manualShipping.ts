import { TypesRequest } from "../interfaces";
import { Response } from "express";
import ManualShipping from "../models/ManualShipping";

const getShipping = (req:TypesRequest<any>,res:Response) => {
  console.log(req.user);

  return res.status(200).json({
    msg: 'hello world'
  })
};

const addNewShipping = (req:TypesRequest<any>,res:Response) => {
  console.log(req.body);


  const newShipping = new ManualShipping();

  return res.status(200).json({
    msg: 'hello world post'
  })
};




export {
  getShipping,
  addNewShipping
}
