import { TypesRequest } from "../interfaces";
import { Response } from "express";
import { Category, Product, User } from "../models";
import { uploadFile } from "../helpers";
import dotenv from 'dotenv';
dotenv.config();
import cloudinaryV2 from "cloudinary"
const cloudinary = cloudinaryV2.v2;
cloudinary.config({
  cloud_name: 'dij7fdpqo',
  api_key: '572311711498636',
  api_secret: 'LaSwyBzVjJVJcMur4wPia54vGe8'
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_KEY,
  // api_secret: process.env.CLOUD_SECRET
});

const cargaArchivo = (req: TypesRequest<string>, res: Response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No se cargaron archivos a subir"
    });
  }

  const { archivo } = req.files;
  const cutName = archivo.name.split(".");
  const extension = cutName[cutName.length - 1];

  const validExtensions = ["png", "jpeg", "jpg"];
  if (!validExtensions.includes(extension)) {
    res.status(400).json({
      msg: `El formato no es valido`,
    });
  }

  const uploadPath = __dirname + "/uploads" + archivo.name;
  archivo.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.status(200).json({ msg: "success" });
  });
};

const updateImageLocal = async (req: TypesRequest<string>, res: Response) => {

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

    default:
      return res.status(500).json({ msg: "We need implement this case" });
  }

  const name = await uploadFile(req.files);
  console.log(name);

  model.img = name;
  // await model.save();

  res.status(200).json({
    msg: "success"
  });
};

const updateImage = async (req: TypesRequest<string>, res: Response) => {

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

    default:
      return res.status(500).json({ msg: "We need implement this case" });
  }

  if(model.img){
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length -1];
    const [public_id] = name.split('.');
    await cloudinary.uploader.destroy(public_id);
  }

  //TODO FIX, NO SE RECUPERA VARIABLE DE ENTORNO
  console.log(process.env.CLOUDINARY_URL);
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

    default:
      return res.status(500).json({ msg: "We need implement this case" });
  }

  res.json({ msg: "success" });
};

export {
  cargaArchivo,
  updateImage,
  getImage
};
