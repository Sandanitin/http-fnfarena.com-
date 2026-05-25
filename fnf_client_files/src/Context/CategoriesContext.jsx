"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const result = await response.json();

      if (result?.status === 200) {
        const activeCategories = result.data.filter(
          (cat) => cat.status === "Active"
        );
        setCategories(activeCategories);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      // console.error("Category API error:", err);
      setError("Unable to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, error }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used inside CategoriesProvider");
  }
  return context;
};
