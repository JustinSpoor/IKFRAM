import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import {Outlet, useNavigate} from 'react-router-dom';
import classes from './Header.module.css'

function Header() {
    const navigate = useNavigate();

    function navigateHandler() {
        navigate('/')
    }


    return (
        <>
            <header className={classes.header}>
                <img src="zomi-logo.jpg" alt="A.S.C. Zomi logo" onClick={navigateHandler}/>
                <HeaderNavigation/>
            </header>
            <Outlet/>
        </>
    )
}

export default Header;