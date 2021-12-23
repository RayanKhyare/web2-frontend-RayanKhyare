window.onload = function () {

    getUserData()


    function getUserData() {
        let userId = sessionStorage.getItem("userId");

        fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                let container = document.getElementById('profilcontainer');
                let htmlString = "";
                let dataId = data._id
                let userFirstName = data.firstname;
                let userLastName = data.lastname;
                let userEmail = data.email;
                let userPassword = data.password;

                htmlString += ` <h2 class="textprofil" id="${dataId} textprofil">First name : </h2>
            <h3 class="firstnamestyle" id="firstnamestyle">${userFirstName}</h3>
            <h2 class="textprofil">Last Name : </h2>
           
            <h3 class="firstnamestyle" id="lastnamestyle" >${userLastName}</h3>
          
            <h2 class="textprofil">Email : </h2>
            <div class="divEmailEdit">
            <h3 class="firstnamestyle">${userEmail}</h3> <i class="material-icons updateacc" id="updateacc">create</i>
            </div>
            <div class="emailInput" id="emailInput">

            <form class="emailChangeForm" id="emailChangeForm">
            <input type="text" class="emailInputForm" id="emailInputForm" name="email">
            <button type="submit" class="submitEmailChange" id="submitEmailChange">Change email</button>

            </form>
            </div>
            <h2 class="textprofil">Password : </h2>
            <div class="divPasswordEdit">
            <h3 class="firstnamestyle"><a id="passwordShow">Change password</a></h3><i class="material-icons updatepassword" id="updatepassword">create</i>
            </div>

            <div class="passwordInput" id="passwordInput">
            <form class="passwordChangeForm" id="passwordChangeForm">
            <input type="text" class="passwordInputForm" id="passwordInputForm" name="password">
            <button type="submit" class="submitpasswordChange" id="submitpasswordChange">Change password</button>

            </form>
            </div>

           
            `

                container.insertAdjacentHTML("afterbegin", htmlString);
                updateUserEmail(userFirstName, userLastName, userPassword)
                updateUserPassword(userFirstName, userLastName, userEmail)
                showEditEmailBtn()
                showEditPasswordBtn()
            })

    }

    function updateUserEmail(userFirstName, userLastName, userPassword) {

        document.getElementById("emailChangeForm").addEventListener('submit', e => {
            console.log(e.target.email);
            e.preventDefault()
            let userId = sessionStorage.getItem("userId");

            let firstNameValue = userFirstName
            console.log(firstNameValue);
            let secondNameValue = userLastName
            console.log(secondNameValue);
            let emailValue = e.target.email.value
            console.log(emailValue);
            let passwordValue = userPassword
            console.log(emailValue);

            const accUpdate = {
                "firstname": firstNameValue,
                "lastname": secondNameValue,
                "email": emailValue,
                "password": passwordValue
            }
            fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accUpdate)
                }).then(res => {
                    res.json()
                })
                .then(data => {
                    console.log(data);
                    if (data == undefined) {
                        location.reload();
                    }
                });
        })

    }

    function updateUserPassword(userFirstName, userLastName, userEmail) {

        document.getElementById("passwordChangeForm").addEventListener('submit', e => {
            console.log(e.target.password);
            e.preventDefault()
            let userId = sessionStorage.getItem("userId");

            let firstNameValue = userFirstName
            console.log(firstNameValue);
            let secondNameValue = userLastName
            console.log(secondNameValue);
            let emailValue = userEmail
            console.log(emailValue);
            let passwordValue = e.target.password.value
            console.log(emailValue);

            const accUpdate = {
                "firstname": firstNameValue,
                "lastname": secondNameValue,
                "email": emailValue,
                "password": passwordValue
            }
            fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accUpdate)
                }).then(res => {
                    res.json()
                })
                .then(data => {
                    console.log(data);
                    if (data == undefined) {
                        location.reload();
                    }
                });
        })

    }



    document.getElementById("deleteaccbtn").addEventListener("click", function (e) {
        console.log("lets gooo");
        document.getElementById("deleteaccsure").style.display = "block";
    })


    document.getElementById("deleteaccsure").addEventListener("click", function (e) {
        console.log("lets gooo");

        fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${d}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTimeout(window.location.reload(), 100)
            })
        window.location.href = "./index.html"
    })

    document.getElementById("discaccbtn").addEventListener("click", function (e) {
        sessionStorage.removeItem("userId")
        window.location.href = "./../index.html"
    })

    function showEditEmailBtn() {
        document.getElementById("updateacc").addEventListener("click", function (e) {

            document.getElementById("emailInput").style.display = "block";
        })
    }

    function showEditPasswordBtn() {
        document.getElementById("updatepassword").addEventListener("click", function (e) {

            document.getElementById("passwordInput").style.display = "block";
        })
    }

}