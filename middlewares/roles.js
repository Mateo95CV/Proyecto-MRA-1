module.exports = function (...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(403).json({ mensaje: "Usuario no autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: "No tienes permisos para esta acción"
      });
    }

    next();
  };
};
