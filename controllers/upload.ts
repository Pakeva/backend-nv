import { TypesRequest } from "../interfaces";
import { Response } from "express";
import { Category, Company, Product, User } from "../models";
import dotenv from 'dotenv';
dotenv.config();
import cloudinaryV2 from "cloudinary"
const cloudinary = cloudinaryV2.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'dij7fdpqo',
  api_key: process.env.CLOUD_API_KEY || '572311711498636',
  api_secret: process.env.CLOUD_API_SECRET || 'LaSwyBzVjJVJcMur4wPia54vGe8'
});


const updateImage = async (req: TypesRequest<string>, res: Response) => {

  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un usuario con el id establecido"
        });
      }
      break;

    case "categories":
      model = await Category.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe una categoria con el id establecido"
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un producto con el id establecido"
        });
      }
      break;

    case "companies":
      model = await Company.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un producto con el id establecido"
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "We need implement this case" });
  }

  if(model.img){
    // @ts-ignore
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length -1];
    const [public_id] = name.split('.');
    await cloudinary.uploader.destroy(public_id);
  }

  // @ts-ignore
  if(!req.files){
    return res.status(500).json({ msg: "Es necesaria la imagen" });
  }
  // @ts-ignore
  const {tempFilePath} = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.status(200).json({
    msg: "success",
    url: secure_url
  });
};

const getImage = async (req: TypesRequest<string>, res: Response) => {

  const {
    id,
    collection
  } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un usuario con el id establecido"
        });
      }
      break;

    case "categories":
      model = await Category.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe una categoria con el id establecido"
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un producto con el id establecido"
        });
      }
      break;

    case "companies":
      model = await Company.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: "No existe un producto con el id establecido"
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "We need implement this case" });
  }

  res.json({ msg: "success" });
};

export {
  updateImage,
  getImage
};
