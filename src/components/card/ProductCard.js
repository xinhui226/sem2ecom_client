import React from "react";
import { Button, Card } from "react-daisyui";
import { Link } from "react-router-dom";

const Productcard = ({ product }) => {
  return (
    <Link to={`/dashboard/admin/product/${product.slug}`}>
      <Card className="border-none">
        <Card.Image
          src={`http://localhost:7100/products/img/${product._id}`}
          alt={product.name}
          className="max-w-[300px]"
        />
        <Card.Body>
          <Card.Title className="font-semibold flex justify-center text-base">
            {product.name}
          </Card.Title>
          <p className="text-sm">{product.desc.substring(0, 30)}...</p>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Productcard;
