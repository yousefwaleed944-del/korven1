import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false })
        .limit(4);

      setProducts(data || []);
    }
    load();
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero-clean">
        <h1>KORVEN</h1>
        <p>Modern streetwear made to stand out.</p>

        <Link to="/products" className="btn-main">
          Shop Collection
        </Link>
      </section>

      {/* PRODUCTS */}
      <section className="home-products">
        <h2>New Arrivals</h2>

        <div className="home-grid">
          {products.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="home-card">
              <img src={p.images?.[0]} alt={p.name} />
              <h3>{p.name}</h3>
              <span>{p.price} EGP</span>
            </Link>
          ))}
        </div>

        <Link to="/products" className="btn-outline">
          View All
        </Link>
      </section>

    </div>
  );
}

export default Home;
