import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL,IMGUrl } from "../config/apiConfig";
const MenuDocumentsContext = createContext();

export const useMenuDocuments = () => {
  const context = useContext(MenuDocumentsContext);
  if (!context) {
    throw new Error('useMenuDocuments must be used within a MenuDocumentsProvider');
  }
  return context;
};

export const MenuDocumentsProvider = ({ children }) => {
  const [menuDocuments, setMenuDocuments] = useState({
    gaming_menu: '',
    overall_menu: '',
    cafe_menu: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchMenuDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/menu-documents`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 200 && data.data && data.data.length > 0) {
        const documents = data.data[0];
        setMenuDocuments({
          gaming_menu: documents.gaming_menu ? `${IMGUrl}/${documents.gaming_menu}` : '',
          overall_menu: documents.overall_menu ? `${IMGUrl}/${documents.overall_menu}` : '',
          cafe_menu: documents.cafe_menu ? `${IMGUrl}/${documents.cafe_menu}` : ''
        });
      } else {
        throw new Error('No menu documents found');
      }
    } catch (err) {
      console.error('Error fetching menu documents:', err);
      setError(err.message);
      // Set fallback URLs if API fails
      setMenuDocuments({
        gaming_menu: `${IMGUrl}/fnf-menu.pdf`,
        overall_menu: `${IMGUrl}/FeeltheRealRacingThrill.pdf`,
        cafe_menu: `${IMGUrl}/MENU.pdf`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuDocuments();
  }, []);

  const value = {
    menuDocuments,
    loading,
    error,
    refetch: fetchMenuDocuments
  };

  return (
    <MenuDocumentsContext.Provider value={value}>
      {children}
    </MenuDocumentsContext.Provider>
  );
};

export default MenuDocumentsContext;
