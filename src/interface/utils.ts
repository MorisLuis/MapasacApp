export interface ClientInterface {
    idclientes: number;
    nombres: string;
    ncomercial: string;
}

export interface ModuleInterface {
    module: 'Sells' | "Sells-Restaurant" | 'Inventory'
}

export type Platforms = "ios" | "android" | "windows" | "macos" | "web";

