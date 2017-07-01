var home_controller_path = app_root + '/app/controllers/home_controller'
var home_controller = require(home_controller_path)

module.exports = function(router){
  router.get('/test', function(request, response) {
      home_controller.index(request, response)
  });
}
