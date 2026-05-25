"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
    const res = await fetch(`${BASE_URL}/food-products`);
    const json = await res.json();
    return json?.data || [];
  };

  const fetchCategories = async () => {
    const res = await fetch(`${BASE_URL}/food-categories`);
    const json = await res.json();
    return json?.data || [];
  };

  const loadMenuData = async () => {
    try {
      setLoading(true);
      const [foodsData, categoriesData] = await Promise.all([
        fetchFoods(),
        fetchCategories(),
      ]);

      setFoods(foodsData);
      setCategories(categoriesData.filter((c) => c.status === "Active"));
    } catch (err) {
      setError("Failed to load menu data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuData();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        foods,
        categories,
        loading,
        error,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
