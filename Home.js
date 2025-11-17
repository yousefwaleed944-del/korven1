import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Elevate Your Style</h1>
          <p>Discover the new collection of modern fashion and streetwear.</p>
          <button className="btn-primary">Shop the Look</button>
        </div>
        <div className="hero-image">
          <img src="https://i.postimg.cc/cJXKSQ8w/IMG_7106.jpgE31-BEB7-5189E639C5F5.jpg" alt="Hero Fashion" />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {/* Card 1 */}
          <div className="product-card">
            <img src="https://i.postimg.cc/G3SkY191/IMG_4634.jpg" alt="Product 1" />
            <h3>sweet pans</h3>
            <p className="price">$500</p>
          </div>
          {/* Card 2 */}
          <div className="product-card">
            <img src="https://i.postimg.cc/fR7tH4zg/IMG_7126.jpg" alt="Product 2" />
            <h3>sweet pans</h3>
            <p className="price">$500</p>
          </div>
          {/* Card 3 */}
          <div className="product-card">
            <img src="https://i.postimg.cc/fLPJ3DCV/IMG_4656.jpg" alt="Product 3" />
            <h3>sweet pans</h3>
            <p className="price">$500</p>
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
  