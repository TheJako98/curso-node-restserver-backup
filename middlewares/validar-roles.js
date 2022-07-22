const { response } = require("express");

const esAdminRol = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verficar rol sin token validado"
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== "ADMIN_ROL" ){
        return res.status(401).json({
            msg: `Usuario: -${nombre}- sin permisos para realizar la acción`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {

    return (req, res, next) => {
        const {rol, nombre} = req.usuario;
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verficar rol sin token validado"
            });
        }
        
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg: `Usuario: -${nombre}- sin permisos para realizar la acción`
            });
        }

        next();
    }


}

module.exports = {
    esAdminRol, 
    tieneRol
}