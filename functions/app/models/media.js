var table_name = "media/"

function Media(data) {

    data = data || {}
    this.id = data.id
    this.title = data.title
    this.content = data.content
    this.author = data.author
    this.image = data.image
    this.created_at = new Date().getTime()
    this.updated_at = new Date().getTime()

    this.create = function(callback){
        database.ref(table_name).push(
        {
            title: this.title,
            content: this.content,
            author: this.author,
            image: this.image,
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

    this.get = function(id, callback){
        database.ref(table_name + id).once("value", function(snapshot) {
            callback(true, snapshot.val())
        }, function (errorObject) {
            callback(false, errorObject.code)
        })
    }

    this.update = function(callback){
        database.ref(table_name + this.id).set(
        {
            title: this.title,
            content: this.content,
            author: this.author,
            image: this.image,
            created_at: this.created_at,
            updated_at: this.updated_at
        }, function(error) {
            if (error) {
                 console.log('Error has occured during saving process')
                 callback(false)
            } else {
                console.log("Data has been saved succesfully")
                callback(true)
            }
        })
    }

    this._delete = function(id, callback){
        database.ref(table_name + id).remove(function (error) {
            if (error) {
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    this.first = function(callback){
        database.ref(table_name).limitToFirst(1).once("value",
        function(snapshot) {
            console.log("Media First 1: " + JSON.stringify(snapshot))

            var itemVal = ""
            var itemKey = ""

            snapshot.forEach(function(item) {
                itemVal = item.val()
                itemKey = item.key
            })

            itemVal.id = itemKey

            console.log("itemVal: " + JSON.stringify(itemVal))
            console.log("itemKey: " + JSON.stringify(itemKey))

            callback(true, itemVal)
        },
        function(error) {
            console.error(error)
            callback(false, error)
        })
    }

    this.next = function(lastItemId, callback){
        database.ref(table_name).orderByKey().startAt(lastItemId).limitToFirst(2).once("value",
        function(snapshot) {
            console.log("Media First 1: " + JSON.stringify(snapshot))

            var itemVal = ""
            var itemKey = ""

            snapshot.forEach(function(item) {
                itemVal = item.val()
                itemKey = item.key
            })

            itemVal.id = itemKey

            console.log("itemVal: " + JSON.stringify(itemVal))
            console.log("itemKey: " + JSON.stringify(itemKey))

            callback(true, itemVal)
        },
        function(error) {
            console.error(error)
            callback(false, error)
        })
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
                        image: itemVal.image,
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