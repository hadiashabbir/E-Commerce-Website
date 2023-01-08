import React, {useState} from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import {commerce} from '../lib/commerce';
import { Link } from "react-router-dom";

const AddressForm = ({checkoutToken, next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [ShippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingCountry, setShippingCountry] = useState(null);
  const [ShippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOption, setShippingOption] = useState('');
  const {register, handleSubmit} = useForm();

  var countriesList = null;
  var divisionList = null;
  
  const FetchCountryKey = (value) => {
    const list = Object.entries(shippingCountries.countries);

    const key = list.filter((event) => event[1] === value);

    setShippingCountry(key[0][0]);
  }

  const FetchRegionKey = (value) => {
    const list = Object.entries(ShippingSubdivisions.subdivisions);

    const key = list.filter((event) => event[1] === value);

    setShippingSubdivision(key[0][0]);
  }

    const fetchShippingCountries = (CheckoutTokenID) => {
    commerce.services.localeListShippingCountries(CheckoutTokenID).then((Countries) => {
      setShippingCountries(Countries);
      setShippingCountry(Object.keys(Countries.countries)[0]);
    })
  }

  
  const fetchShippingSubdivisions = (CheckoutTokenID, countryCode) => {
    commerce.services.localeListShippingSubdivisions(CheckoutTokenID, countryCode).then((Subdivisions) => {
      setShippingSubdivisions(Subdivisions);
        setShippingSubdivision(Object.keys(Subdivisions.subdivisions)[0]);
    })
  }

  const fetchShippingOptions = (CheckoutTokenID, countryCode, Subdivision) => {
    commerce.checkout.getShippingOptions(CheckoutTokenID, {country: countryCode, region: Subdivision}).then((Options) => {
      setShippingOptions(Options);
      setShippingOption(Options[0]);
    })
  }

  if (shippingCountries.length != 0) {
   countriesList  = Object.values(shippingCountries.countries);
  }

  if (ShippingSubdivisions.length != 0) {
    divisionList  = Object.values(ShippingSubdivisions.subdivisions);
  }
  
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry != null) {
      fetchShippingSubdivisions(checkoutToken.id ,shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (ShippingSubdivision != null) {
      fetchShippingOptions(checkoutToken.id ,shippingCountry, ShippingSubdivision);
    }
  }, [ShippingSubdivision]);

  const onSubmit = (data) => {
    next(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Shipping Address</h4>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='First Name*' name='firstName' {...register("firstName")} />
        </div>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='Last Name*' name='lastName' {...register("lastName")} />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='Address*' name='Address' {...register("Address")} />
        </div>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='Email*' name='Email' {...register("Email")} />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='City*' name='City' {...register("City")} />
        </div>
        <div className='col-12 col-md-6'>
          <input className='textField' required type="text" placeholder='ZIP/Postal code*' name='ZIP/PostalCode' {...register("ZIP/PostalCode")} />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <label>Shipping Country</label>
          <select aria-label="Default select example" class="form-select form-select-sm mt-2" onChange={(e) => FetchCountryKey(e.target.value)}>
            {countriesList && countriesList.map((country) => {
              return(
                <option>{country}</option>
              );
            })}
          </select>
        </div>
        <div className='col-12 col-md-6'>
        <label>Shipping Subdivision</label>
        <select aria-label="Default select example" class="form-select form-select-sm mt-2" onChange={(e) => FetchRegionKey(e.target.value)}>
            {divisionList && divisionList.map((division) => {
              return(
                <option>{division}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <label>Shipping Options</label>
          <select aria-label="Default select example" class="form-select form-select-sm mt-2" onChange={(e) => setShippingOption(e.target.value)}>
            {shippingOptions.map((option) => {
              return(
                <option>{option.description} -&nbsp;( {option.price.formatted_with_symbol})</option>
              );
            })}
          </select>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-12 col-md-6'>
        <Link to='/cart'><button className='btn btn-outline-secondary '>Back to Cart</button></Link>
        </div>
        <div className='col-12 col-md-6 text-end'>
        <button type='submit' className='btn btn-primary'>Next</button>
        </div>
      </div>
    </form>
  )
}

export default AddressForm
