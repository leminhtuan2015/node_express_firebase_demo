var User = require("../models/user")

user_controller = {
    index: function(request, response) {
        var user = new User()

        user.all(function(isSuccess, data){
            if(isSuccess){
                console.log("users B: " + JSON.stringify(data))
                response.render('user/index', { title: 'Express', users: data})
            } else {
                response.render('user/index', { title: 'Express', users: []})
            }
        })
    },

    new_user: function(request, response) {
        response.render('user/new', { title: 'Express' })
    },

    create: function(request, response) {
        console.log("Create User")

        var user_name = request.body.user_name
        var email = request.body.email

        console.log("user_name: " + user_name)
        console.log("email: " + email)

        var user = new User({user_name: user_name, email: email})

        user.showInfo()

        user.create(function(error) {
            if(error){
                //response.json({ user_name: user_name, email: email, success: false })

                response.redirect(app_name + "/user/")
            } else {
                //response.json({ user_name: user_name, email: email, success: true })

                response.redirect(app_name + "/user/")
            }
        })
    }

}

module.exports = user_controller
