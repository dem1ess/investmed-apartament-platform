import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { IconType } from 'react-icons';
import {GiCash} from "react-icons/gi";
import {SiTether} from "react-icons/si"; // Тип для иконок react-icons

// Определение типа для опций
interface OptionType {
    value: string;
    label: string;
    icon: React.ReactElement<IconType>;
}

// Определение типа для стилей react-select
const customStyles: StylesConfig<OptionType, false> = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
};

// Функция для форматирования отображения опций
const formatOptionLabel = ({ label, icon }: OptionType,) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {React.cloneElement(icon,
          // @ts-ignore
          { style: { marginRight: '0.5rem' } })}
        <span>{label}</span>
    </div>
);

// Опции с иконками
const options: OptionType[] = [
    { value: 'USDT', label: 'USDT', icon: <SiTether /> },
    { value: 'CASH', label: 'CASH', icon: <GiCash /> },
];

const CurrencySelector: React.FC = () => {
    return (
        <Select
            options={options}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
        />
    );
};

export default CurrencySelector;