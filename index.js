const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let grid = [
    [2, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
]

let robotGrid

let GRID_ONE_W
let GRID_ONE_H
let mouseLeftPressed
let mouseRightPressed
let mouseX
let mouseY
let robotPositionStack

function init(){
    GRID_ONE_W = canvas.width / grid.length
    GRID_ONE_H = canvas.height / grid.length
    mouseLeftPressed = false
    mouseRightPressed = false
    mouseX = 0
    mouseY = 0
    robotGrid = JSON.parse(JSON.stringify(grid))
    robotPositionStack = [{
        row : grid.length - 1,
        col : grid[0].length - 1,
    }]
}

init()

canvas.addEventListener("mousedown", (e) => {
    if(e.button === 0){
        mouseLeftPressed = true
    } else if (e.button === 2){
        mouseRightPressed = true
    }
})

canvas.addEventListener("mouseup", (e) => {
    if(e.button === 0){
        mouseLeftPressed = false
    } else if (e.button === 2){
        mouseRightPressed = false
    }
})

document.getElementById("button").addEventListener("click", () => {
    robotGrid = JSON.parse(JSON.stringify(grid))
    setTimeout(() => {
        goLeft()
    }, 1000)
})

canvas.addEventListener("mousemove", (e) => {
    mouseX = e.offsetX
    mouseY = e.offsetY
})

function createGrid(n){
    const grid = []
    for(let row = 0; row < n; row++){
        grid[row] = []
        for(let col = 0; col < n; col++){
            grid[row][col] = 0
        }
    }
    return grid
}

window.addEventListener("keypress", (e) => {
    if(e.keyCode === 13){
        const gridSize = Number(document.getElementById("input").value)
        grid = createGrid(gridSize)
        grid[0][0] = 2
        grid[grid.length - 1][grid.length - 1] = 2
        init()
    }
})

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[0].length; col++){
            if(grid[row][col] === 1){
                ctx.fillStyle = "black"
                ctx.fillRect(col * GRID_ONE_W, row * GRID_ONE_W, GRID_ONE_W, GRID_ONE_W)
            }
            if(grid[row][col] === 2){
                ctx.fillStyle = "red"
                ctx.fillRect(col * GRID_ONE_W, row * GRID_ONE_W, GRID_ONE_W, GRID_ONE_W)
            }
        }
    }
    ctx.fillStyle = "green"
    for(let i = 0; i < robotPositionStack.length; i++){
        ctx.fillRect(robotPositionStack[i].col * GRID_ONE_W, robotPositionStack[i].row * GRID_ONE_W, GRID_ONE_W, GRID_ONE_W)
    }
    // for(let i = 0; i < robot.length; i ++){
    //     ctx.fillRect(robot[i].x * GRID_ONE_W, robot[i].y * GRID_ONE_W, GRID_ONE_W, GRID_ONE_W)
    // }
}

function goLeft (){
    const currentRobotPosition = robotPositionStack[robotPositionStack.length - 1]
    if(currentRobotPosition.row === 0 && currentRobotPosition.col === 0){
        return
    }

    const nextCol = currentRobotPosition.col - 1
    if(nextCol < 0 || robotGrid[currentRobotPosition.row][nextCol] === 1){
        // out of boundary
        setTimeout(() => {
            goUp()
        }, 20)
    } else {
        robotPositionStack.push({ col : nextCol, row : currentRobotPosition.row })
        setTimeout(() => {
            goLeft()
        }, 20)
    }
}

function goUp(){
    // console.log(robot[robot.length - 1].y, robot[robot.length - 1].x)
    const currentRobotPosition = robotPositionStack[robotPositionStack.length - 1]
    if(currentRobotPosition.row === 0 && currentRobotPosition.col === 0){
        return
    }
    const nextRow = currentRobotPosition.row - 1
    if(nextRow < 0 || robotGrid[nextRow][currentRobotPosition.col] === 1){
        //out of boundary
        robotGrid[currentRobotPosition.row][currentRobotPosition.col] = 1
        robotPositionStack.pop()
        setTimeout(() => {
            goLeft()
        }, 20)
    } else {
        robotPositionStack.push({ row : nextRow, col : currentRobotPosition.col})
        setTimeout(() => {
            goLeft()
        }, 20)
    }
}

setTimeout(() => {
    goLeft()
}, 10)
console.log(robotPositionStack)

setInterval(() => {
    //user make map
    if(mouseLeftPressed || mouseRightPressed){
        for(let row = 0; row < grid.length; row++){
            for(let col = 0; col < grid[0].length; col++){
                const startX = col * GRID_ONE_W
                const endX = ( col + 1 ) * GRID_ONE_W
                const startY = row * GRID_ONE_W
                const endY = ( row + 1 ) * GRID_ONE_W
                if(mouseX >= startX && mouseX < endX && mouseY >= startY && mouseY < endY){
                    if(grid[row][col] === 2){ continue }
                    if(mouseLeftPressed === true){
                        grid[row][col] = 1
                    } else if (mouseRightPressed === true){
                        grid[row][col] = 0
                    }
                }
            }
        }
    }
    draw()
}, 10)