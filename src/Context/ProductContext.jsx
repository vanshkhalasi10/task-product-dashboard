import { createContext, useCallback, useEffect, useState } from "react";
import api from "../services/api";


export const ProductConext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    //Fetching Product
    const fetchProduct = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await (api.get("/products"));
            setProducts(res.data)
        } catch (error) {
            setError("Failed To Fetch Products");
            console.error(err);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchProduct()
    }, [fetchProduct]);

   
const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return
    try {
        await api.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
        console.error("Failed to delete product", error);
    }
};

return (
    <ProductConext.Provider
        value={{
            products,
            setProducts,
            loading,
            error,
            handleDelete,
            fetchProduct
        }}
    >
        {children}
    </ProductConext.Provider>
)
}

