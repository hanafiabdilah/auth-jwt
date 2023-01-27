import React, { useState } from "react"
import style from './alert.module.css'
import css from 'classnames'

export const Alert = ({ children, type, message }) => {
    const [isShow, setIsShow] = useState(true);

    const renderElAlert = () => {
        return React.cloneElement(children);
    }

    const handleClose = (e) => {
        e.preventDefault();
        setIsShow(false);
    };

    return (
        <div className={css(style.alert, style[type], !isShow && style.hide)}>
            <span className={style.closebtn} onClick={handleClose}>&times;</span>
            {children ? renderElAlert() : message}
        </div >
    )
}