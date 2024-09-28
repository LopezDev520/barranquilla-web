import { Quiz, Pregunta, Opcion } from "./quiz.js";

const $ = sel => document.querySelector(sel)

const preguntas = [
    new Pregunta({
        textoPregunta: "¿En qué año se fundó oficialmente Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: 1810 }),
            new Opcion({ textoOpcion: 1629 }),
            new Opcion({ textoOpcion: 1813, correcta: true }),
            new Opcion({ textoOpcion: 1888 })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Cuál es el origen del nombre 'Barranquilla'?",
        opciones: [
            new Opcion({ textoOpcion: "Deriva de la palabra 'barranco'" }),
            new Opcion({ textoOpcion: "Es una combinación de 'barranco' y 'quilla'", correcta: true }),
            new Opcion({ textoOpcion: "Proviene de un término indígena" }),
            new Opcion({ textoOpcion: "No tiene un origen claro" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Qué evento histórico importante ocurrió en Barranquilla en 1905?",
        opciones: [
            new Opcion({ textoOpcion: "Se inauguró el primer puerto marítimo", correcta: true }),
            new Opcion({ textoOpcion: "Se estableció la primera línea de tranvía" }),
            new Opcion({ textoOpcion: "Se fundó la Universidad del Atlántico" }),
            new Opcion({ textoOpcion: "Se realizó la primera edición del Carnaval de Barranquilla" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Quién fue el primer alcalde de Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: "José María de la Torre", correcta: true }),
            new Opcion({ textoOpcion: "Francisco Javier Cisneros" }),
            new Opcion({ textoOpcion: "Antonio Abello" }),
            new Opcion({ textoOpcion: "Rafael María Baralt" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Qué importancia tuvo Barranquilla durante la Segunda Guerra Mundial?",
        opciones: [
            new Opcion({ textoOpcion: "Fue un centro estratégico para la defensa costera" }),
            new Opcion({ textoOpcion: "Sirvió como base naval para las fuerzas aliadas" }),
            new Opcion({ textoOpcion: "Se convirtió en un importante puerto de exportación", correcta: true }),
            new Opcion({ textoOpcion: "No tuvo un papel destacado durante la guerra" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Cuál es la festividad más reconocida de Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: "Carnaval de Barranquilla", correcta: true }),
            new Opcion({ textoOpcion: "Festival de la Cumbia" }),
            new Opcion({ textoOpcion: "Semana Santa" }),
            new Opcion({ textoOpcion: "Navidad" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Qué río es fundamental en la historia y desarrollo de Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: "Río Magdalena", correcta: true }),
            new Opcion({ textoOpcion: "Río Cauca" }),
            new Opcion({ textoOpcion: "Río Sinú" }),
            new Opcion({ textoOpcion: "Río Atrato" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Cuál fue la primera institución educativa superior establecida en Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: "Universidad del Atlántico", correcta: true }),
            new Opcion({ textoOpcion: "Universidad de la Costa" }),
            new Opcion({ textoOpcion: "Universidad Simón Bolívar" }),
            new Opcion({ textoOpcion: "Universidad Autónoma del Caribe" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Qué papel juega el puerto de Barranquilla en la economía colombiana?",
        opciones: [
            new Opcion({ textoOpcion: "Es el principal puerto de importación de alimentos" }),
            new Opcion({ textoOpcion: "Sirve como hub para la distribución de mercancías en la región Caribe", correcta: true }),
            new Opcion({ textoOpcion: "Es un puerto menor sin relevancia nacional" }),
            new Opcion({ textoOpcion: "Se especializa en la exportación de minerales" })
        ]
    }),
    new Pregunta({
        textoPregunta: "¿Qué monumento histórico es emblemático de Barranquilla?",
        opciones: [
            new Opcion({ textoOpcion: "La Catedral Metropolitana" }),
            new Opcion({ textoOpcion: "El Puente Pumarejo", correcta: true }),
            new Opcion({ textoOpcion: "La Plaza de la Paz" }),
            new Opcion({ textoOpcion: "El Museo del Caribe" })
        ]
    })
];

// Elementos HTML del quiz
const preguntaEl = $("#pregunta")

const quiz = new Quiz()
preguntas.forEach(p => quiz.agregarPregunta(p))

quiz.jugar()
cargarPregunta()

function cargarPregunta() {
    if (!quiz.jugando || quiz.indicePreguntaActual >= quiz.preguntas.length) {
        mostrarPuntaje();
        return;
    }

    const pregunta = quiz.obtenerPreguntaActual()

    preguntaEl.textContent = pregunta.textoPregunta
    pregunta.opciones.forEach((opcion, i) => {
        const opcionButton = $(`#opcion-${i + 1}`)
        opcionButton.textContent = opcion.textoOpcion
        opcionButton.onclick = () => {
            quiz.responder(i)
            cargarPregunta()
        }
    })
}

function mostrarPuntaje() {
    alert(quiz.puntaje + " preguntas correctas")
    alert("Gracias por jugar nuestro Quiz :)")
    window.location.href = "/"
}
