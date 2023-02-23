import React,{useEffect} from 'react'
import { PubSub } from 'pubsub-js';
import {createWebSocket,closeWebSocket,websocket} from './websocket';

function Ws(){
    
useEffect(() => {
    let url="ws://192.168.56.1:8086/ppq/999";//服务端连接的url
        createWebSocket(url)
        let messageSocket=null;
        messageSocket = PubSub.subscribe('message',getMsg)
        //在组件卸载的时候，关闭连接
         return ()=>{
            PubSub.unsubscribe(messageSocket); 
            closeWebSocket();
        }
}, []);

const sendMsg=()=>{
    let msg='发送消息'
    websocket&&websocket.send(msg)
    console.log('ws发送')
}

const getMsg=(topic,message)=>{
    console.log('ws获取：',message)
}

const regInput = React.useRef();

const reCreateWS=()=>{
    const v = regInput.current.value;
    if(v != null && v !==''){
        closeWebSocket();
        createWebSocket(v);
    }
}
    return(
        <div>
            <input type="text" id='urlText' ref={regInput}/>
            <button onClick={reCreateWS} >连接websocket</button>
            <button onClick={sendMsg}>发送消息</button>
            <button onClick={closeWebSocket}>关闭连接</button>
        </div>
    )
}

export default Ws