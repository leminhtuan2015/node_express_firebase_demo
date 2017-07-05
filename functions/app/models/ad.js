var table_name = "ad/"
var default_id = "ad_config"

function Ad(data) {

    data = data || {}
    this.ad_id_banner = data.ad_id_banner
    this.ad_id_inter = data.ad_id_inter
    this.created_at = new Date().getTime()
    this.updated_at = new Date().getTime()

    this.create = function(callback){
        database.ref(table_name + default_id).set(
        {
            ad_id_banner: this.ad_id_banner,
            ad_id_inter: this.ad_id_inter,
            created_at: this.created_at,
            updated_at: this.updated_at
        }, function(error) {
            if (error) {
                 console.log('Error has occured during saving process')
                 callback(error)
            } else {
                console.log("Data has been saved succesfully")
                callback(null)

            }
        })
    }

    this.update = function(){

    }

    this.remove = function(){

    }

    this.get = function(callback){

        database.ref(table_name + default_id)
            .once('value', function(snapshot) {

                var itemVal = snapshot.val()
                var itemKey = snapshot.key

                console.log(itemKey + " ad: " + JSON.stringify(itemVal))

                var data = {}

                if(itemVal){
                    data = {
                        ad_id_banner: itemVal.ad_id_banner,
                        ad_id_inter: itemVal.ad_id_inter,
                        created_at: itemVal.created_at,
                        updated_at: itemVal.updated_at
                    }
                } else {
                    data = {
                        ad_id_banner: "",
                        ad_id_inter: "",
                        created_at: 0,
                        updated_at: 0
                    }
                }


                callback(true, data)
            }, function(error) {
                console.error(error)
                callback(false, error)
            })
    }
}

module.exports = Ad