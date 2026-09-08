import { useState, useEffect } from "react";
import VisitanteForm from "./VisitanteForm";
import VisitanteList from "./VisitanteList";
import {
  obtenerVisitantes,
  guardarVisitante,
  actualizarVisitante,
  eliminarVisitante,
} from "./visitantesStorage";

function VisitantesPage() {
  const [visitantes, setVisitantes] = useState([]);
  const [visitanteEditando, setVisitanteEditando] = useState(null);

  // Cargar los visitantes guardados apenas se monta el componente
  useEffect(() => {
    cargarVisitantes();
  }, []);

  function cargarVisitantes() {
    const datos = obtenerVisitantes();
    setVisitantes(datos);
  }

  function handleGuardar(datosVisitante) {
    if (visitanteEditando) {
      // Modo edición
      actualizarVisitante(visitanteEditando.id, datosVisitante);
      setVisitanteEditando(null);
    } else {
      // Modo creación
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
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Visitantes</h2>

      <VisitanteForm
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
