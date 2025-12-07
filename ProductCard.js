function ProductCard({ name, price, image }) {

  return (
    <div
      style={{
        width: "260px",
        padding: "15px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        margin: "20px auto"
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "280px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <h3 style={{ marginTop: "12px", fontSize: "20px" }}>{name}</h3>
      <p style={{ color: "#555", marginTop: "5px", fontSize: "18px" }}>
        ${price}
      </p>
    </div>
  );
}

export default ProductCard;
