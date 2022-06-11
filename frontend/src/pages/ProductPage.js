import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Ratings from "../components/Ratings";
import { useCallback, useEffect, useState } from "react";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const getProduct = useCallback(async () => {
    const json = await (
      await fetch(`/api/products/${id}`)
    ).json();
    setProduct(json);
  }, [id]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Ratings
                rating={product.rating}
                text={`${product.numReviews} reviews`}
                colour={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: £{product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-grid">
                <Button className="btn-block" disabled={product.countInStock===0} type="button">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
