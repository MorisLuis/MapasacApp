
// Table: usrmob
export default interface UserInterface {

    // Id of the user.
    idusrmob: number;

    // The number specify the "sucural" ( almacen ).
    idsucursal: number;

    // The name of the user.
    nombres?: string;

    // The user namre or alias.
    usr?: string;

    // The password of the account.
    pas?: string;

    // The server path.
    svr?: string;

    // The database name.
    dba?: string;

    // The port of the connectio database.
    port: number;

    // The user name of the database
    usrdba: string;

    // The user password of the database
    pasdba: string;

    // Specify the status of the user
    activo?: number;

    // Specify when the use was created.
    alta?: Date;

    empresa?: string;

    razonsocial?: string;
}