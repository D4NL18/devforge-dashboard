import styles from './index.module.scss';

import Input from 'Components/Input';

import { TiArrowRightThick } from "react-icons/ti";

interface RangeInputProps {
    valueMin: number;
    valueMax: number;
    onChangeMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function RangeInput({valueMin, valueMax, onChangeMin, onChangeMax}: RangeInputProps) {
    return (
        <div className={styles.rangeInputContainer}>
            <Input type="number" placeholder='0' value={valueMin.toString()} onChange={onChangeMin} />
            <TiArrowRightThick className={styles.icon} />
            <Input type="number" placeholder='1000' value={valueMax.toString()}  onChange={onChangeMax} />
        </div>
    )
}