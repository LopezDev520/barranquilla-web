// Clase principal que maneja la lógica del quiz
export class Quiz {
    constructor() {
        this.preguntas = []              // Array para almacenar las preguntas del quiz
        this.jugando = false             // Indica si el quiz está en curso
        this.indicePreguntaActual = null // Índice de la pregunta actual
        this.puntaje = 0                 // Puntaje del jugador
    }

    // Método para obtener la pregunta actual
    obtenerPreguntaActual() {
        return this.preguntas[this.indicePreguntaActual]
    }

    // Método para agregar una nueva pregunta al quiz
    agregarPregunta(pregunta) {
        if (this.jugando) return         // No se pueden agregar preguntas si el quiz está en curso
        this.preguntas.push(pregunta)
    }

    // Método para iniciar el quiz
    jugar() {
        this.jugando = true
        this.indicePreguntaActual = 0
    }

    // Método para finalizar el quiz
    terminarJuego() {
        this.jugando = false
    }

    // Método para procesar la respuesta del jugador
    responder(indiceOpcion) {
        // Verificar si el juego está en curso y si quedan preguntas
        if (!this.jugando || this.indicePreguntaActual >= this.preguntas.length) {
            this.terminarJuego();
            return;
        }
    
        const preguntaActual = this.obtenerPreguntaActual();
        const opcionElegida = preguntaActual.opciones[indiceOpcion];
    
        // Verificar si la respuesta es correcta y actualizar el puntaje
        if (opcionElegida.correcta) {
            this.puntaje++;
            alert("Respuesta Correcta");
        } else alert("Respuesta incorrecta");
        
        // Avanzar a la siguiente pregunta
        this.indicePreguntaActual++;
        
        // Terminar el juego si ya no hay más preguntas
        if (this.indicePreguntaActual >= this.preguntas.length) {
            this.terminarJuego();
        }
    }
}

// Clase para representar una pregunta individual
export class Pregunta {
    constructor({ textoPregunta, opciones }) {
        this.textoPregunta = textoPregunta; // Texto de la pregunta
        this.opciones = opciones;           // Array de opciones para la pregunta
    }
}

// Clase para representar una opción de respuesta
export class Opcion {
    constructor({ textoOpcion, correcta = false }) {
        this.textoOpcion = textoOpcion; // Texto de la opción
        this.correcta = correcta;       // Indica si esta opción es la respuesta correcta
    }
}