import { useEffect, useState } from 'react'

function AtraccionesPage() {
  const [atracciones, setAtracciones] = useState(() => {
    const guardadas = localStorage.getItem('atracciones')
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('')
  const [edadMinima, setEdadMinima] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [estado, setEstado] = useState('Disponible')

  const [editando, setEditando] = useState(null)
  const [buscar, setBuscar] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')

  useEffect(() => {
    localStorage.setItem('atracciones', JSON.stringify(atracciones))
  }, [atracciones])

  const limpiarFormulario = () => {
    setNombre('')
    setTipo('')
    setEdadMinima('')
    setCapacidad('')
    setEstado('Disponible')
    setEditando(null)
  }

  const guardarAtraccion = (event) => {
    event.preventDefault()

    if (!nombre.trim() || !tipo || !edadMinima || !capacidad) {
      return
    }

    if (editando === null) {
      const nuevaAtraccion = {
        id: Date.now(),
        nombre: nombre.trim(),
        tipo,
        edadMinima,
        capacidad,
        estado,
      }

      setAtracciones((actuales) => [...actuales, nuevaAtraccion])
    } else {
      setAtracciones((actuales) =>
        actuales.map((atraccion) =>
          atraccion.id === editando
            ? {
                ...atraccion,
                nombre: nombre.trim(),
                tipo,
                edadMinima,
                capacidad,
                estado,
              }
            : atraccion,
        ),
      )
    }

    limpiarFormulario()
  }

  const editarAtraccion = (atraccion) => {
    setNombre(atraccion.nombre)
    setTipo(atraccion.tipo)
    setEdadMinima(atraccion.edadMinima)
    setCapacidad(atraccion.capacidad)
    setEstado(atraccion.estado)
    setEditando(atraccion.id)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const eliminarAtraccion = (id) => {
    const atraccion = atracciones.find((item) => item.id === id)

    if (!atraccion) {
      return
    }

    const confirmar = window.confirm(
      `¿Está seguro de eliminar la atracción "${atraccion.nombre}"?`,
    )

    if (!confirmar) {
      return
    }

    setAtracciones((actuales) =>
      actuales.filter((item) => item.id !== id),
    )
  }

  const atraccionesFiltradas = atracciones.filter((atraccion) => {
    const coincideNombre = atraccion.nombre
      .toLowerCase()
      .includes(buscar.toLowerCase())

    const coincideEstado =
      filtroEstado === 'Todos' ||
      atraccion.estado === filtroEstado

    return coincideNombre && coincideEstado
  })

  const disponibles = atracciones.filter(
    (atraccion) => atraccion.estado === 'Disponible',
  ).length

  const mantenimiento = atracciones.filter(
    (atraccion) => atraccion.estado === 'Mantenimiento',
  ).length

  return (
    <section className="atracciones-page">

      <div className="page-heading">
        <div>
          <span className="section-kicker">🎢 DIVERSIÓN Y AVENTURA</span>
          <h2>Gestión de Atracciones</h2>
          <p>
            Administra las atracciones, su capacidad y disponibilidad
            dentro del parque.
          </p>
        </div>

        <div className="heading-emoji">🎠</div>
      </div>

      <div className="stats-grid">

        <div className="stat-card stat-pink">
          <div className="stat-icon">🎡</div>
          <div>
            <span>Total</span>
            <strong>{atracciones.length}</strong>
            <small>Atracciones</small>
          </div>
        </div>

        <div className="stat-card stat-blue">
          <div className="stat-icon">✅</div>
          <div>
            <span>Disponibles</span>
            <strong>{disponibles}</strong>
            <small>En funcionamiento</small>
          </div>
        </div>

        <div className="stat-card stat-yellow">
          <div className="stat-icon">🔧</div>
          <div>
            <span>Mantenimiento</span>
            <strong>{mantenimiento}</strong>
            <small>Fuera de servicio</small>
          </div>
        </div>

      </div>

      <div className="attractions-layout">

        <div className="form-card">

          <div className="card-title">
            <div className="card-title-icon">
              {editando === null ? '✨' : '✏️'}
            </div>

            <div>
              <h3>
                {editando === null
                  ? 'Registrar atracción'
                  : 'Editar atracción'}
              </h3>

              <p>
                {editando === null
                  ? 'Agrega una nueva atracción al parque.'
                  : 'Actualiza la información de la atracción.'}
              </p>
            </div>
          </div>

          <form onSubmit={guardarAtraccion} className="attraction-form">

            <div className="form-field">
              <label htmlFor="nombreAtraccion">
                Nombre de la atracción
              </label>

              <input
                id="nombreAtraccion"
                type="text"
                placeholder="Ej. Montaña Rusa"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="tipoAtraccion">Tipo</label>

              <select
                id="tipoAtraccion"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="Montaña rusa">🎢 Montaña rusa</option>
                <option value="Acuática">🌊 Acuática</option>
                <option value="Familiar">👨‍👩‍👧 Familiar</option>
                <option value="Infantil">🧸 Infantil</option>
              </select>
            </div>

            <div className="form-row">

              <div className="form-field">
                <label htmlFor="edadMinima">Edad mínima</label>

                <input
                  id="edadMinima"
                  type="number"
                  min="0"
                  placeholder="Ej. 8"
                  value={edadMinima}
                  onChange={(event) =>
                    setEdadMinima(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="capacidad">Capacidad</label>

                <input
                  id="capacidad"
                  type="number"
                  min="1"
                  placeholder="Ej. 20"
                  value={capacidad}
                  onChange={(event) =>
                    setCapacidad(event.target.value)
                  }
                  required
                />
              </div>

            </div>

            <div className="form-field">
              <label htmlFor="estadoAtraccion">Estado</label>

              <select
                id="estadoAtraccion"
                value={estado}
                onChange={(event) =>
                  setEstado(event.target.value)
                }
              >
                <option value="Disponible">✅ Disponible</option>
                <option value="Mantenimiento">🔧 Mantenimiento</option>
              </select>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-action"
              >
                {editando === null
                  ? '🎢 Registrar atracción'
                  : '💾 Guardar cambios'}
              </button>

              {editando !== null && (
                <button
                  type="button"
                  className="secondary-action"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>
        </div>

        <div className="list-card">

          <div className="list-header">
            <div>
              <h3>🎟️ Atracciones registradas</h3>
              <p>
                {atraccionesFiltradas.length === 1
                  ? '1 atracción encontrada'
                  : `${atraccionesFiltradas.length} atracciones encontradas`}
              </p>
            </div>

            <span className="record-badge">
              {atraccionesFiltradas.length}
            </span>
          </div>

          <div className="filters">

            <div className="search-box">
              <span>🔎</span>

              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={buscar}
                onChange={(event) =>
                  setBuscar(event.target.value)
                }
              />
            </div>

            <select
              value={filtroEstado}
              onChange={(event) =>
                setFiltroEstado(event.target.value)
              }
            >
              <option value="Todos">Todos los estados</option>
              <option value="Disponible">Disponibles</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>

          </div>

          {atraccionesFiltradas.length === 0 ? (
            <div className="empty-state">
              <div>🎢</div>
              <h4>No hay atracciones</h4>
              <p>
                Registra una nueva atracción para verla aquí.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">

              <table className="attractions-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Atracción</th>
                    <th>Tipo</th>
                    <th>Edad</th>
                    <th>Capacidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {atraccionesFiltradas.map((atraccion, index) => (
                    <tr key={atraccion.id}>

                      <td>
                        <span className="number-badge">
                          {index + 1}
                        </span>
                      </td>

                      <td>
                        <div className="attraction-name">
                          <span>🎢</span>

                          <strong>{atraccion.nombre}</strong>
                        </div>
                      </td>

                      <td>{atraccion.tipo}</td>

                      <td>{atraccion.edadMinima} años</td>

                      <td>
                        <span className="capacity-badge">
                          👥 {atraccion.capacidad}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            atraccion.estado === 'Disponible'
                              ? 'available'
                              : 'maintenance'
                          }`}
                        >
                          {atraccion.estado === 'Disponible'
                            ? '✓ Disponible'
                            : '🔧 Mantenimiento'}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              editarAtraccion(atraccion)
                            }
                          >
                            ✏️
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              eliminarAtraccion(atraccion.id)
                            }
                          >
                            🗑️
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default AtraccionesPage