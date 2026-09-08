function VisitanteList({ visitantes, onEditar, onEliminar }) {
  if (visitantes.length === 0) {
    return <p className="visitante-vacio">Todavía no hay visitantes registrados.</p>;
  }

  function claseFranja(tipo) {
    if (tipo === "VIP") return "boleto-franja vip";
    if (tipo === "Niño") return "boleto-franja niño";
    return "boleto-franja";
  }

  return (
    <div className="visitantes-lista">
      {visitantes.map((visitante) => (
        <div className="boleto" key={visitante.id}>
          <div className={claseFranja(visitante.tipoEntrada)}></div>
          <div className="boleto-info">
            <span className="nombre">{visitante.nombre}</span>
            <span className="detalle">{visitante.edad} años</span>
            <span className="detalle">{visitante.tipoEntrada}</span>
            <span className="detalle">{visitante.fechaIngreso}</span>
          </div>
          <div className="boleto-acciones">
            <button onClick={() => onEditar(visitante)}>Editar</button>
            <button className="eliminar" onClick={() => onEliminar(visitante.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VisitanteList;