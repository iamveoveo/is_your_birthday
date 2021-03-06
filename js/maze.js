let maze = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3],
]

console.log(maze);

let player = [0, 0]
let bag = 0
var wish=''

const ROWS = 19
const COLS = 19

const EMPTY = 0
const WALL = 1
const PLAYER = 2
const EXIT = 3
const EXIT_READY = 6
const DIAMOND = 4
const DIAMOND_COUNT = 7

const DOWN = 40
const UP = 38
const LEFT = 37
const RIGHT = 39

window.onload = () => {
    generateDiamond()
    createBoard()
    renderMaze()
}

const generateDiamond = () => {
    let count = 0

    do {
        let row = Math.floor(Math.random() * ROWS)
        let col = Math.floor(Math.random() * COLS)
        if (maze[row][col] === EMPTY && 
            row !== 0 && col !==0 &&
            row !== ROWS -1 && col !== COLS -1) {
            maze[row][col] = DIAMOND
            count++
        }

    } while (count !== DIAMOND_COUNT)
}

const createBoard = () => {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) { 
            const block = document.createElement('div')
            block.id = `id-${col}-${row}`
            document.querySelector(".board").appendChild(block);
        }
    }
}

const renderMaze = () => {
    if (bag < DIAMOND_COUNT) {
        document.querySelector('.info').textContent = 'collect all the cake'
    } else {
        maze[ROWS-1][COLS-1] = EXIT_READY
        document.querySelector('.info').textContent = 'go to the teleport'
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let itemClass = ''
            switch (maze[row][col]) {
                case PLAYER:
                    itemClass = 'player'; break
                case WALL:
                    itemClass = 'wall'; break
                case PLAYER:
                    itemClass = 'human'; break
                case EXIT:
                    itemClass = 'exit'; break
                case EXIT_READY:
                itemClass = 'exit show'; break
                case DIAMOND:
                    itemClass = 'diamond'; break
                default:
                    itemClass = 'empty'
            }
            const id = `#id-${col}-${row}`

            document.querySelector(id).className = `block ${itemClass}`
        }
    }
    const id = `#id-${player[1]}-${player[0]}`
    if (!(bag === DIAMOND_COUNT && player[1] === COLS - 1 && player[0] === ROWS - 1)) {
        document.querySelector(id).className = 'block player'
    }
    else {
        document.querySelector(id).className = 'block player bye'
        document.querySelector('.info').textContent = 'wait!'
    }


    document.querySelector('.diamond-count').textContent = `${bag} / ${DIAMOND_COUNT}`
}

window.onkeydown = (event) => {
    switch (event.keyCode) {
        case DOWN:
            direction = DOWN;  break
        case UP:
            direction = UP; break;
        case LEFT:
            direction = LEFT; break
        case RIGHT:
            direction = RIGHT; break
        default:
            direction = 0
    }

    if (direction !== 0) {
        changePlayerPos(direction)
    }
}

const changePlayerPos = (direction) => {
    let [dy, dx] = [0, 0];
    switch (direction) {
        case UP:
            dy = -1; break;
        case RIGHT:
            dx = 1; break;
        case LEFT:
            dx = -1; break;
        case DOWN:
            dy = 1; break;
        default:
            return state
    }

    const x = player[1] + dx
    const y = player[0] + dy

    if (x >= 0 && x < COLS && y >= 0 && y < ROWS &&
        maze[y][x] !== WALL) {
            player = [y, x]

            if (maze[y][x] == EXIT_READY){
                $('.wrap-end').css('animation', 'fadein 0.5s');
                setTimeout(function(){
                    $('.wrap-end').removeClass('hidden');
                }, 500);
            }

            if (maze[y][x] === DIAMOND) {
                maze[y][x] = EMPTY
                bag++
                switch (bag) {
                    case 1:
                        wish='Deal ??Nh. <br>T??? vi???t th?? n??y ... nh?? tr??? con v???y nh??ng m?? V mu???n ?????c cho ??Nh th???t nhi???u ??i???u l??nh v??o c??i tu???i 20 m??n m???n n??y. Nh??ng vi???t nhi???u s??? ??Nh ?????m b??? m???a.'; break;
                    case 2:
                        wish='V ?????c cho v???i c??i t???i 20 m???i m???i m???i n??y ??Nh s??? ?????u ti??n l?? c?? c??i th??nh t???u g?? ???? l???n l???n cho t??? tin ngh?? m??nh "b??? thi??n h???" hihi.'; break;
                    case 3:
                        wish='?????c cho ??Nh ???????c b???t ??i th???i gian r???nh ???????c ?????ng tay ?????ng ch??n cho ????? "tr??ng nh?? nghi???n" n???a.'; break;
                    case 4:
                        wish='V hay khen l?? ??Nh xinh g??i ??Nh ????ng y??u n??n ?????c ch???c l?? s??? ph???i ?????c cho V c?? tr??i tim kh???e m???t ch??t ??Nh c?????i kh??ng ng???p qu?? v?? n??m sau ??Nh c??n xinh h??n c??.'; break;
                    case 5:
                        wish='R???i V s??? ?????c ??i???u n??y ?????ng ????? b???ng nghen. ?????c cho ??nh c???ng v??a h??n ????? m???y ?????a b???n ?????u bi???t ???????ng m?? n??. N???u ??i???u ?????c ?????y kh??ng ???????c ????p ???ng V s??? ?????c cho V v???i ??Nh ??? th???t l??u b??n nhau ????? m???y c??i "b???n x???u" kh??ng d??m le ve n???a.'; break;
                    case 6:
                        wish='?????c cho ??Nh s??? lu??n gi??? ??c s??? t???nh t???o nh?? c??i bi???t danh v???y "T???p trung v??o!!!". Hihi c??n nhi???u nhi???u n???a V s??? ????? ????? ?????c d???n ?????c trong t??m ni???m.'; break;
                    case 7:
                        wish='h?? h?? d???o n??y v??n k??m qu?? kh??ng bi???t nghe c?? x??o r???ng kh??ng n???a. Tu???i 20 th???t ?????p nghen ??Nh y??u d???u <3. <br>Th??n ??i! <br>?????ng Quang Vinh'; break;
                    default:
                        wish='je t`aime'; break;
                }
                $('.wish-contain p').html(wish);
                overlay()
            }
            
            renderMaze()
        } 

}

function overlay(){
    $('.wish-section').removeClass('hidden');
    $('.overlay').removeClass('hidden');
}

$(document).ready(function(){
    $(window).on('click', function(){
        $('.wish-section').css('animation', 'fadeout 0.5s');
        $('.overlay').css('animation', 'fadeout 0.5s');
        $('.starter').css('animation', 'fadeout 0.5s');
        setTimeout(function(){
            $('.wish-section').addClass('hidden');
            $('.overlay').addClass('hidden');
            $('.starter').addClass('hidden');
            $('.wish-section').css('animation', 'fadein 1s');
            $('.overlay').css('animation', 'fadein 1s');
            $('.starter').css('animation', 'fadein 1s');
        }, 500);
    })
})