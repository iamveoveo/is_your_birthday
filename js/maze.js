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
                        wish='Deal ÁNh. <br>Tớ viết thư này ... như trẻ con vậy nhưng mà V muốn ước cho ÁNh thật nhiều điều lành vào cái tuổi 20 mơn mởn này. Nhưng viết nhiều sợ ÁNh đấm bỏ mịa.'; break;
                    case 2:
                        wish='V ước cho với cái tủi 20 mới mới mới này ÁNh sẽ đầu tiên là có cái thành tựu gì đó lớn lớn cho tự tin nghĩ mình "bố thiên hạ" hihi.'; break;
                    case 3:
                        wish='Ước cho ÁNh được bớt đi thời gian rảnh được đụng tay đụng chân cho đỡ "trông như nghiện" nữa.'; break;
                    case 4:
                        wish='V hay khen là ÁNh xinh gái ÁNh đáng yêu nên ước chắc là sẽ phải ước cho V có trái tim khỏe một chút ÁNh cười không ngộp quá vì năm sau ÁNh còn xinh hơn cơ.'; break;
                    case 5:
                        wish='Rồi V sẽ ước điều này đừng để bụng nghen. Ước cho Ánh cứng vía hơn để mấy đứa bạn đểu biết đường mà né. Nếu điều ước đấy không được đáp ứng V sẽ ước cho V với ÁNh ở thật lâu bên nhau để mấy cái "bạn xấu" không dám le ve nữa.'; break;
                    case 6:
                        wish='Ước cho ÁNh sẽ luôn giữ đc sự tỉnh tảo như cái biệt danh vậy "Tập trung vào!!!". Hihi còn nhiều nhiều nữa V sẽ để để ước dần ước trong tâm niệm.'; break;
                    case 7:
                        wish='hí hí dạo này văn kém quá không biết nghe có xáo rỗng không nữa. Tuổi 20 thật đẹp nghen ÁNh yêu dấu <3. <br>Thân ái! <br>Đặng Quang Vinh'; break;
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