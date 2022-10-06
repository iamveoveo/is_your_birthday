$(document).ready(function(){
    $('.character').on('click', function(){
        if ($(this).attr('name') == 'piggy') {
            $('#wish').text('Chúc mừng sinh nhật bạn yêu nhá. Trên này không viết được quá nhiều nên hãy direct inbox với t để nghe những lời âu yếm nhá hí hí');
        } else if ($(this).attr('name') == 'flower') {
            window.open('https://drive.google.com/file/d/19ehlvg2m8M685ZAy5bVXRsh4TYuW8p_a/view?usp=sharing', '_blank');
        } else if ($(this).attr('name') == 'poke') {
            $('#wish').text('Yêu Nóc');
        } else {
            alert('Chúc mừng sinh nhật');
        }
    })
})