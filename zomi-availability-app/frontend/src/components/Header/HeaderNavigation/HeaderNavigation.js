import {NavLink} from "react-router-dom";
import classes from './HeaderNavigation.module.css'



function HeaderNavigation() {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to='/' className={({isActive}) => isActive ? `${classes.active}` : ''} end>Schedule</NavLink> </li>
                    <li><NavLink to='/charts' className={({isActive}) => isActive ? `${classes.active}` : ''} end>Availability</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderNavigation;