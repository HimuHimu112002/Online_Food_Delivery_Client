import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { Button } from 'react-bootstrap';
import { GoArrowRight } from "react-icons/go";

function NavMenu() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let data = useSelector((state)=> state.userLoginInfo.userInfo)

  let [show,setShow]= useState(false)
  let [name,setSearch]= useState("")

  let handleLogout = () =>{
    dispatch(userLoginInfo(null)),
    localStorage.removeItem("userInfo")
    localStorage.clear();
    navigate("/login")
  }
  let handleSearch = ()=>{
    navigate(`/search/${name}`)
  }
  return (
    <Navbar expand="lg shadow py-4">
      <Container>

        <h2>Pti.</h2>
        <div className='Nav__layout'>

          <Form className="NavSearchBox m-auto shadow-sm">
            <Form.Control
            onChange={(e)=>setSearch(e.target.value)}
            type="search"
            placeholder="Search Food"
            className="NavSearchBox__Size outline-none"
            aria-label="Search"
            />
            <CiSearch className='Search__icon' />
            <Button onClick={handleSearch} className='nav__search--btn'>Search <GoArrowRight className='footer__search--icon'/> </Button>
          </Form>

          <div className='menu__item'>
            <Link to="/"><p>Home</p></Link>
            <Link to="/product"><p>All Food</p></Link>
            {!data &&
              <Link to="/login"><p className='LoginButton px-2 py-1 rounded text-white'>Login</p></Link>
            }
          </div>
        </div>

        {data &&
          <div className='profile__section'>
            <CgProfile onClick={()=>setShow(!show)}/>

            {show &&
              <div className='bg-dark profile__account'>
                <Button onClick={handleLogout} className='LogOutBtn'>Logout</Button>
                <Link to="/profile"><Button className='LogOutBtn'>Profile</Button></Link>
                <Link to="/dash"><Button className='LogOutBtn'>Dashboard</Button></Link>
              </div>
            }
          </div>
        }
      </Container>
    </Navbar>
  );
}
export default NavMenu;