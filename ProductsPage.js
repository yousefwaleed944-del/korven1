import ProductCard from "./ProductCard";

function ProductsPage() {

  const products = [
    {
      name: "poma Sweet Pants",
      price: 500,
      image: "https://i.postimg.cc/YSp4ZXj0/IMG_4327.jpg"
    },
    {
      name: "black Tank Top",
      price: 350,
      image: "https://i.postimg.cc/FFnjcQzC/Untitled_design_zip_1.png"
    },
    {
      name: "oil and black sweet pans",
      price:500,
      image: "https://i.postimg.cc/QNnp5rCz/IMG_0452.jpg"
    }
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        Our Products
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {products.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
