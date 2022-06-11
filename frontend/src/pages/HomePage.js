import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const json = await (
      await fetch("/api/products")
    ).json();
    setProducts(json);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
