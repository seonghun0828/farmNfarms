import React from "react";
import styles from './Checkbox.module.css'

const Checkbox = ({size, id, name, value, checked}) => {
    const boxSize = `checkbox-${size}`;
    return <input type='checkbox' className={styles[boxSize]} id={id} name={name} value={value} checked={checked} />
}

export default Checkbox;