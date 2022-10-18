import jwt from 'jsonwebtoken'

//uid: user identifier
const generateJwt = (uid='') => {
    return new Promise((res,rej) => {

        //You can save all that you want
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEY!,
            {
                expiresIn: '24h'
            }, (err:any,token:any) => {
                if(err){
                    console.log(err)
                    rej('Is not possible generate the JWT')
                } else {
                    res(token)
                }
            }
        )
    })
}






export {
    generateJwt
}