import { useState } from 'react';

export const useForm = <T extends Record<string, string>>(initState: T): {
    form: T;
    onChange: (_value: string, _field: keyof T) => void;
} & T => {

    const [state, setState] = useState(initState);

    const onChange = (value: string, field: keyof T): void => {
        setState({
            ...state,
            [field]: value
        });
    }

    return {
        ...state,
        form: state,
        onChange,
    };
};
