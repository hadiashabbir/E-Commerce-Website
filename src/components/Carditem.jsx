import React from 'react';
import { Card, CardImg, CardBody, CardTitle} from "reactstrap";

const Carditem = ({item, products, HandleUpdateOnCart, HandleRemoveOnCart}) => {
    const product = products.filter((e) => e.id === item.product_id)[0];
  return (
    <div className='col-12 col-md-4'>
      <Card>
        <CardImg src={product.image.url} alt="image" height="180px" width="200px"/>
        <CardBody>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                <CardTitle><h5>{item.name}</h5></CardTitle>
                    </div>
                    <div className="col-md-5 offset-md-1 col-sm-12">
                <CardTitle><h5>{item.price.formatted_with_symbol}</h5></CardTitle>
                    </div>
                </div>
                <div className="row mt-2">
                <div className='col-12 col-md-5'>
                <button className="btn me-2 px-2 py-0 btn-border_display" onClick={() => HandleUpdateOnCart(item.id, item.quantity + 1)}><i className="fa fa-plus fa-2xs"></i></button>
                <span>{item.quantity}</span>
                <button className="btn ms-2 px-2 py-0 btn-border_display" onClick={() => HandleUpdateOnCart(item.id, item.quantity - 1)}><i className="fa fa-minus"></i></button>
                </div>
                <div className='col-12 col-md-7'>
                <button className="btn btn-danger" onClick={() => HandleRemoveOnCart(item.id)}>Remove</button>
                </div>
                </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Carditem
