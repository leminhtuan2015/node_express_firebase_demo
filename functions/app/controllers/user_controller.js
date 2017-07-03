user_controller = {
    index: function(request, response) {
        response.render('user/index', { title: 'Express' })
    }
}

module.exports = user_controller
