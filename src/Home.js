import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Elevate Your Style</h1>
          <p>Discover the new collection of modern fashion and streetwear.</p>

          <Link to="/products">
            <button className="btn-primary">Shop the Look</button>
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://i.postimg.cc/cJXKSQ8w/IMG_7106.jpgE31-BEB7-5189E639C5F5.jpg"
            alt="Hero Fashion"
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Featured Products</h2>

        <div className="featured-grid">

          {/* Card 1 */}
          <div className="featured-card">
            <img src="https://i.postimg.cc/G3SkY191/IMG_4634.jpg" alt="Product 1" />
            <h3>black tank top ,Trapstar sweet pants</h3>
          </div>

          {/* Card 2 */}
          <div className="featured-card">
            <img src="https://i.postimg.cc/BnR5j3M3/IMG_1722.jpg" alt="Product 2" />
            <h3>black tank top ,black sweet pants</h3>
          </div> 

          {/* Card 3 */}
          <div className="featured-card">
            <img src="https://i.postimg.cc/NMThqdSq/IMG-1748(1).png" alt="Product 3" />
            <h3>black tank top ,poma sweet pants</h3>
          </div>

          {/* Card 4 */}
          <div className="featured-card">
            <img src="https://i.postimg.cc/3x1Lfpsy/IMG_0383.jpg" alt="Product 4" />
            <h3>oil and black sweet pants</h3>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 YourBrand. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
