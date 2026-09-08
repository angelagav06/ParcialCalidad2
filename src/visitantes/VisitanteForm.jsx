import { useState, useEffect } from "react";

function VisitanteForm({ visitanteEditando, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [tipoEntrada, setTipoEntrada] = useState("Normal");
  const [fechaIngreso, setFechaIngreso] = useState("");

  // Si estamos editando, llenamos el formulario con los datos existentes
  useEffect(() => {
    if (visitanteEditando) {
      setNombre(visitanteEditando.nombre);
      setEdad(visitanteEditando.edad);
      setTipoEntrada(visitanteEditando.tipoEntrada);
      setFechaIngreso(visitanteEditando.fechaIngreso);
    } else {
      limpiarFormulario();
    }
  }, [visitanteEditando]);

  function limpiarFormulario() {
    setNombre("");
    setEdad("");
    setTipoEntrada("Normal");
    setFechaIngreso("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!nombre || !edad || !fechaIngreso) {
      alert("Por favor completa todos los campos");
      return;
    }

    const datosVisitante = {
      nombre,
      edad,
      tipoEntrada,
      fechaIngreso,
    };

    onGuardar(datosVisitante);
    limpiarFormulario();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{visitanteEditando ? "Editar Visitante" : "Nuevo Visitante"}</h3>

      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Edad: </label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>

      <div>
        <label>Tipo de entrada: </label>
        <select
          value={tipoEntrada}
          onChange={(e) => setTipoEntrada(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="VIP">VIP</option>
          <option value="Niño">Niño</option>
        </select>
      </div>

      <div>
        <label>Fecha de ingreso: </label>
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
        />
      </div>

      <button type="submit">
        {visitanteEditando ? "Guardar cambios" : "Agregar visitante"}
      </button>
      {visitanteEditando && (
        <button type="button" onClick={onCancelar} style={{ marginLeft: "10px" }}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default VisitanteForm;