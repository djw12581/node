
var log = function () {
    return console.log.apply(this, arguments)
}
// bind event
var bindEvent = function (selectors, fn) {
    for (let index = 0; index < selectors.length; index++) {
        const element = selectors[index];
        element.addEventListener('click', fn)
    }
}
// update
var updateEvent = function (params) {
    log('s')
}
// delate
var delateEvent = function (params) {
    log('a')
    // 调用api
    fetch('http://localhost:3000/api/get', {
        method: 'GET',
        mode: "cors",
        headers: {
            'Accept': 'aplication/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.text()
    }).then(res => {
        var s = JSON.parse(res)

        console.log('get essays', s)
    })
    // fetch('http://localhost:3000/api/add', {
    //     method: 'POST',
    //     mode: "cors",
    //     headers: {
    //         'Accept': 'aplication/json',
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     return res.text()
    // }).then(res => {
    //     var s = JSON.parse(res)

    //     console.log('get essays', s)
    // })
}


window.onload = function () {

    // 
    // var btn = document.querySelectorAll('.aa')
    var update = document.querySelectorAll('.update')
    var delate = document.querySelectorAll('.delate')

    bindEvent(update, updateEvent)
    bindEvent(delate, delateEvent)
    // 查找所有数据

}