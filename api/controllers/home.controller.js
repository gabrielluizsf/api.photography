export const home = (req,res)=> {
    try{ 
    res.status(200).send(`<a href="https://github.com/GabrielLuizSF">Github</a>`);
    }
    catch(error){
        res.send({message: error.message});
    }
}