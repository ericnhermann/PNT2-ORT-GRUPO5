import axios from "axios";

const BASE_URL = "https://684b539e165d05c5d35c2c38.mockapi.io/api/Recetas";

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
// Nota: Parece que hay un bug conocido en MockApi, que no permite buscar por ID directamente. Hago este workaround a razon de que el proyecto funcione.
export const getRecetaById = async (id) => {
  try {
    console.log("Fetching all recetas to find ID:", id);
    const response = await axios.get(BASE_URL); // trae todo
    const recetas = response.data;

    // Buscar la receta con el ID que pediste
    const receta = recetas.find((r) => String(r.id) === String(id));

    if (!receta) {
      throw new Error(`Receta con id ${id} no encontrada`);
    }

    return receta;
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
