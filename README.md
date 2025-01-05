# *Discordia*

> Orden de prioridades
> Autentificación, Autorización, Validación

> Ip y puerto de Socket IO
> localhost:3000

## Socket-Io

- Para Enviar mensajes a todos los subscritos a 'receiveMessage' utilizar 'sendMessage' subscribirse al evento 'welcome'
- Para Enviar mensajes a un canal en especial primero debe ingresar al canal 'joinChannel' y posteriormente usar
  'sendMessageToChannel' nombre del canal, mensaje
    - Para recibir mensajes de un canal en especial debe haber ingresado al canal primero 'joinChannel' nombre de canal,
      y subscribirse al evento 'channelMessage'
      Estructura de la respuesta de los mensajes de canal. {channelName: channelName, message: message}
      subscribirse al evento 'newUserJoined' para ver los usuarios que entran a un canal.

# **Escuchar eventos**

| Evento                       | Descripción                                 |
|------------------------------|---------------------------------------------|
| welcome                      | Da la bienvenida al usuario                 |
| newUserJoined                | Da la bienvenida al nuevo usuario del canal |
| welcomeMessage               | Bienvenido al canal                         |
| channelMessage               | Recibe mensajes en un canal especifico      |
| receiveMessage               | Recibe mensajes                             |
| receiveMessageToSpecificUser | recibe mensajes de un usuario               |

# **Eventos**

| Evento                    | Descripción                                       | Evento escuchar              |
|---------------------------|---------------------------------------------------|------------------------------|
| connect                   | Da la bienvenida al chat                          | welcome                      |
| disconnect                | Desconecta a un usuario                           |                              |
| connect_error             | Desconecta a un usuario por error                 |                              |
| joinChannel               | Entra a un canal en especifico y da la bienvenida | welcomeMessage newUserJoined |
| sendMessageToChannel      | Enviá un mensaje a un canal en especial           | channelMessage               |
| sendMessage               | Enviá un mensaje                                  | receiveMessage               |
| sendMessageToSpecificUser | Enviá un mensaje a un usuario en especifico       | receiveMessageToSpecificUser |


**Tareas por investigar a posterior**

* Crear Script para AWS
* Escalabilidad de Socket.io
* Escalabilidad de mongoDB (tener idea como trabaja más que nada)
* Optimizaciones de Socket.io para ahorrar costos (es caro tener canales abiertos (websocket))
* Investigar formas de evitar colisión de canal con el identificador de usuario (mongoDB)