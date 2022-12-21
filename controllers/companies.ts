import { TypesRequest } from "../interfaces";
import { Response } from "express";
import { Company, User } from "../models";
import { errorResponse } from "../helpers";

interface CompanyProps {
  id?: string,
  img: string,
  name: string,
  description: string
}

const setInitialCompanyInfo = async (req: TypesRequest<CompanyProps>, res: Response) => {
  const id = req.user?._id;

  const user = await User.findById(id);
  const existCompanyInfo = await Company.find({
    user: id
  })

  if(existCompanyInfo){
    return res.status(201).json({
      msg: 'mal uso de peticion',
    });
  }

  if(!user){
    return res.status(200).json({
      msg: 'Al perecer tu cuenta no esta activa'
    });
  }

  const company = new Company({
    user: id,
    name: req.body.name,
    description: req.body.description
  })

  try {
    await company.save();

    return res.status(201).json({
      msg: 'datos guardados correctamente',
      company
    });

  } catch (e) {
    errorResponse(e, res);
  }

};

const updateCompanyInfo = async (req: TypesRequest<CompanyProps>, res: Response) => {
  const id = req.params.id;

  const company = await Company.findByIdAndUpdate(id, {
    ...req.body
  });

  if(!company){
    return res.status(200).json({
      msg: 'Al perecer tu cuenta de companias no esta activa'
    });
  }

  return res.status(200).json({
    msg: 'datos actualizados correctamente'
  });
};

const getCompanyInfo = async (req: TypesRequest<string>, res: Response) => {
  const id = req.user?._id;

  const company = await Company.findOne({
    user: id
  })

  if(!company){
    return res.status(200).json({
      msg: 'Al perecer tu cuenta de companias no esta activa'
    });
  }

  return res.status(200).json({
    company
  });
};

export {
  setInitialCompanyInfo,
  updateCompanyInfo,
  getCompanyInfo
}
