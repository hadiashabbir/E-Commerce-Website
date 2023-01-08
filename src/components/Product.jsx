import React from "react";
import { Card, CardBody, CardTitle, CardImg, CardGroup, CardText} from "reactstrap";

const Product = ({product, onAddCart}) => {
    return(
        <div className="col-12 col-md-3">
        <CardGroup>
        <Card>
            <CardImg top width="200px" height="180px" src={product.image.url}/>
            <CardBody>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                <CardTitle><h5>{product.name}</h5></CardTitle>
                    </div>
                    <div className="col-md-5 offset-md-1 col-sm-12">
                <CardTitle><h5>{product.price.formatted_with_symbol}</h5></CardTitle>
                    </div>
                </div>
                <CardText dangerouslySetInnerHTML={{ __html: product.description}}></CardText>
            <div className="row justify-content-end mt-2">
            <button className="btn btn-social-icon btn-border" onClick={() => {onAddCart(product.id, 1)}}><i className="fa fa-shopping-cart"></i>
            </button>
            </div>
            </CardBody>
        </Card>
        </CardGroup>
        </div>
    );
}

export default Product;