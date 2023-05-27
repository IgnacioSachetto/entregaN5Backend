import express from "express";
import ProductManager from "../manager/productManager.js";
import CartManager from "../manager/cartManager.js";

export const routerCarts = express.Router();

// Get '/' Carrito
routerCarts.get('/', async (req, res, next) => {
  try {
    const cm = new CartManager('./src/carrito.json');
    const carts = await cm.getCarts();
    return res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
});

// Get '/:cid' Carrito
routerCarts.get('/:cid', async (req, res, next) => {
  const cid = req.params.cid;

  try {
    const cm = new CartManager('./src/carrito.json');
    const cart = await cm.getCartById(cid);

    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).send('Carrito no encontrado');
    }
  } catch (err) {
    next(err);
  }
});

// Post '/' Carrito
routerCarts.post('/', async (req, res, next) => {
  const products = req.body.products;

  try {
    const cm = new CartManager('./src/carrito.json');
    const newCart = await cm.addCart(products);
    return res.status(200).json(newCart);
  } catch (err) {
    next(err);
  }
});

// Post ''/':cid/products/:pid' para agregar un producto dentro de un carrito
routerCarts.post('/:cid/products/:pid', async (req, res, next) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const pm = new ProductManager('../productos.json');
  const product = await pm.getProductById(pid);

  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }

  try {
    const cm = new CartManager('./src/carrito.json');
    const updatedCart = await cm.addProductToCart(cid, pid);

    return res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
});
