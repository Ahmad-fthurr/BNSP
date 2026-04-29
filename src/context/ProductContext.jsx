import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const API_URL = "https://fathur.petik.or.id/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get(`${API_URL}/produk`),
        axios.get(`${API_URL}/kategori`),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (userId) => {
    if (!userId) return;
    setLoadingOrders(true);
    try {
      const res = await axios.get(`${API_URL}/order`);
      // Filter orders by user_id
      const userOrders = res.data.filter(order => order.user_id === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.kategori_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts: products,
        categories,
        orders,
        fetchOrders,
        loading,
        loadingOrders,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        refreshProducts: fetchData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

export const useProducts = () => useContext(ProductContext);
