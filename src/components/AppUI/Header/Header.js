import React, { useState } from 'react'
import classes from './Header.module.scss'
import CutCircleSVG from '../../../assets/images/cut-circle.svg';
import StateSVG from '../../../assets/images/vn.svg';

function Header(props) {
  const [isActive, setActive] = useState(false);
  setTimeout(() => {
    setActive(true)
  }, 500)

  return (
    <div className={classes.Header_Wrapper}>
      <div className={isActive ? 'is-active' : ''}>
        <div className={classes.Absolute_Header}>
          <div className={classes.Header_Inner}>
            <img className={classes.Header_Inner__cut_circle} src={CutCircleSVG} alt=''/>
            <img className={classes.Header_Inner__state} src={StateSVG} alt='' />
          </div>
        </div>
    </div>
    </div>
  )
}

Header.propTypes = {

}

export default Header;

