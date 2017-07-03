user_controller = {
    index: function(request, response) {
        response.render('user/index', { title: 'Express' })
    },

    new_user: function(request, response) {
        response.render('user/new', { title: 'Express' })
    }

}

module.exports = user_controller
