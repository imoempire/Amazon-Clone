import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./styles.css";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../Firebase/firebase";

function Header() {
  const [{basket, user}, dispatch]= useStateValue();
  
  const handleAuth=()=>{
    if(user){
      auth.signOut();
      console.log(user?.email);
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://i2.wp.com/www.jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png"
          alt="logo"
        />
      </Link>
      <div className="header__search">
        <input className="header_searchInput" type="text" />
        {/* Search logo */}
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && './login'}>
        <div onClick={handleAuth} className="header__option">
          <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
          <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasket />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
