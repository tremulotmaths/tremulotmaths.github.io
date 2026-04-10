let image1 = document.getElementById("img1")

if (image1) {
    image1.addEventListener("click", function() {
        image1.remove()
        let images = document.getElementById("images")
        if (images) {
            images.innerText = "Vous vous êtes fait avoir, c'est une vraie image!"
        }
    })
}







/*   minijeu.html   */
 
function bouton_minijeu(){
    let minijeu = document.getElementById("bloc1")
    minijeu.hidden = !minijeu.hidden
    if (!jeu_actif) DebutJeu()
}


let score = 0
let x = 1
let y = 1
let temps = 30
let jeu_actif = false

let cube = document.getElementById("cube")
let bloc3 = document.getElementById("bloc3")
let scoreDisplay = document.getElementById("score")
let tempsDisplay = document.getElementById("temps")

let position_x = 0
let position_y = 0

function DebutJeu(){
    let cubeWidth = cube.offsetWidth
    let cubeHeight = cube.offsetHeight
    let blocWidth = bloc3.clientWidth
    let blocHeight = bloc3.clientHeight
    position_x = (blocWidth - cubeWidth) / 2
    position_y = (blocHeight - cubeHeight) / 2
    cube.style.left = position_x + "px"
    cube.style.top = position_y + "px"
    x = Math.random() < 0.5 ? -1 : 1
    y = Math.random() < 0.5 ? -1 : 1
    score = 0
    temps = 30
    scoreDisplay.textContent = "Score : 0"
    tempsDisplay.textContent = "Temps : 30"
    jeu_actif = true
}

cube.addEventListener("click", function() {
    if (!jeu_actif) return
    score += 1
    scoreDisplay.textContent = "Score : " + score
    x = Math.random() < 0.5 ? -1 : 1
    y = Math.random() < 0.5 ? -1 : 1
})

function deplacer() {
    if (jeu_actif) {
        let speed = 1 + Math.floor((score + 1) ** 0.7)
        position_x += x * speed
        position_y += y * speed

        let cubeWidth = cube.offsetWidth
        let cubeHeight = cube.offsetHeight
        let blocWidth = bloc3.clientWidth
        let blocHeight = bloc3.clientHeight

        if (position_x <= 0) { x = 1; position_x = 0 }
        if (position_x + cubeWidth >= blocWidth) { x = -1; position_x = blocWidth - cubeWidth }
        if (position_y <= 0) { y = 1; position_y = 0 }
        if (position_y + cubeHeight >= blocHeight) { y = -1; position_y = blocHeight - cubeHeight }

        cube.style.left = position_x + "px"
        cube.style.top = position_y + "px"

        temps -= 0.016
        if (temps <= 0) jeu_actif = false
        tempsDisplay.textContent = "Temps : " + Math.ceil(temps)
    }
    requestAnimationFrame(deplacer)
}

requestAnimationFrame(deplacer)