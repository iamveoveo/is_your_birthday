$(document).ready(function(){
    $('.character').on('click', function(){
        if ($(this).attr('name') == 'piggy') {
            $('#wish').text('Chúc mừng sinh nhật bạn yêu nhá. Trên này không viết được quá nhiều nên hãy direct inbox với t để nghe những lời âu yếm nhá hí hí');
        } else if ($(this).attr('name') == 'flower') {
            window.open('https://www.canva.com/design/DAFODiM8rtg/37fTgS34ZcDPQPlsrOGBHA/watch?utm_content=DAFODiM8rtg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink', '_blank');
        } else if ($(this).attr('name') == 'poke') {
            $('#wish').text('Yêu Nóc');
        } else {
            alert('Chúc mừng sinh nhật');
        }
    })
})