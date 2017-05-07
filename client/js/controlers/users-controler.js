import * as templates from 'templates';
import * as data from 'data';

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

function validateUserData(inputData) {
    const {
        username,
        frstname,
        lsname,
        email,
        pass,
        passConfirm
    } = inputData;

    const regexUsername = /^[a-zA-Z0-9_\.]{6,30}$/;
    let error = false;
    if (!regexUsername.test(username)) {
        toastr.error('Not correct username field');
        error = true;
    }

    const regexName = /^[a-zA-Z]{1,30}$/;

    if (!regexName.test(frstname)) {
        toastr.error('Not correct first name field');
        error = true;
    }

    if (!regexName.test(lsname)) {
        toastr.error('Not correct last name field');
        error = true;
    }

    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
        toastr.error('Not correct email field');
        error = true;
    }

    if (!regexUsername.test(pass)) {
        toastr.error('Not correct password field');
        error = true;
    }

    if (pass !== passConfirm) {
        toastr.error('Not correct confirmation');
        error = true;
    }

    if (error) {
        return false;
    } else {
        return true;
    }
}

function register() {
    templates.get('register')
        .then(function(template) {
            $('#main-content').html(template());

            $('#btn-register').on('click', function() {
                const inputData = {
                    username: $('#tb-reg-username').val(),
                    frstname: $('#tb-reg-frstname').val(),
                    lsname: $('#tb-reg-lsname').val(),
                    email: $('#tb-reg-email').val(),
                    pass: $('#tb-reg-pass').val(),
                    passConfirm: $('#tb-reg-pass-confirm').val()
                };

                if (validateUserData(inputData)) {
                    data.register(inputData)
                        .then(function(successObject) {
                            login(inputData.username, inputData.pass);
                            toastr.success(`User ${successObject.username} registered!`);
                        }, function(err) {
                            toastr.error(err.responseJSON);
                        });
                }

            });
        });
}

function loginForm() {
    templates.get('signin')
        .then(function(template) {
            $('#main-content').html(template());

            $('#sign-in').on('click', function() {
                const username = $('#input-username').val();
                const password = $('#input-password').val();
                login(username, password)
            });
        });
}

function login(username, password) {
    const usrname = username;
    const pass = password;

    data.login(usrname, pass)
        .then(
            result => {
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, result.result.authKey);
                localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, result.result.username);
                $('#log-in').addClass('hidden');
                $('#log-out').removeClass('hidden');
                $('#nav-username').removeClass('hidden');
                $('#nav-username').html(username);
                toastr.success(`Hi, ${username}`);
                location.href = '#';
            },
            errorMsg => {
                toastr.error(errorMsg.responseJSON);
            });
}

function logout() {
    localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY);
    $('#log-in').removeClass('hidden');
    $('#log-out').addClass('hidden');
    $('#nav-username').addClass('hidden');
    toastr.success('Logged out');
    location.href = '#';
}

function initUserNavbar() {
    if (data.isLoggedIn()) {
        $('#log-in').addClass('hidden');
        $('#log-out').removeClass('hidden');
        $('#nav-username').removeClass('hidden');
        $('#nav-username').html(localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY));
    } else {
        $('#log-in').removeClass('hidden');
        $('#log-out').addClass('hidden');
        $('#nav-username').addClass('hidden');
    }
}


export {
    register,
    loginForm,
    logout,
    initUserNavbar
};
