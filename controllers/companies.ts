import { TypesRequest } from "../interfaces";
import { Response } from "express";

const updateCompanyInfo = async (req: TypesRequest<string>, res: Response) => {
  return res.status(200).json({
    msg: 'hello world'
  });
};

export {
  updateCompanyInfo
}
