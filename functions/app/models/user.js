var table_name = "users/"

function User(data) {

    data = data || {}
    this.id = data.id
    this.user_name = data.user_name
    this.email = data.email
    this.created_at = new Date().getTime()
    this.updated_at = new Date().getTime()

    this.showInfo = function(){
        console.log("My name is : " + this.name + " - My email is : " + this.email)
    }

    this.create = function(callback){
        var user_id = this.id

        database.ref(table_name + user_id).set(
        {
            user_name: this.user_name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at
        }, function(error) {
            if (error) {
                 console.log('Error has occured during saving process')
                 callback(error)
            } else {
                callback(null)
                console.log("Data has been saved succesfully")
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
        console.log("Get All Users")

        var users = []

        database.ref(table_name)
            .once('value', function(snapshot) {

                console.log("users A: " + JSON.stringify(snapshot))

                snapshot.forEach(function(item) {
                    var itemVal = item.val()
                    var itemKey = item.key

                    console.log(itemKey + " : " + JSON.stringify(itemVal))

                    var user = {id: itemKey,
                        user_name: itemVal.user_name,
                        email: itemVal.email,
                        created_at: itemVal.created_at,
                        updated_at: itemVal.updated_at
                    }

                    users.push(user)
                })

                users.sort(function(u1, u2){return u1.updated_at < u2.updated_at});

                callback(true, users)
            }, function(error) {
                console.error(error)
                callback(false, error)
            })
    }
}

module.exports = User