import axios from 'axios';

const BASE_URL = 'https://684b539e165d05c5d35c2c38.mockapi.io/api/Recetas';

// Obtener todas las recetas
export const getAllRecetas = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Obtener una receta por ID
export const getRecetaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Crear una nueva receta
export const createReceta = async (recetaData) => {
    try {
        const response = await axios.post(BASE_URL, recetaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Actualizar una receta existente
export const updateReceta = async (id, recetaData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, recetaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Eliminar una receta
export const deleteReceta = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
