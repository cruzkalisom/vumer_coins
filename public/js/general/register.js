$('#button-register').on('click', (event) => {
    event.preventDefault()
    var name = window.document.getElementById('name')
    var email = window.document.getElementById('email')
    var password = window.document.getElementById('password')
    var confirm_password = window.document.getElementById('confirm-password')

    name.classList.remove('is-invalid')
    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')
    confirm_password.classList.remove('is-invalid')

    var approve = true

    if(!name.value || !(/[a-zA-Z]/).test(name.value)){
        name.classList.add('is-invalid')
        approve = false
    }

    if(!email.value || !(/^[a-zA-Z0-9@#$%^&*\-_+={}[\]:;<>,.?~\\/()]+$/).test(email.value)){
        email.classList.add('is-invalid')
        approve = false
    }

    if(!password.value || !(/^[a-zA-Z0-9@#$%^&*\-_+={}[\]:;<>,.?~\\/()]+$/).test(password.value)){
        password.classList.add('is-invalid')
        approve = false
    }

    if(confirm_password.value !== password.value){
        confirm_password.classList.add('is-invalid')
        approve = false
    }

    if(!approve){
        return 
    }

    var formData = new FormData()

    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('password', password.value)

    console.log(formData)

    var dataToSend = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    var url = '/register'

    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: dataToSend,
        success: (data) => {
            var data = data
            console.log(data)
        },
        error: (err) => {
            console.log('Erro ao solicitar resposta na rota ' + url)
            console.log(err)
        }
    })
})