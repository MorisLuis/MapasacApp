// authCallbacks.ts

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (callback: () => void): void => {
    onUnauthorized = callback;
};

// También exportas las funciones de los callbacks en caso de que las necesites directamente
export const triggerUnauthorized = () : void => {
    if (onUnauthorized) {
        onUnauthorized();
    }
};