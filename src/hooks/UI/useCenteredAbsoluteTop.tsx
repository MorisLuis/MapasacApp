import { useState, useMemo, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useCenteredAbsoluteTop() {
    const [parentHeight, setParentHeight] = useState(0);
    const [childHeight, setChildHeight] = useState(0);

    const onParentLayout = useCallback((e: LayoutChangeEvent) => {
        setParentHeight(e.nativeEvent.layout.height);
    }, []);

    const onChildLayout = useCallback((e: LayoutChangeEvent) => {
        setChildHeight(e.nativeEvent.layout.height);
    }, []);

    const top = useMemo(() => {
        if (!parentHeight || !childHeight) return 0;
        return (parentHeight - childHeight) / 2;
    }, [parentHeight, childHeight]);

    return {
        top,
        onParentLayout,
        onChildLayout
    };
}
