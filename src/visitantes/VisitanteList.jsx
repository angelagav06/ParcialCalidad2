function VisitanteList({ visitantes, onEditar, onEliminar }) {
  if (visitantes.length === 0) {
    return <p>No hay visitantes registrados todavía.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Tipo de entrada</th>
          <th>Fecha de ingreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {visitantes.map((visitante) => (
          <tr key={visitante.id}>
            <td>{visitante.nombre}</td>
            <td>{visitante.edad}</td>
            <td>{visitante.tipoEntrada}</td>
            <td>{visitante.fechaIngreso}</td>
            <td>
              <button onClick={() => onEditar(visitante)}>Editar</button>
              <button
                onClick={() => onEliminar(visitante.id)}
                style={{ marginLeft: "8px" }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VisitanteList;