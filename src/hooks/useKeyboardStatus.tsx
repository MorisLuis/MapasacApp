import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardStatus = (): boolean => {
    const [keyboardActive, setKeyboardActive] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardActive(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardActive(false);
            }
        );

        return () : void => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return keyboardActive;
};

export default useKeyboardStatus;
