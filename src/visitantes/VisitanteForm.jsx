import { useState } from "react";

function VisitanteForm({ visitanteEditando, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(visitanteEditando?.nombre || "");
  const [edad, setEdad] = useState(visitanteEditando?.edad || "");
  const [tipoEntrada, setTipoEntrada] = useState(visitanteEditando?.tipoEntrada || "Normal");
  const [fechaIngreso, setFechaIngreso] = useState(visitanteEditando?.fechaIngreso || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nombre || !edad || !fechaIngreso) {
      alert("Por favor completa todos los campos");
      return;
    }

    onGuardar({ nombre, edad, tipoEntrada, fechaIngreso });
  }

  return (
    <form className="visitante-form" onSubmit={handleSubmit} autoComplete="off">
      <h3>{visitanteEditando ? "Editar visitante" : "Nuevo visitante"}</h3>

      <div className="campo">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre-visitante"
          autoComplete="off"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Edad</label>
        <input
          type="number"
          name="edad-visitante"
          autoComplete="off"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Tipo de entrada</label>
        <select
          value={tipoEntrada}
          onChange={(e) => setTipoEntrada(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="VIP">VIP</option>
          <option value="Niño">Niño</option>
        </select>
      </div>

      <div className="campo">
        <label>Fecha de ingreso</label>
        <input
          type="date"
          name="fecha-ingreso-visitante"
          autoComplete="off"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primario">
        {visitanteEditando ? "Guardar cambios" : "Agregar visitante"}
      </button>
      {visitanteEditando && (
        <button type="button" className="btn-secundario" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default VisitanteForm;