const STORAGE_KEY = "visitantes";

//  visitantes guardados
export function obtenerVisitantes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guardamos los visitantes nuevos
export function guardarVisitante(visitante) {
  const visitantes = obtenerVisitantes();
  const nuevoVisitante = {
    ...visitante,
    id: Date.now().toString(), // id único simple
  };
  visitantes.push(nuevoVisitante);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visitantes));
}

// Actualizamos los visitantes existentes
export function actualizarVisitante(id, datosActualizados) {
  const visitantes = obtenerVisitantes();
  const nuevosVisitantes = visitantes.map((v) =>
    v.id === id ? { ...v, ...datosActualizados } : v
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosVisitantes));
}

// Eliminamos un visitante
export function eliminarVisitante(id) {
  const visitantes = obtenerVisitantes();
  const nuevosVisitantes = visitantes.filter((v) => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosVisitantes));
}