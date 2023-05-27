import express from "express";
import ProductManager from "../manager/productManager.js";


export const routerVistaProductos = express.Router();
routerVistaProductos.get("/", (req, res) => {
  const pm = new ProductManager();
  return res.render("home", {
    titulo: "PRODUCTOS",
    productos: pm.getProducts(),
  });
});
