class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&(this.connectionHandler(),this.toggleChat())}connectionHandler(){console.log("in connection handler"),this.socket.on("connect",(()=>{console.log("connection established using sockets..!"),this.socket.emit("join_room",{user_email:this.userEmail,chatroom:"codeial"}),this.socket.on("user_joined",(function(e){console.log("user joined",e)})),$("#send-message").click((()=>{let e=$("#chat-message-input").val();$("#chat-message-input").val(""),""!=e&&this.socket.emit("send_message",{message:e,user_email:this.userEmail,chatroom:"codeial"})})),this.socket.on("receive_message",(e=>{console.log("message received",e);let s=$("<li>"),o="other-message";e.user_email==this.userEmail&&(o="self-message"),s.append($("<span>",{html:e.message})),s.append($("<sub>",{html:e.user_email})),s.addClass(o),$("#chat-messages-list").append(s)}))}))}toggleChat(){$(".fa-sharp").click((()=>{console.log("clicked"),this.chatBox.hide()})),$(".fa-comments").click((()=>{console.log("clicked"),this.chatBox.show()}))}}