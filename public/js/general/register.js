$('#button-register').on('click', (event) => {
    event.preventDefault()
    var name = window.document.getElementById('name')
    var email = window.document.getElementById('email')
    var password = window.document.getElementById('password')
    var confirm_password = window.document.getElementById('confirm-password')
    var url = '/register'
    var formData = new FormData()

    name.classList.remove('is-invalid')
    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')
    confirm_password.classList.remove('is-invalid')

    var approve = true

    if(!name.value || !(/[a-zA-Z]/).test(name.value)){
        name.classList.add('is-invalid')
        approve = false
    }

    if(!email.value || !(/^[a-zA-Z0-9@#$%^&*\-_+={}[\]:;<>,.?~\\/()]+$/).test(email.value) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)){
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

    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('password', password.value)

    $.ajax({
        url: url,
        method: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            var data = data
            
            if(data.registered){
                email.classList.add('is-invalid')
                return alerta('Email já existe')
            }

            if(data.status){
                location.href = '/'
            }
        },
        error: (err) => {
            console.log('Erro ao solicitar resposta na rota ' + url)
            console.log(err)
        }
    })
})

function alerta(message){
    var alert = window.document.getElementById('alert')

    alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <div>${message}</div>
        </div>
    `
}