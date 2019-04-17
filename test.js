const robot = [{ x : 4, y : 4}]
let a = 1

const goLeft = () => {
    // console.log(robot[robot.length - 1].y, robot[robot.length - 1].x)
    if(robot[robot.length - 1].x === 0 && robot[robot.length - 1].y === 0){
        return
    }
    // console.log('왼쪽', robot)
    const currenRobotPosition = robot[robot.length - 1]
    const nextX = currenRobotPosition.x - 1
    if(nextX < 0 || grid[currenRobotPosition.y][nextX] === 1){
        //out of boundary
        // console.log("왼쪽 충돌 or 막힘")
        goUp()
    } else {
        robot.push({ x : nextX, y : currenRobotPosition.y })
        // console.log("왼쪽간다")
        goLeft()
    }
}

const goUp = () => {
    // console.log(robot[robot.length - 1].y, robot[robot.length - 1].x)
    if(robot[robot.length - 1].x === 0 && robot[robot.length - 1].y === 0){
        return
    }
    const currenRobotPosition = robot[robot.length - 1]
    const nextY = currenRobotPosition.y - 1
    if(nextY < 0 || grid[nextY][currenRobotPosition.x] === 1){
        //out of boundary
        // console.log("위에 충돌or 막힘")
        if(nextY >= 0 ){
            grid[currenRobotPosition.y][currenRobotPosition.x] = 1
        }
        robot.pop()
        goLeft()
    } else {
        // console.log("올라간다")
        robot.push({ x : currenRobotPosition.x, y : nextY })
        goLeft()
    }
}

const move = () => {
    goLeft()
    console.log(robot)
    // if(goLeft() === false){
    //     console.log("오른쪽간데")
    //     if(goUp() === false){
    //         robot.pop()
    //         move()
    //     }
    // }
}

move()