let getAllProductFromWoo  = (req,res) => {
    try{
        return res.json("helo")
    } catch ( e ) {
        console.log(e);
    }
}
module.exports={
    getAllProductFromWoo
}