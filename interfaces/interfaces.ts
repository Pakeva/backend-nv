export type Next = () => void | Promise<void>;



export interface TypesRequest<T> extends Express.Request {
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


//Manual Shippings

export interface ManualShippingProps {
    idShipping?: string,
    originAddress: IShippingProps,
    destinationAddress: IShippingProps,
    packageDetails: {
        description: string
    }
    companyProps: {
        id?: string
    },
    associated?: {
        id?: string
    },
    cords?: {
        lat: number,
        lng: number
    }
}

export interface IShippingProps {
    zip: number
    colony: string
    municipality: string
    state: string
    street: string
    numInt: string
    numExt?: string
    references?: string
}

export interface CompanyProps {
    id?: string,
    name: string,
    img: string,
    zip: number,
    colony: string,
    street: string,
    municipality: string,
    numExt: string,
    state: string,
    numInt?:string,
    references: string
    phone?: number
}

export interface AssociatedShippingProps {
    id: string,
    avatar?: string,
    name: string,
    email: string,
    phone: number,
}
