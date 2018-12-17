'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token = "EAAEEzbo0cAEBAEFUvyFFJrQubl0ljqiMJi2D9qSYc5Un1iatRqZB2CefMcZBpdL9dXVI4SaIoiXYmNQCroodM5Gg9hG9OVK0mNE9y54AZCRIdZCcGBwi3YAC9LjBhzjheigl5eZCDw97qZCTGU98ZAVl87MQkfYLolhDMZAsPm8iaAZDZD"

const app = express();


app.set('port', (process.env.PORT || 5000 ));
// app.set('port', 5000);

app.use(bodyParser.json());

app.get('/',function(req,response){
  response.send('hola mundo');
});

app.get('/webhook', function(req,response){
  if(req.query['hub.verify_token'] === 'j0hnn13Walker2@18'){
    response.send(req.query['hub.challenge']);
  }else{
    response.send('No tienes permisos');
  }
});
// para saber que nos esta enviando si es texto o un adjunto
app.post('/webhook', function(req, res){
  const webhook_event = req.body.entry[0];
  if (webhook_event.messaging){
    webhook_event.messaging.forEach(event => {
      // console.log(event);
      handleEvent(event.sender.id,event);
    });
  };
  res.sendStatus(200);
});

function handleEvent(senderId,event){
  // Esta funcion nos va indicar que es lo que esta recibiendo y de esta manera procesar
  // es decir si es texto, adjunto, etc.

  // Analizamos si es un mensaje de texto lo que estamos recibiendo
  if (event.message){
    // console.log(event.message);
    if (event.message.quick_reply){
      console.log("indica que tengo lista de opciones");
      handleMessageReply(senderId,event)
    }else{
      // console.log("texto");
      handleSearchMessage(senderId,event);
    }
  }else{
    // Recibimos sobre eventos
    // console.log(event.postback.payload);
    handlePostback(senderId,event)
  }
}

function handleSearchMessage(senderId,event){
  if (event.message.text){
    // console.log(event.message.text);
    var patt = /hola/i;
    var boolSearch = patt.test(event.message.text);
    if (boolSearch){
      // console.log("lo encontro");
      let messageData = {};

      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [
                {
                  "title": "Hola, soy Johnnie Walker ¿Estás en Parque Arauco?",
                  "image_url": "http://pa-peru.com/digitas/chatbot-image/jw/intro_.jpg",
                  "buttons":[
                    {
                      "type": "postback",
                      "title": "SÍ",
                      "payload": "SI_PAYLOAD"
                    },
                    {
                      "type": "postback",
                      "title": "No",
                      "payload": "NO_JW_PAYLOAD"
                    }
                  ]
                }
              ]
            }
          }
        }
      }

      // Enviamos los datos
      senderActions(senderId);
      callSendApi(messageData);
    }else{
      // console.log("no lo encontro");
    }
  }
}

function handleMessageReply(senderId,event){
  var _payload = event.message.quick_reply.payload;
  let messageData = {};

  switch (_payload) {
    case "JW_18_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "Buena elección. Johnnie Walker 18 años es una mezcla de sabores plenos con intrigantes notas ahumadas, frutos secos y frutas pasas. Dulce y generoso al comienzo, de un sabor profundo y una persistencia prolongada. Aromas a vainilla y toques de mandarina, dan lugar lentamente a un acabado ahumado y especiado. \n\n ¿Quieres saber más de otro whisky?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_BLUE_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "El regalo perfecto, Johnnie Walker Blue Label. Un whisky de producción escasa que resume la  maestría y el arte del blending. Es complejo, elegante  y entrega sus sabores en etapas que se suceden entre si. inicia con un sabor a avellanas, miel, jerez y naranjas, para después liberar aromas a jengibre, sándalo y chocolate amargo. En boca de una acabado aterciopelado y un final duradero que recuerda al té ahumado y el  tabaco. \n\n ¿Quieres saber más de otro whisky?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_XR_21_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "¡Excelente gusto! JW XR 21 años es Firme, balanceado y elegante, se caracteriza por las agradables notas dulces a miel, vainilla, coco y frutas pasas. El sabor es envolvente, sedoso y persistente. Su elegancia y complejidad hacen justicia de los 21 años que madura y se perfecciona en  barrica. \n\n ¿Estás pensando en algún Johnnie en especial?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_GREEN_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "¡Un obsequio infaltable! La expresión más briosa y potente  de toda la familia walker. Se destaca su carácter e imperante carisma. Exhibe tanto en nariz como en  boca intensos aromas herbales y frutales, madera ahumada, pimienta, y delicadas notas de vainilla, con un final un picante y vibrante que recuerda al jengibre fresco. \n\n ¿Quieres saber más de otro Johnnie?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_GOLD_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "¡Un regalo de oro! Johnnie Walker Gold Reserve es conocido por su suavidad cremosa. El primer impacto se traduce en una explosión lujosa de gentiles notas a frutas maduras como los damascos y la confitura de naranja. Enmarcado por sabores a miel y avellanas tostadas. \n\n ¿Quieres saber más de otro whisky?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_WHITE_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "¡La bebida más codiciada de los 7 reinos! Este innovador whisky escocés, se disfruta mejor servido directamente del congelador al vaso para evocar la presencia de los Caminantes Blancos. Ofrece notas de azúcar caramelizado y vainilla, así como de bayas rojas y un toque afrutado. \n\n ¿Quieres saber más de otro whisky?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "JW_GREEN_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "¡Un obsequio infaltable! La expresión más briosa y potente de toda la familia Walker. Se destaca su carácter e imperante carisma. Exhibe tanto en nariz como en boca intensos aromas herbales y frutales, madera ahumada, pimienta y delicadas notas de vainilla con un final un picante y vibrante que recuerda al jengibre fresco. ¿Quieres saber más de otro Johnnie?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "PILETA_BOULEVARD_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "Sigue mis pasos: \n\n (1)Camina hacia el escenario Boulevard (bajando la escalera). \n\n (2)Dobla hacia la izquierda y accede por la entrada principal de Parque Arauco. \n\n (3)Cuando te topes con el árbol de Navidad dobla hacia la izquierda \n\n (4)Al final del pasillo encontrarás el regalo perfecto. \n\n ¿Estás pensando en algún Johnnie Walker en especial?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "KENNEDY_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "button",
              "text": "Sigue mis pasos: \n\n (1)Camina hacia Parque Arauco por la entrada principal. \n\n (2)Cuando te topes con el árbol de Navidad dobla hacia la izquierda \n\n (3)Al final del pasillo encontrarás el regalo perfecto. \n\n ¿Estás pensando en algún Johnnie Walker en especial?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Sí",
                  "payload": "SI_PRODUCT_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_FIN_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
  }
}

