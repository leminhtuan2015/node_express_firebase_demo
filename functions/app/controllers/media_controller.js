var Media = require("../models/media")
var User = require("../models/user")

controller = {
    random: function(request, response){

        var lastItemId = request.query.lastItemId
        var uid = request.query.uid
        var language = request.query.language

        console.log("lastItemId : " + lastItemId)
        console.log("uid : " + uid)
        console.log("language : " + language)

        if(lastItemId){
            response.redirect(app_name + "/media/next?lastItemId=" + lastItemId + "&language=" + language)
        } else {
            response.redirect(app_name + "/media/first?language=" + language)
        }
    },

    first: function(request, response){
        var language = request.query.language

        new Media().first(function(isSuccess, data){
            if(isSuccess){
                response.json({
                    title: data.title,
                    content: data.content,
                    author: data.author,
                    image: data.image,
                    base64: data.base64,
                    lastItemId: data.id
                })
            } else {
                response.json(null)
            }
        })
    },

    next: function(request, response){
        var language = request.query.language
        var lastItemId = request.query.lastItemId

        new Media().next(lastItemId, function(isSuccess, data){
            if(isSuccess){

                if(data.id == lastItemId || !data.id){
                    response.redirect(app_name + "/media/first")
                } else {
                    response.json({
                        title: data.title,
                        content: data.content,
                        author: data.author,
                        image: data.image,
                        base64: data.base64,
                        lastItemId: data.id
                    })
                }
            } else {
                response.redirect(app_name + "/media/first")
            }
        })
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
        response.render('media/new', { title: 'Express', action: "create", media: null })
    },

    create: function(request, response) {

        var title = request.body.title
        var content = request.body.content
        var author = request.body.author
        var image = request.body.image

        console.log(title)
        console.log(content)
        console.log(author)
        console.log(image)

        var media = new Media({title: title, content: content, author: author, image: image})

        media.create(function(error) {
            if(error){
                //response.json({ user_name: user_name, email: email, success: false })

                response.redirect(app_name + "/media/")
            } else {
                //response.json({ user_name: user_name, email: email, success: true })

                response.redirect(app_name + "/media/")
            }
        })
    },

    edit: function(request, response, next){
        var id = request.params.id

        new Media().get(id, function(isSuccess, data){
            if(isSuccess){

                var media = data
                media.id = id

                console.log("Editing : " + JSON.stringify(data))
                response.render('media/new', { title: 'Express', action: "update", media: media })
            } else {
                response.redirect(app_name + "/media/")
            }
        })


    },

    update: function(request, response){
        var id = request.body.id
        var title = request.body.title
        var content = request.body.content
        var author = request.body.author
        var image = request.body.image

        var media = new Media({id: id, title: title, content: content, author: author, image: image})

        media.update(function(isSuccess) {
            if(isSuccess){
                response.redirect(app_name + "/media/")
            } else {
                response.redirect(app_name + "/media/")
            }
        })
    },

    _delete: function(request, response){

        var delete_id = request.params.id

        console.log("delete id : " + delete_id)

        new Media()._delete(delete_id, function(isSuccess){
            if(isSuccess){
                response.redirect(app_name + "/media/")
            } else {
                response.redirect(app_name + "/media/")
            }
        })
    },


}

module.exports = controller
