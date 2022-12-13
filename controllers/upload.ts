import { TypesRequest } from "../interfaces";
import { Response } from "express";

const uploadFile = (req: TypesRequest<string>, res: Response) => {
  res.status(200).json({
    msg:'fierro'
  })
};


export {
  uploadFile
}
