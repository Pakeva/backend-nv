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

  const company = await User.findById(companyId);

  if (!company) {
    return res.status(401).json({
      msg: 'La compania fue eliminada o dado de baja'
    })
  }

  const existsBondingCompany = await BondingCompany.findOne({
    user: req.user?._id,
    company: companyId
  })

  if (existsBondingCompany) {
    return res.status(401).json({
      msg: 'Ya esta vinculado esta compania'
    })
  }

  const newBondingCompany = new BondingCompany({
    user: req.user?._id,
    company: companyId
  })

  //TODO VALIDATION COMPANY ROL TO BONDING
  try {
    await newBondingCompany.save();

    res.status(201).json({
      msg: 'Vinculacion realizada con exito',
    })
  } catch (e) {
    errorResponse(e, res)
  }
}

const getBondingCompaniesToUser = async (req: TypesRequest<BondingCompaniesProps>, res: Response) => {
  const bonding = await BondingCompany.find({
    user: req.user?._id
  });

  //TODO GET ALL THE COMPANIES
  // const idAssociateds = bonding.map(bond => bond.associated);

  //Fix this
  let company, companies;
  try {
    companies = await User.findById(bonding[0].company)
    if(companies){
      return res.status(200).json({
        msg: 'Success',
        //GET ALL ASOCIATEDs
        companies: companies
      })
    }

  } catch (e) {
    errorResponse(e, res)
  }

  try {
    // @ts-ignore
    company = await User.findById(bonding.company)
    if(company){
      return res.status(200).json({
        msg: 'Success',
        //GET ALL ASOCIATEDs
        companies: company
      })
    }
  } catch (e) {
    errorResponse(e, res)
  }
}


export {
  addUserToCompany,
  getBondingCompaniesToUser
}
