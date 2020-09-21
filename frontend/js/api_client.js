function api_client(url, content, callback) {
    console.log("content = "+JSON.stringify(content))
    fetch(url, content)
        .then((response) => {
            response
                .json()
                .then(object => {
                    var status  = response.status
                    callback(object,status)
                })
        })
        .catch((error) => {
            error.json()
                .then(err => {
                    var errJSON = {}
                    errJSON.status = err.status
                    errJSON.message = err.error.message
                    
                    console.log(JSON.stringify(errJSON))
                    callback(errJSON)
                })
        })
}  

