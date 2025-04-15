
// AuthService.ts
let isLoggingOut = false;

export const getIsLoggingOut = () : boolean => isLoggingOut;

export const setIsLoggingOut = (value: boolean) : void => {
    isLoggingOut = value;
};