function handlePostback(senderId,event){
  var _postback = event.postback.payload;
  if (_postback === "GET_STARTED_JWCHATBOTCL"){
    degaultMessage(senderId);
  }else{
    handleMessageButtom(senderId,event);
    // console.log("cualquier otro evento");
  }
}

function handleMessageButtom(senderId,event){
  var _postback = event.postback.payload;
  let messageData = {};
  switch (_postback) {
    case "NO_JW_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "text": "Recuerda que puedes encontrar el mejor regalo en nuestro exclusivo Pop Up Store en el centro comercial Parque Arauco. ¿Qué tal si sorprendemos en estas fiestas con un Johnnie Walker? ¿Cuál te gustaría regalar? ",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "JW White Walker",
              "payload": "JW_WHITE_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Gold",
              "payload": "JW_GOLD_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Green",
              "payload": "JW_GREEN_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW 18 años",
              "payload": "JW_18_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Blue",
              "payload": "JW_BLUE_PAYLOAD"
            }
          ]
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "SI_PRODUCT_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "text": "¿Qué Johnnie Walker te gustaría?",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "JW White Walker",
              "payload": "JW_WHITE_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Gold",
              "payload": "JW_GOLD_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Green",
              "payload": "JW_GREEN_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW 18 años",
              "payload": "JW_18_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Blue",
              "payload": "JW_BLUE_PAYLOAD"
            }
          ]
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "NO_FIN_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "text": "No hay problema, estoy seguro que encontrarás el regalo perfecto. Keep Walking. Si necesitas que te vuelva a guiar escribe 'Hola'."
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "NO_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "text": "Recuerda que puedes encontrar el mejor regalo en nuestro exclusivo Pop Up Store en el centro comercial Parque Arauco. ¿Qué tal si sorprendemos en estas fiestas con un Johnnie Walker? ¿cuál te gustaría regalar?",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "JW White Walker",
              "payload": "JW_WHITE_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Gold",
              "payload": "JW_GOLD_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Green",
              "payload": "JW_GREEN_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW 18 años",
              "payload": "JW_18_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "JW Blue",
              "payload": "JW_BLUE_PAYLOAD"
            }
          ]
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
    case "SI_PAYLOAD":
      messageData = {
        "recipient": {
          "id": senderId
        },
        "message": {
          "text": "¿En qué parte te encuentras?",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "Entrada Kennedy",
              "payload": "KENNEDY_PAYLOAD"
            },
            {
              "content_type": "text",
              "title": "Pileta Boulevard",
              "payload": "PILETA_BOULEVARD_PAYLOAD"
            }
          ]
        }
      }
      // Enviamos los datos a nuestro api de facebook
      senderActions(senderId);
      callSendApi(messageData);
    break;
  }
}

function degaultMessage(senderId){
  let messageData = {};

  messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Hola, soy Johnnie Walker ¿Estás en Parque Arauco?",
              "image_url": "http://pa-peru.com/digitas/chatbot-image/jw/intro_.jpg",
              "buttons":[
                {
                  "type": "postback",
                  "title": "SÍ",
                  "payload": "SI_PAYLOAD"
                },
                {
                  "type": "postback",
                  "title": "No",
                  "payload": "NO_JW_PAYLOAD"
                }
              ]
            }
          ]
        }
      }
    }
  }

  // Enviamos los datos
  senderActions(senderId);
  callSendApi(messageData);

}

function senderActions(senderId){
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "sender_action": "typing_on"
  }
  callSendApi(messageData);
}

function callSendApi(response){
  // lo que va hacer el cord de nuestra aplaicacon cuando necesitemos enviar mensajes y presentarlo dentro de nuestro bot
  // con request podremos enviar esta informacion a nuestro bot
  // Le pasamos la api a la cual nos vamos a conectar
  request(
    {
      "url": "https://graph.facebook.com/me/messages/",
      "qs": {
        "access_token": access_token
      },
      "method": "POST",
      "json": response
    },
    function(err){
      if (err) {
        // console.log("Ha ocurrido un error");
      }else{
        // console.log("mensaje enviado");
      }
    }
  );
}

// Una funcion para indicar si esta funcionando o no nuestra aplicacion
app.listen(app.get('port'), function(){
  // console.log('nuestro servidor esta funcionando en el puerto: ' + app.get('port'))
});
