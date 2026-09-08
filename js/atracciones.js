let atracciones = JSON.parse(localStorage.getItem("atracciones")) || [];

let atraccionEditando = null;

const formulario = document.getElementById("formAtraccion");
const tabla = document.getElementById("tablaAtracciones");
const mensajeVacio = document.getElementById("mensajeVacio");

const buscar = document.getElementById("buscar");
const filtroEstado = document.getElementById("filtroEstado");

const totalAtracciones = document.getElementById("totalAtracciones");
const atraccionesDisponibles = document.getElementById("atraccionesDisponibles");
const atraccionesMantenimiento = document.getElementById("atraccionesMantenimiento");
const contadorLista = document.getElementById("contadorLista");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");


// GUARDAR EN LOCALSTORAGE

function guardarAtracciones() {
    localStorage.setItem("atracciones", JSON.stringify(atracciones));
}


// MOSTRAR ATRACCIONES

function mostrarAtracciones() {

    const textoBusqueda = buscar.value.toLowerCase();

    const estadoSeleccionado = filtroEstado.value;

    const filtradas = atracciones.filter(function (atraccion) {

        const coincideNombre =
            atraccion.nombre.toLowerCase().includes(textoBusqueda);

        const coincideEstado =
            estadoSeleccionado === "Todos" ||
            atraccion.estado === estadoSeleccionado;

        return coincideNombre && coincideEstado;
    });

    tabla.innerHTML = "";

    if (filtradas.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }

    filtradas.forEach(function (atraccion, indice) {

        const fila = document.createElement("tr");

        const claseEstado =
            atraccion.estado === "Disponible"
                ? "estado-disponible"
                : "estado-mantenimiento";

        fila.innerHTML = `
            <td>${indice + 1}</td>

            <td>
                <strong>${atraccion.nombre}</strong>
            </td>

            <td>${atraccion.tipo}</td>

            <td>${atraccion.edadMinima} años</td>

            <td>${atraccion.capacidad} personas</td>

            <td>
                <span class="estado ${claseEstado}">
                    ${atraccion.estado}
                </span>
            </td>

            <td>
                <button
                    class="btn-editar"
                    onclick="editarAtraccion(${atraccion.id})"
                >
                    ✏️ Editar
                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarAtraccion(${atraccion.id})"
                >
                    🗑️ Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });

    actualizarEstadisticas(filtradas.length);
}


// ESTADÍSTICAS

function actualizarEstadisticas(cantidadFiltrada) {

    totalAtracciones.textContent = atracciones.length;

    const disponibles = atracciones.filter(
        atraccion => atraccion.estado === "Disponible"
    ).length;

    const mantenimiento = atracciones.filter(
        atraccion => atraccion.estado === "Mantenimiento"
    ).length;

    atraccionesDisponibles.textContent = disponibles;

    atraccionesMantenimiento.textContent = mantenimiento;

    contadorLista.textContent =
        cantidadFiltrada === 1
            ? "1 registro"
            : `${cantidadFiltrada} registros`;
}


// CREAR / ACTUALIZAR

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const tipo = document.getElementById("tipo").value;
    const edadMinima = document.getElementById("edadMinima").value;
    const capacidad = document.getElementById("capacidad").value;
    const estado = document.getElementById("estado").value;


    if (atraccionEditando === null) {

        const nuevaAtraccion = {
            id: Date.now(),
            nombre: nombre,
            tipo: tipo,
            edadMinima: edadMinima,
            capacidad: capacidad,
            estado: estado
        };

        atracciones.push(nuevaAtraccion);

    } else {

        const posicion = atracciones.findIndex(
            atraccion => atraccion.id === atraccionEditando
        );

        if (posicion !== -1) {

            atracciones[posicion] = {
                id: atraccionEditando,
                nombre: nombre,
                tipo: tipo,
                edadMinima: edadMinima,
                capacidad: capacidad,
                estado: estado
            };
        }

        atraccionEditando = null;

        btnGuardar.textContent = "➕ Registrar atracción";
        btnCancelar.classList.add("hidden");
        tituloFormulario.textContent = "Registrar atracción";
    }

    guardarAtracciones();

    mostrarAtracciones();

    formulario.reset();
});


// EDITAR

function editarAtraccion(id) {

    const atraccion = atracciones.find(
        atraccion => atraccion.id === id
    );

    if (!atraccion) {
        return;
    }

    document.getElementById("nombre").value = atraccion.nombre;
    document.getElementById("tipo").value = atraccion.tipo;
    document.getElementById("edadMinima").value = atraccion.edadMinima;
    document.getElementById("capacidad").value = atraccion.capacidad;
    document.getElementById("estado").value = atraccion.estado;

    atraccionEditando = id;

    btnGuardar.textContent = "💾 Guardar cambios";
    btnCancelar.classList.remove("hidden");

    tituloFormulario.textContent = "Editar atracción";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Hacer disponible la función para los botones HTML

window.editarAtraccion = editarAtraccion;


// CANCELAR EDICIÓN

btnCancelar.addEventListener("click", function () {

    formulario.reset();

    atraccionEditando = null;

    btnGuardar.textContent = "➕ Registrar atracción";

    btnCancelar.classList.add("hidden");

    tituloFormulario.textContent = "Registrar atracción";
});


// ELIMINAR

function eliminarAtraccion(id) {

    const atraccion = atracciones.find(
        atraccion => atraccion.id === id
    );

    if (!atraccion) {
        return;
    }

    const confirmar = confirm(
        `¿Está seguro de eliminar la atracción "${atraccion.nombre}"?`
    );

    if (!confirmar) {
        return;
    }

    atracciones = atracciones.filter(
        atraccion => atraccion.id !== id
    );

    guardarAtracciones();

    mostrarAtracciones();
}


// Hacer disponible la función para los botones HTML

window.eliminarAtraccion = eliminarAtraccion;


// BUSCAR

buscar.addEventListener("input", function () {
    mostrarAtracciones();
});


// FILTRAR POR ESTADO

filtroEstado.addEventListener("change", function () {
    mostrarAtracciones();
});


// CARGAR AL INICIAR

mostrarAtracciones();