import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem} from "reactstrap";
import commerce from "../assets/commerce.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({itemCount}) => {
  const location = useLocation();
  return (
    <Navbar className='nav_custom'>
      <NavbarBrand href='/'><img src={commerce} height="30" width="30" alt='' />  Commerce.js</NavbarBrand>
      <Nav navbar>
        {!(location.pathname === '/cart')? 
        <NavItem>
          <Link className="nav-link"  to='/cart'>
          <button type="button" class="btn position-relative bg-none">
          <i className="fa fa-shopping-cart fa-lg"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger set-postion">
              {itemCount}
            </span>
          </button>
          </Link>
      </NavItem> : null
      }
    </Nav>
    </Navbar>
  )
}

export default Header;
