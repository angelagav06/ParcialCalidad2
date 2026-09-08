import { useState, useEffect } from "react";
import VisitanteForm from "./VisitanteForm";
import VisitanteList from "./VisitanteList";
import {
  obtenerVisitantes,
  guardarVisitante,
  actualizarVisitante,
  eliminarVisitante,
} from "./visitantesStorage";
import "./visitantes.css";

function VisitantesPage() {
  const [visitantes, setVisitantes] = useState([]);
  const [visitanteEditando, setVisitanteEditando] = useState(null);

  useEffect(() => {
    cargarVisitantes();
  }, []);

  function cargarVisitantes() {
    const datos = obtenerVisitantes();
    setVisitantes(datos);
  }

  function handleGuardar(datosVisitante) {
    if (visitanteEditando) {
      actualizarVisitante(visitanteEditando.id, datosVisitante);
      setVisitanteEditando(null);
    } else {
      guardarVisitante(datosVisitante);
    }
    cargarVisitantes();
  }

  function handleEditar(visitante) {
    setVisitanteEditando(visitante);
  }

  function handleCancelarEdicion() {
    setVisitanteEditando(null);
  }

  function handleEliminar(id) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este visitante?");
    if (confirmar) {
      eliminarVisitante(id);
      cargarVisitantes();
    }
  }

  return (
    <div className="visitantes-page">
      <div className="banderines">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="visitantes-header">
        <h2>Visitantes</h2>
        <span>Gestión de entradas al parque</span>
      </div>

      <VisitanteForm
        key={visitanteEditando ? visitanteEditando.id : "nuevo"}
        visitanteEditando={visitanteEditando}
        onGuardar={handleGuardar}
        onCancelar={handleCancelarEdicion}
      />

      <VisitanteList
        visitantes={visitantes}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

export default VisitantesPage;