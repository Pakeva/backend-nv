export type Next = () => void | Promise<void>;



export interface TypesRequest<T> extends Express.Request {
    params: any;
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
    name: string,
    firstLastName: string,
    secondLastName: string,
    birthday: string,
    genre: GenreTypes,
    email: string,
    password: string,
    phone: number,
    rol: RolesTypes
}