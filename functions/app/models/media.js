var table_name = "media/"

function Media(data) {

    data = data || {}
    this.id = data.id
    this.title = data.title
    this.content = data.content
    this.author = data.author
    this.created_at = new Date().getTime()
    this.updated_at = new Date().getTime()

    this.create = function(callback){
        database.ref(table_name).push(
        {
            title: this.title,
            content: this.content,
            author: this.author,
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

    this.get = function(){

    }

    this.update = function(){

    }

    this.remove = function(){

    }

    this.all = function(callback){
        console.log("Get All Media")

        var data = []

        database.ref(table_name)
            .once('value', function(snapshot) {

                snapshot.forEach(function(item) {
                    var itemVal = item.val()
                    var itemKey = item.key

                    console.log(itemKey + " : " + JSON.stringify(itemVal))

                    var d = {
                        id: itemKey,
                        title: itemVal.title,
                        content: itemVal.content,
                        author: itemVal.author,
                        created_at: itemVal.created_at,
                        updated_at: itemVal.updated_at
                    }

                    data.push(d)
                })

                data.sort(function(d1, d2){return d1.updated_at < d2.updated_at});

                callback(true, data)
            }, function(error) {
                console.error(error)
                callback(false, error)
            })
    }
}

module.exports = Media