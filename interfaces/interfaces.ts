export type Next = () => void | Promise<void>;



export interface TypesRequest<T> extends Express.Request {
    files: any;
    header: any,
    params: any,
    user?: UserProps,
    body: T
}

//User property's
type GenreTypes = 'M' | 'F' | 'NB';
export type RolesTypes = 'SUPER_ADMIN' | 'CLIENT' | 'ASSOCIATED' | 'FINAL_USER';
interface AddressProps {
    zip: number,
    state: string,
    municipality: string,
    colony: string,
    street: string,
    numInt: string,
    numExt?: string,
    referencer?: string
}

export interface UserProps extends AddressProps{
    _id?: string,
    img?: string,
    name: string,
    firstLastName: string,
    secondLastName: string,
    birthday: string,
    genre: GenreTypes,
    email: string,
    password: string,
    phone: number,
    rol: RolesTypes,
    status?: boolean,
    bondingCode?: string,
    associatedBonding?: string[],
    associatedCompany?: string[],

}

export interface LoginUserProps {
    email: string,
    password: string
}


//Sockets

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface SocketProps extends
  ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData {}
