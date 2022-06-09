import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Ratings
              rating={product.rating}
              text={`${product.numReviews} reviews`}
              colour={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
