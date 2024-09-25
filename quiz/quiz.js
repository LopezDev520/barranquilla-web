
export class Quiz {
    constructor() {
        this.preguntas = []
        this.jugando = false
        this.indicePreguntaActual = null;
        this.puntaje = 0
    }

    obtenerPreguntaActual() {
        return this.preguntas[this.indicePreguntaActual]
    }

    agregarPregunta(pregunta) {
        if (this.jugando) return
        this.preguntas.push(pregunta)
    }

    jugar() {
        this.jugando = true
        this.indicePreguntaActual = 0
    }

    terminarJuego() {
        this.jugando = false
    }

    responder(indiceOpcion) {
        if (!this.jugando || this.indicePreguntaActual >= this.preguntas.length) {
            this.terminarJuego();
            return;
        }
    
        const preguntaActual = this.obtenerPreguntaActual();
        const opcionElegida = preguntaActual.opciones[indiceOpcion];
    
        if (opcionElegida.correcta) this.puntaje++;
        this.indicePreguntaActual++;
        
        // Terminar el juego si ya no hay más preguntas
        if (this.indicePreguntaActual >= this.preguntas.length) {
            this.terminarJuego();
        }
    }
    
}

export class Pregunta {
    constructor({ textoPregunta, opciones }) {
        this.textoPregunta = textoPregunta;
        this.opciones = opciones;
    }
}

export class Opcion {
    constructor({ textoOpcion, correcta = false }) {
        this.textoOpcion = textoOpcion;
        this.correcta = correcta;
    }
}