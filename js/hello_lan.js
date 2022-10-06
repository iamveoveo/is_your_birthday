$(document).ready(function(){
    $('.character').on('click', function(){
        if ($(this).attr('name') == 'piggy') {
            $('#wish').text('Chúc mừng sinh nhật bạn yêu nhá. Trên này không viết được quá nhiều nên hãy direct inbox với t để nghe những lời âu yếm nhá hí hí');
        } else if ($(this).attr('name') == 'flower') {
            window.open('https://photos.app.goo.gl/soM7RUKV1g8WgnSP8', '_blank');
        } else if ($(this).attr('name') == 'poke') {
            $('#wish').text('Yêu Nóc');
        } else {
            alert('Chúc mừng sinh nhật');
        }
    })
})