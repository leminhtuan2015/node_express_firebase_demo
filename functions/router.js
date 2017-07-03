module.exports = function(router){
	require("./app/routers/home_router")(router)
	require("./app/routers/user_router")(router)
}