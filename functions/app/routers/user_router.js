var controller_path = app_root + '/app/controllers/user_controller'
var user_controller = require(controller_path)

module.exports = function(router){
    router.get('/user', function(request, response) {
      user_controller.index(request, response)
    })

    router.get('/user/new', function(request, response) {
        user_controller.new_user(request, response)
    })

    router.post('/user/create', function(request, response) {
        user_controller.create(request, response)
    })
}
