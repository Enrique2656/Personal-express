document.getElementById('list').addEventListener('click', getList)
document.getElementById('submit').addEventListener('click', alertSubmit)

let pencil = document.getElementsByClassName('fa-pencil')
let trash = document.getElementsByClassName('fa-trash')

function getList(){
    window.location = '/getList'
}

function alertSubmit(){
    alert('Your submission has been added!')
}
Array.from(pencil).forEach(function(element) {
    element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const email = this.parentNode.parentNode.childNodes[3].innerText
    const newEmail = prompt('type new email')
    fetch('/update', {
        method: 'put',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        'name': name,
        'email': email,
        'newEmail': newEmail
        })
    }).then(function (response) {
        window.location.reload()
    })
    });
});



Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const email = this.parentNode.parentNode.childNodes[3].innerText
    fetch('/deleteEmployee', {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        'name': name,
        'email': email
        })
    }).then(function (response) {
        window.location.reload()
    })
    });
});