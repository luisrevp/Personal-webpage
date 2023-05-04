// Indicador de campo faltante
const aviso = document.createElement("h2");
aviso.innerHTML = "Fill all the fields";
aviso.style = "color: #FF6415; font-size: 1.3em";

const formContainer = document.querySelector("form");
const form = document.querySelector(".form-wrapper");
const formFields = form.querySelectorAll("input, textarea");
const submit = document.querySelector(".sendForm");

const sentEmailNotification = document.createElement("p");
sentEmailNotification.className = "sent-email";
sentEmailNotification.style = "width: 100%; color: white; text-align: center; position: relative; padding:10px 0px";

function checkFormFields() {

  const allFieldsComplete = Array.from(formFields).every(field => field.value.length > 1);

  for (input of formFields) {
    if (input.value == "") {
      input.style.background = "#FDFF94";
    } else {
      input.style.background = "#fff";
    }
  }

  !allFieldsComplete
    ? form.insertBefore(aviso, submit)
    : aviso.remove();

  return allFieldsComplete;
}

function clearForm(fields){
  Array.from(fields).forEach(field => {
    field.value = "";
  });
}

// POST
async function sendEmail(url){

  // building email information
  const emailInformation = {
    username: Array.from(formFields).find(field => field.type == "text").value,
    email: Array.from(formFields).find(field => field.type == "email").value,
    message: Array.from(formFields).find(field => field.tagName.toLowerCase() == "textarea").value
  };

  try{
    const request = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailInformation)
    });

    if(request.ok){
      return request.json();
    }else{
      sentEmailNotification.innerHTML = "There was an error sending email...";
      console.log("there was an error sending your email...");
      form.appendChild(sentEmailNotification);
    }

  } catch(er) {
    console.log(er);
    throw new Error(er);
  }
}

// GET
async function getHelloWorld(url){
  try{
    const request = await fetch(url, {
      method: "GET",
      cors: "no-cors"
    });
    if(request.ok){
      const response = await request.json();
      const clientMessage = `Mensaje de ${response.from}: ${response.message}`;
      console.log(clientMessage);
      return clientMessage;
    }else{
      console.log("there was an error fetching data...");
    }
  } catch(er) {
    console.log(er);
    throw new Error(er);
  }
}

// GET de hola mundo
submit.addEventListener("click", (e) => {
  getHelloWorld("http://localhost:3000/hello-world")
});

// POST para enviar email
submit.addEventListener("click", (e) => {
  try{
    if(checkFormFields()){
      sendEmail("http://localhost:3000/send-email");
      sentEmailNotification.innerHTML = "Your message has been sent!";
      clearForm(formFields);
      form.appendChild(sentEmailNotification);
    }else{
      throw new Error("there are incomplete fields...");
    }
  }catch(er){
    console.log(er)
  }

})
