

const verify = (req,res,next)=>{
    try {
        let data = req.body;
        let lastDigit = req.body.verification_number % 10;
        if(data.verification_number.toString().length !== 6 || lastDigit === 7){
            return res.status(401).send({message: "Verification Error"});
        }else{
            return res.status(200).send({message: "Verification Success"});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    verify
}