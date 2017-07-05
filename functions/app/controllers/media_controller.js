var Media = require("../models/media")
var User = require("../models/user")

controller = {
    random: function(request, response){

        var lastItemId = request.query.lastItemId
        var uid = request.query.uid

        console.log("lastItemId : " + lastItemId)
        console.log("uid : " + uid)

        if(lastItemId){
            new Media().next(lastItemId, function(isSuccess, data){
                if(isSuccess){
                    response.json({title: data.title, content: data.content, author: data.author, lastItemId: data.id})
                } else {
                    response.json({title: "title", content: "content", author: "author", lastItemId: "lastItemId"})
                }
            })
        } else {
            new Media().first(function(isSuccess, data){
                if(isSuccess){
                    response.json({title: data.title, content: data.content, author: data.author, lastItemId: data.id})
                } else {
                    response.json({title: "title", content: "content", author: "author", lastItemId: "lastItemId"})
                }
            })
        }
    },

    index: function(request, response) {

        new Media().all(function(isSuccess, data){
            if(isSuccess){
                response.render('media/index', { title: 'Express', media: data})
            } else {
                response.render('media/index', { title: 'Express', media: []})
            }
        })
    },

    new_media: function(request, response) {
        response.render('media/new', { title: 'Express' })
    },

    create: function(request, response) {

        var title = request.body.title
        var content = request.body.content
        var author = request.body.author

        console.log(title)
        console.log(content)
        console.log(author)

        var media = new Media({title: title, content: content, author: author})

        media.create(function(error) {
            if(error){
                //response.json({ user_name: user_name, email: email, success: false })

                response.redirect(app_name + "/media/")
            } else {
                //response.json({ user_name: user_name, email: email, success: true })

                response.redirect(app_name + "/media/")
            }
        })
    }
}

module.exports = controller
