import styles from './index.module.scss';

import Input from 'Components/Input';
import { useEffect } from 'react';

import { TiArrowRightThick } from "react-icons/ti";

interface RangeInputProps {
    valueMin: number;
    valueMax: number;
    onChangeMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RangeInput({ valueMin, valueMax, onChangeMin, onChangeMax }: RangeInputProps) {

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val < 0) return; 
        onChangeMin(e);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val < 0) return;
        onChangeMax(e);
    };

    return (
        <div className={styles.rangeInputContainer}>

            <Input 
                type="number" 
                placeholder='0' 
                value={valueMin.toString()} 
                onChange={handleMinChange}
            />
            
            <TiArrowRightThick className={styles.icon} />
            
            <Input 
                type="number" 
                placeholder='1000' 
                value={valueMax.toString()}  
                onChange={handleMaxChange}
            />
        </div>
    )
}