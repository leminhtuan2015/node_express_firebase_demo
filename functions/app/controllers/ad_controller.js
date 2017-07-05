var Ad = require("../models/ad")

controller = {
    index: function(request, response) {

        var saved = request.query.saved

        new Ad().get(function(isSuccess, data){
            if(isSuccess){
                response.render('ad/index', { title: 'Express', saved: saved, ad: data })
            } else {
                response.render('ad/index', { title: 'Express', saved: saved, ad: null })
            }
        })
    },

    create: function(request, response) {

        var ad_id_banner = request.body.ad_id_banner
        var ad_id_inter = request.body.ad_id_inter

        console.log("ad_id_banner : " + ad_id_banner)
        console.log("ad_id_inter : " + ad_id_inter)

        var ad = new Ad({ad_id_banner: ad_id_banner, ad_id_inter: ad_id_inter})

        ad.create(function(error) {
            if(error){
                //response.json({ user_name: user_name, email: email, success: false })

                response.redirect(app_name + "/ad?saved=false")
            } else {
                //response.json({ user_name: user_name, email: email, success: true })

                response.redirect(app_name + "/ad/?saved=true")
            }
        })
    },

    get: function(request, response){
        new Ad().get(function(isSuccess, data){
            if(isSuccess){
                response.json(data)
            } else {
                response.json({})
            }
        })
    }
}

module.exports = controller
