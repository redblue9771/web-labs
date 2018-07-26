window.onload = function () {
    var login = document.getElementById("login");
    var register1 = document.getElementById("register-1");
    var register2 = document.getElementById("register-2");
    var toRegister2 = document.getElementById("to-register-2");
    var register = document.getElementById("register");
    var username = document.getElementById("username");
    var getUsername = document.getElementById("getUsername");
    var password = document.getElementById("password");
    var getPassword = document.getElementById("getPassword");
    var checkPassword = document.getElementById("checkPassword");
    var phoneNumber = document.getElementById("phoneNumber");
    var email = document.getElementById("email");
    var userStatus = document.getElementById("status");
    var userStatus1 = document.getElementById("status1");
    var userStatus2 = document.getElementById("status2");
    var goLogin = document.getElementById("go-login");
    var usernameReg = /^[\w\-]{1,16}$/;//1~16位数字字母和下划线减号
    var passwordReg = /^[\w\!\#\$\%\^\&\*\.\~\@\-]{6,16}$/;//6~16位密码
    var emailReg = /^[a-zA-Z0-9_]+[A-Za-z0-9_\-]*@([a-zA-Z0-9][A-Za-z0-9_\-]*[a-zA-Z0-9_]*\.)+[A-Za-z0-9]{2,4}$/;
    var phoneNumberReg = /^1[34578]\d{9}$/;
    //
    $("#go-login").click(function () {
            //afterSign.onclick=null;//使click只生效一次，第二次点击解除绑定
            if (usernameReg.test(username.value) && passwordReg.test(password.value)) {
                userStatus.style = "";
                var loginRequest = new XMLHttpRequest();
                loginRequest.open('post', "http://www.laiyangde.top/Home/Index/login", true);
                loginRequest.responseType = "json";
                loginRequest.onload = function () {
                    if (loginRequest.status === 200)
                        userStatus.innerText = loginRequest.response.message;
                };
                loginRequest.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                loginRequest.send('account=' + username.value.trim() + '&password=' + password.value.trim());
            }
            else {
                userStatus.style = "color:yellow;";//classList.add//增加class
                if (username.value === "" || password.value === "") {
                    userStatus.innerText = "账号或密码不能为空！";
                    username.focus();
                }
                else {
                    userStatus.innerText = "账号或密码格式错误！";
                    username.focus();
                }
            }
        }
    );

    $("#to-register").click(function () {
        $("#login").toggle();
        $("#register-1").fadeToggle();
        userStatus1.style.color = "white";
        userStatus1.innerText = "输入你想要的账号密码以继续！";
    });

    $("#to-login").click(function () {
        $("#register-1").toggle();
        $("#login").fadeToggle();
        login.style.display = "";
        userStatus.style.color = "white";
    });

    $("#to-register-2").click(function () {
        if (usernameReg.test(getUsername.value) && passwordReg.test(getPassword.value) && getPassword.value === checkPassword.value) {
            $("#register-1").toggle();
            $("#register-2").fadeToggle();
            userStatus1.innerText = "继续完善你的信息！";
        } else {
            userStatus1.style.color = "yellow";
            if (getUsername.value === "" || getPassword.value === "") {
                userStatus1.innerText = "账号或密码不能为空！";
                getUsername.focus();
            } else if (getPassword.value !== checkPassword.value) {
                userStatus1.innerText = "两次密码输入不一致！";
                getPassword.focus();
            } else {
                userStatus1.innerText = "账号或密码格式错误！";
                getUsername.focus();
            }

        }
    });

    $("#to-register-1").click(function () {
        $("#register-2").toggle();
        $("#register-1").fadeToggle();
        userStatus1.innerText = "输入你想要的账号密码以继续！";
    });

    register.onclick = function () {
        if (phoneNumberReg.test(phoneNumber.value) && emailReg.test(email.value)) {
            userStatus2.style = "";
            var registerRequest = new XMLHttpRequest();
            registerRequest.open('post', "http://www.laiyangde.top/Home/Index/register", true);
            registerRequest.responseType = "json";
            registerRequest.onload = function () {
                if (registerRequest.status === 200) {
                    userStatus2.innerText = registerRequest.response.message;
                }
            };
            registerRequest.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            registerRequest.send('username=' + getUsername.value.trim() + '&password=' + getPassword.value.trim() + '&tel=' + phoneNumber.value.trim() + '&email=' + email.value.trim());
        } else if (!phoneNumberReg.test(phoneNumber.value) || phoneNumber.value === "") {
            userStatus2.style.color = "yellow";
            userStatus2.innerText = "手机号为空或者格式错误！";
            phoneNumber.focus();
        } else if (!emailReg.test(email.value) || email.value === "") {
            userStatus2.style.color = "yellow";
            userStatus2.innerText = "邮箱为空或格式错误！";
            email.focus();
        }
    };

    document.onkeypress = function (key) {
        if (key.keyCode === 13) {
            if (login.style.display === "")
                goLogin.click();//finishLogin();
            else if (register1.style.display === "")
                toRegister2.click();//next();
            else if (register2.style.display === "")
                register.click();//finishRegister();
        }
    };


    /**
     * 绑定 一
     */
    //<input id="to-sign" type="button" value="登录" onclick="checkSign"/>内联调用checkSign方法 checkSign 方法见下

    /**
     *绑定和解绑 二
     */
    // goLogin.onclick = function () {
    //     //afterSign.onclick=null;//使click只生效一次，第二次点击解除绑定
    //     if (usernameReg.test(username.value) && passwordReg.test(password.value)) {
    //         userStatus.style = "";
    //         userStatus.innerText = username.value + "登录成功！";
    //     } else {
    //         userStatus.style = "color:yellow;";//classList.add//增加class
    //         if (username.value === "" || password.value === "") {
    //             userStatus.innerText = "账号或密码不能为空！";
    //             username.focus();
    //         }
    //         else {
    //             userStatus.innerText = "账号或密码格式错误！";
    //             username.focus();
    //         }
    //     }
    // };

    /**
     * 绑定和解绑 三
     */
    // function checkSign() {
    //     if (usernameReg.test(username.value) && passwordReg.test(password.value)) {
    //         userStatus.className = "";//classList.remove
    //         userStatus.innerText = username.value + "登录成功！";
    //     } else {
    //         userStatus.className = "hint";//classList.add
    //         if (username.value === "" || password.value === "")
    //             userStatus.innerText = "账号或密码不能为空！";
    //         else
    //             userStatus.innerText = "账号或密码格式错误！";
    //     }
    //     afterSign.removeEventListener("click",checkSign);//使click只生效一次，第二次点击解除绑定
    // }
    //
    // afterSign.addEventListener("click", checkSign);

    // register.onclick = function () {
    //     box.innerHTML = "<form id='box'>" +
    //         "<h2>注册：第一步</h2>" +
    //         "<span>账号</span><input id='username' type='text' placeholder='your username' autocomplete='off'/><br/>" +
    //         "<span>密码</span><input id='password' type='password' placeholder='your password' autocomplete='off'/><br/>" +
    //         "<span>确认密码</span><input id='checkpassword' type='password' placeholder='verify password' autocomplete='off'/>" +
    //         "<br/> <p id='sign-status'>欢迎来到网科组!</p>" +
    //         "<input id='back' type='button' value='返回'/>" +
    //         "<input id='next' type='button' value='下一步'/>" +
    //         "</form>";
    //     back = document.getElementById("#back");
    //     back.onclick = function () {
    //         box.innerHTML="<form id='box'>" +
    //             "<h1>综合科学技术教育</h1>" +
    //             "<span>账号</span><input id=\"username\" type=\"text\" placeholder=\"your username\" autocomplete=\"off\"/><br/>" +
    //             "<span>密码</span><input id=\"password\" type=\"password\" placeholder=\"your password\" autocomplete=\"off\"/><br/>" +
    //             "<p id=\"sign-status\">欢迎来到网科组!</p>" +
    //             "<input id=\"to-sign\" type=\"button\" value=\"登录\"/>" +
    //             "<input id=\"to-register\" type=\"button\" value=\"注册\"/>"+
    //              "</form>";
    //     }
    // };

    // function finishLogin() {
    //     if (usernameReg.test(username.value) && passwordReg.test(password.value)) {
    //         userStatus.style = "";
    //         userStatus.innerText = username.value + "登录成功！";
    //     } else {
    //         userStatus.style = "color:yellow;";//classList.add//增加class
    //         if (username.value === "" || password.value === "") {
    //             userStatus.innerText = "账号或密码不能为空！";
    //             username.focus();
    //         }
    //         else {
    //             userStatus.innerText = "账号或密码格式错误！";
    //             username.focus();
    //         }
    //     }
    // }
    //
    // function next() {
    //     if (usernameReg.test(getUsername.value) && passwordReg.test(getPassword.value) && getPassword.value === checkPassword.value) {
    //         register1.style.display = "none";
    //         register2.style.display = "";
    //     } else {
    //         userStatus1.style = "color:yellow;";
    //         if (getUsername.value === "" || getPassword.value === "") {
    //             userStatus1.innerText = "账号或密码不能为空！";
    //             getUsername.focus();
    //         } else if (getPassword.value !== checkPassword.value) {
    //             userStatus1.innerText = "两次密码输入不一致！";
    //             getPassword.focus();
    //         } else {
    //             userStatus1.innerText = "账号或密码格式错误！";
    //             getUsername.focus();
    //         }
    //
    //     }
    // }
    //
    // function finishRegister() {
    //     if (phoneNumberReg.test(phoneNumber.value) && emailReg.test(email.value)) {
    //         userStatus2.style = "";
    //         userStatus2.innerText = "注册成功！";
    //         //    location.reload();
    //     } else if (!phoneNumberReg.test(phoneNumber.value) || phoneNumber.value === "") {
    //         userStatus2.style = "color:yellow;";
    //         userStatus2.innerText = "手机号为空或者格式错误！";
    //         phoneNumber.focus();
    //     } else if (!emailReg.test(email.value) || email.value === "") {
    //         userStatus2.style = "color:yellow;";
    //         userStatus2.innerText = "邮箱为空或格式错误！";
    //         email.focus();
    //     }
    // }

    //
    // goLogin.addEventListener("click", finishLogin);
    //
    // toRegister.onclick = function () {
    //     login.style.display = "none";
    //     register1.style.display = "";
    // };
    //
    // toLogin.onclick = function () {
    //     register1.style.display = "none";
    //     login.style.display = "";
    // };
    //
    // toRegister2.addEventListener("click", next);
    //
    // toRegister1.onclick = function () {
    //     register2.style.display = "none";
    //     register1.style.display = "";
    // };
    //
    // register.addEventListener("click", finishRegister);
};