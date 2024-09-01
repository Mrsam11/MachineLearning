$(document).ready(function() {
    $('#analyze-btn').click(function() {
        var text = $('#review-text').val();
        $.ajax({
            url: '/analyze',
            method: 'POST',
            data: { text: text },
            success: function(response) {
                $('#sentiment').text(response.sentiment);
                $('#score').text(response.score.toFixed(4));
                $('#score-bar').css('width', (response.score * 100) + '%');
                $('#result').removeClass('hidden');
            }
        });
    });

    $('#batch-form').submit(function(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('file', $('#csv-file')[0].files[0]);
        $.ajax({
            url: '/batch_analyze',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                var blob = new Blob([response], { type: 'text/csv' });
                var url = window.URL.createObjectURL(blob);
                $('#download-link').attr('href', url).removeClass('hidden');
            }
        });
    });
});