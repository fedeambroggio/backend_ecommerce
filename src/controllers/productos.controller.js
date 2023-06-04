import { productosRepository } from "../schemas/productos/productos.repository.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const { id } = req.query;

        if (id) {
            const producto = await productosRepository.findById(id);
            if (producto) {
                res.status(200).json({ data: producto });
            } else {
                res.status(200).json({
                    data: [],
                    message: `El producto ${id} no ha sido encontrado`,
                });
            }
        } else {
            const productos = await productosRepository.find();
            res.status(200).json({ data: productos });
        }
    } catch (error) {
        next(error);
    }
};

export const getProductByCategory = async (req, res, next) => {
    try {
        const { categoria } = req.params;

        const producto = await productosRepository.find({
            categoria: { $eq: categoria },
        });
        if (producto) {
            res.status(200).json({ data: producto });
        } else {
            res.status(200).json({
                data: [],
                message: `La categoria ${categoria} no ha sido encontrada`,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { foto, descripcion, precio, categoria } = req.body;
        const nuevoProductoData = { foto, descripcion, precio, categoria };
        
        const productos = await productosRepository.create(nuevoProductoData);
        return res
            .status(201)
            .json({ data: productos, message: "El producto ha sido creado" });
    } catch (error) {
        next(error);
    }
};

export const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productoDeleted = await productosRepository.delete(id);
        if (productoDeleted) {
            return res.status(201).json({
                data: productoDeleted,
                message: "El producto ha sido eliminado",
            });
        } else {
            return res.status(200).json({
                data: [],
                message: `El producto ${id} no ha sido encontrado`,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const modifyProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { foto, descripcion, precio, categoria } = req.body;

        const productoUpdated = await productosRepository.update(id, {
            foto,
            descripcion,
            precio,
            categoria,
        });

        if (productoUpdated) {
            return res.status(201).json({
                data: productoUpdated,
                message: "El producto ha sido actualizado",
            });
        } else {
            return res.status(200).json({
                data: [],
                message: `El producto ${id} no ha sido encontrado`,
            });
        }
    } catch (error) {
        next(error);
    }
};
