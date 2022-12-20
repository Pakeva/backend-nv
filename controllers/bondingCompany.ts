import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {errorResponse} from "../helpers";
import {User} from "../models";
import BondingCompany from "../models/bondingCompany";
import BondingAssociated from "../models/bondingAssociated";

interface BondingCompaniesProps {
  id?: string,
  companyId: string
}

const addUserToCompany = async (req: TypesRequest<BondingCompaniesProps>, res: Response) => {
  const {companyId} = req.body
  console.log(companyId)

  // const company = await User.findById(companyId);
  //
  // if (!company) {
  //   return res.status(401).json({
  //     msg: 'La compania fue eliminada o dado de baja'
  //   })
  // }
  //
  // const existsBondingCompany = await BondingCompany.findOne({
  //   user: req.user?._id,
  //   company: companyId
  // })
  //
  // if (existsBondingCompany) {
  //   return res.status(401).json({
  //     msg: 'Ya esta vinculado esta compania'
  //   })
  // }
  //
  // const newBondingCompany = new BondingCompany({
  //   user: req.user?._id,
  //   company: companyId
  // })
  //
  // //TODO VALIDATION COMPANY ROL TO BONDING
  // try {
  //   await newBondingCompany.save();
  //
  //   res.status(201).json({
  //     msg: 'Vinculacion realizada con exito',
  //   })
  // } catch (e) {
  //   errorResponse(e, res)
  // }
}

const getBondingCompaniesToUser = async (req: TypesRequest<BondingCompaniesProps>, res: Response) => {
  const bonding = await BondingCompany.find({
    user: req.user?._id
  });

  if(bonding.length === 0){
    return res.status(200).json({
      msg: 'No cuentas con ninguna compania vinculada',
    })
  }

  let companies;

  try{
    companies = await Promise.all(bonding.map(el =>
      User.find({
        _id: el.company
      })
    ))

    res.status(200).json({
      msg: 'success',
      companies: companies.flat()
    })

  } catch (e){
    errorResponse(e, res)
  }

}

const deleteBoundingCompany = async (req: TypesRequest<BondingCompaniesProps>, res: Response) => {
  console.log('aaa');
  const {id} = req.params;
  const existCompany = await BondingCompany.find({
    user: req.user?._id,
    company: id
  })


  if(existCompany.length === 0){
    return res.status(200).json({
      msg: 'Ya has eliminado esta compania o no se encuentra disponible',
    })

  }

  await BondingCompany.remove({company: id});


  res.status(200).json({
    msg: 'Compania eliminada correctamente',
  })
}

export {
  addUserToCompany,
  getBondingCompaniesToUser,
  deleteBoundingCompany
}
