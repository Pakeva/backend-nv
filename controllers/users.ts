import {Request, Response} from 'express'

// cntr snippet

type GenreTypes = 'M' | 'F' | 'NB';

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

interface UserProps extends AddressProps{
    name: string,
    firstLastName: string,
    secondLastName: string,
    birthday: string,
    genre: GenreTypes,
    email: string,
    password: string,
    phone: number,
}

export interface TypesRequest<T> extends Express.Request {
    body: T
}

const createUser = (req: TypesRequest<UserProps>, res: Response) => {
    console.log(req)
    const {zip} = req.body
    console.log({zip})

    //TODO VALIDATIONS TO DE DB, CREATE THE USER ETC

    res.status(200).json({
        msg: 'Success nopu'
    })
}

const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'Success'
    })
}

export {
    createUser,
    getUsers
}