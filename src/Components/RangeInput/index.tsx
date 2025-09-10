import styles from './index.module.scss';

import Input from 'Components/Input';

import { TiArrowRightThick } from "react-icons/ti";


export default function RangeInput() {
    return (
        <div className={styles.rangeInputContainer}>
            <Input type="number" placeholder='0' />
            <TiArrowRightThick className={styles.icon} />
            <Input type="number" placeholder='1000' />
        </div>
    )
}