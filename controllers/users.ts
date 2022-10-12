import {Request, Response} from 'express'

// cntr snippet

const createUser = (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'Success'
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