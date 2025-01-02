# *Discordia*

> Orden de prioridades
  Autentificación, Autorización, Validación

> Ip y puerto de Socket IO
localhost:3000 

## Socket-Io

- Para Enviar mensajes a todos los subscritos a 'receiveMessage' utilizar 'sendMessage' subscribirse al evento 'welcome'
- Para Enviar mensajes a un canal en especial primero debe ingresar al canal 'joinChannel' y posteriormente usar 'sendMessageToChannel' nombre del canal, mensaje
  - Para recibir mensajes de un canal en especial debe haber ingresado al canal primero 'joinChannel' nombre de canal, y subscribirse al evento 'channelMessage'
    Estructura de la respuesta de los mensajes de canal. {channelName: channelName, message: message}
    subscribirse al evento 'newUserJoined' para ver los usuarios que entran a un canal.