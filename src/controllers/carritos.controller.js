import { InputCarritosDTO } from "../schemas/DTOs/carritos.dto.js";
import { carritosRepository } from "../schemas/carritos/carritos.repository.js";

/* export const getAllCarts = async (req, res) => {
    const carritos = await carritosRepository.find();
    res.status(200).json({ data: carritos });
};*/

export const getCartById = async (req, res) => {
  const { id } = req.params;
  const carrito = await carritosRepository.findById(id);
  if (carrito) {
    res.status(200).json({ data: carrito })
  } else {
    res.status(200).json({ data: [], message: `El carrito ${id} no ha sido encontrado` })
  }
};

export const addCart = async (req, res) => {
    const { email, items, direccion } = req.body;
    const nuevoCarrito = new InputCarritosDTO(
        email, items, direccion, Date.now()
    );

    // TODO: Verificar que no exista
    const carritos = await carritosRepository.create(nuevoCarrito);
    return res
        .status(201)
        .json({ data: carritos, message: "El carrito ha sido creado" });
};

export const deleteCartById = async (req, res) => {
    const { id } = req.params;
    const carritoDeleted = await carritosRepository.delete(id);
    if (carritoDeleted) {
        return res
            .status(201)
            .json({
                data: carritoDeleted,
                message: "El carrito ha sido eliminado",
            });
    } else {
        return res
            .status(200)
            .json({
                data: [],
                message: `El carrito ${id} no ha sido encontrado`,
            });
    }
}; 

export const modifyCartById = async (req, res) => {
    const { id } = req.params;
    const { email, direccion, items } = req.body;
    const fecha = Date.now()

    console.log(id, email, direccion, items, fecha)

    const carritoUpdated = await carritosRepository.update(id, {
        email, direccion, items, fecha
    });

    if (carritoUpdated) {
        return res
            .status(201)
            .json({
                data: carritoUpdated,
                message: "El carrito ha sido actualizado",
            });
    } else {
        return res
            .status(200)
            .json({
                data: [],
                message: `El carrito ${id} no ha sido encontrado`,
            });
    }
};