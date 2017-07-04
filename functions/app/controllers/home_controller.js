controller = {
    index: function(request, response) {
        response.render('home/index', { title: 'Express' })
    }
}

module.exports = controller
