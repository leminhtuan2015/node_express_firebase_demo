var controller_path = app_root + '/app/controllers/home_controller'
var home_controller = require(controller_path)

module.exports = function(router){
    router.get('/home', function(request, response) {
      home_controller.index(request, response)
    })

    router.get('/', function(request, response) {
        home_controller.index(request, response)
    });
}
