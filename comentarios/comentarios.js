class Comentario {
  constructor(id, nombreUsuario, cuerpoComentario) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.cuerpoComentario = cuerpoComentario;
  }

  getAsArgs() {
    return [{
      name: "nombreUsuario",
      value: {
        type: "text",
        value: this.nombreUsuario
      }
    }, {
      name: "cuerpoComentario",
      value: {
        type: "text",
        value: this.cuerpoComentario
      }
    }]
  }
}

const url = "https://quilla-comentarios-lopezitodev.turso.io/v2/pipeline";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc4OTY5NjIsImlkIjoiMzQ0ZTk4M2YtY2MyMC00ZDVlLWI4NTQtNmIxMTZjNTNhMzFmIn0.Me3byfTsotfIdurtlTPqcXufCP_0xBK4Xm--6y6-DY4-RyKEsbwXEvf5xE0kJdiY8R7PXuGC7p22Bp9vTdPYDQ";

const SELECT_ALL = {
  type: "execute",
  stmt: {
    sql: "SELECT * FROM comentarios"
  }
};

const getInsertData = comentario => ({
  type: "execute",
  stmt: {
    sql: "INSERT INTO comentarios(nombre_usuario, cuerpo_comentario) VALUES ($nombre, $comentario)",
    named_args: [
      {
        name: "nombre",
        value: {
          type: "text",
          value: comentario.nombreUsuario
        }
      }, 
      {
        name: "comentario",
        value: {
          type: "text",
          value: comentario.cuerpoComentario
        }
      }
    ]
    // args: [
    //   {
    //     type: "text",
    //     value: comentario.nombreUsuario
    //   },
    //   {
    //     type: "text",
    //     value: comentario.cuerpoComentario
    //   }
    // ]
  }
})

const CLOSE = { type: "close" };
const COMMIT = { "type": "execute", "stmt": { "sql": "COMMIT" } }

const $templateComentario = document.querySelector("#temp-comentario")
const $seccionComentarios = document.querySelector(".comentarios")

const $inpNombreUsuario = document.querySelector("#inp-nombre-usuario")
const $txtCuerpoComentario = document.querySelector("#txt-comentario")

document.addEventListener("DOMContentLoaded", async e => {
  const comentarios = await getAllComentarios()
  renderComentarios(comentarios)
  
  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    insertComentario()
  })
})

async function getAllComentarios() {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      requests: [
        SELECT_ALL,
        CLOSE
      ]
    })
  }

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    console.log({ json })

    const comentariosDb = json.results[0].response.result.rows
    const comentarios = comentariosDb.map(c => new Comentario(c[0].value, c[1].value, c[2].value))
    return comentarios
  } catch (e) {
    console.error(e);
    return null
  }
}

async function insertComentario() {
  const nombreUsuario = $inpNombreUsuario.value
  const cuerpoComentario = $txtCuerpoComentario.value

  if (!nombreUsuario) {
    alert("Escriba un nombre de usuario válido")
    return
  }

  if (!cuerpoComentario) {
    alert("Escriba algo en su comentario")
    return
  }

  const comentario = new Comentario(null, nombreUsuario, cuerpoComentario)
  const insertData = getInsertData(comentario)
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      requests: [
        insertData,
        COMMIT,
        CLOSE
      ]
    })
  }

  try {
    const res = await fetch(url, options)

    console.log(await res.json())

    if (res.ok) {
      const comentarios = await getAllComentarios()
      renderComentarios(comentarios)
    }
  }
  catch (e) { console.error(e) }
}

const renderComentarios = comentarios => {
  $seccionComentarios.innerHTML = ""

  comentarios.forEach(c => {
    const clonComentario = $templateComentario.content.cloneNode(true)
    clonComentario.querySelector(".nombre-usuario").innerText = c.nombreUsuario
    clonComentario.querySelector(".cuerpo-comentario").innerText = c.cuerpoComentario

    $seccionComentarios.appendChild(clonComentario)
  })
}