$(document).ready(function(){
    $('.character').on('click', function(){
        if ($(this).attr('name') == 'piggy') {
            $('#wish').text('Chúc mừng sinh nhật em gái yêu nhá. Tuổi mới ít làm và tăng hưởng thụ nha em gái. Chúc em né qua được tất cả các tiêu cực nhé dù nó có ở đâu, có là gì đi nữa.');
        } else if ($(this).attr('name') == 'flower') {
            window.open('https://www.youtube.com/watch?v=5u4xTa3LR2U&list=RD5u4xTa3LR2U&start_radio=1', '_blank');
        } else if ($(this).attr('name') == 'poke') {
            $('#wish').text('Giữ sự năng động nha cô gái.');
        } else {
            alert('Chúc mừng sinh nhật');
        }
    })
})
