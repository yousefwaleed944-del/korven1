const API = "/.netlify/functions";

export async function getProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export async function getOfashop() {
  const res = await fetch(`${API}/ofashop`);
  return res.json();
}
