import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import Banner from './banner'
import { Spinner } from 'react-bootstrap'

function LoadWhats(props) {
    
    const [isImg, setIsImg] = useState(false)
    setTimeout(() => {
        setIsImg(true)
    }, 10000);

 
    return (
        <>
            <Container onLoad={props.onLoadFunction}>
                {props.loadSend
                    ? 
                    <>
                        <Banner props={"Escaneie o QRCode e aguarde"} />
                    
                            <div>
                                {isImg
                                    ? <img style={{ textAlign: 'center' }} id="img" src='./assets/qrcode.jpg'></img>
                                    : <Spinner animation="border" onLoad={()=>setIsImg(false)}/>
                                }
                            </div>
                    </>
                   : 
                        <>
                            <Banner props={"Aguarde o envio das mensagens. Acompanhe em seu celular"} />
                            <Spinner animation="border" />
                            </>
                }
            </Container>

        </>
    );
}

export default LoadWhats;