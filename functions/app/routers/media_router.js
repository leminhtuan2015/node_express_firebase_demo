var controller_path = app_root + '/app/controllers/media_controller'
var controller = require(controller_path)

module.exports = function(router){
    router.get('/media', function(request, response) {
      controller.index(request, response)
    })

    router.get('/media/new', function(request, response) {
        controller.new_media(request, response)
    })

    router.get('/media/random', function(request, response) {
        controller.random(request, response)
    })

    router.post('/media/create', function(request, response) {
        controller.create(request, response)
    })
}
