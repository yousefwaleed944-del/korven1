import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .then(({ data, error }) => {
        if (!error) setProducts(data);
      });
  }, []);

  return products;
}
