$('#button-login').on('click', (event) => {
    event.preventDefault()
    
    var email = window.document.getElementById('email')
    var password = window.document.getElementById('password')
    var remember = window.document.getElementById('remember')
    var formData = new FormData()
    var url = '/login'

    verify = true

    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')

    if(!email.value || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)){
        email.classList.add('is-invalid')
        verify = false
    }

    if(!password.value){
        password.classList.add('is-invalid')
        verify = false
    }

    if(!verify){
        return
    }

    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('remember', remember.checked)

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            var data = data
            
            if(data.notemail){
                email.classList.add('is-invalid')
                return alerta('E-mail não cadastrado')
            }

            if(data.invalid_password){
                password.classList.add('is-invalid')
                return alerta('Senha incorreta')
            }

            if(data.status){
                window.location.href = data.oldpage
            }
        },
        error: (err) => {
            console.log('Erro ao tentar se conectar com a rota: ' + url)
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