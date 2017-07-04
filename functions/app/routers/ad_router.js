var controller_path = app_root + '/app/controllers/ad_controller'
var controller = require(controller_path)

module.exports = function(router){
    router.get('/ad', function(request, response) {
      controller.index(request, response)
    })

    router.get('/ad/new', function(request, response) {
        controller.new_user(request, response)
    })

    router.post('/ad/create', function(request, response) {
        controller.create(request, response)
    })
}
