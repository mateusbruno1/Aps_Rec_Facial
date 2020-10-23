import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    /* display: flex;
    flex-direction: column;
    position: relative; */
    height: 100vh;
    width: 100%;

    .left {
        position: absolute;
        float: left;
        width: 50%;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: #e5f0ff;

        .div-texto {

            padding-top: 84px;
            cursor: default;

            h1 {
                font-family: Montserrat;
                color: #5d90d0;
                font-size: 48px;
                font-weight: 700;
                align-self: center;
                text-align: left;
                border-block: block;
                margin-left: 48px;
                margin-top: 78px;
                cursor: default;
            }

            h2 {
                font-family: Montserrat;
                color: #224161;
                font-size: 20px;
                margin-left: 48px;
                margin-top: -20px;
                font-weight: 400;
                align-self: center;
                text-align: left;
                cursor: default;
            }
        }

        .div-botoes {

            padding-top: 150px;
            flex-direction: column;
            display: flex;
            width: 100%;
            align-self: center;

            .login {
                cursor: pointer;
                height: 64px;
                width: 40%;
                float: left;
                margin-left: 48px;
                background-color: #d4e6ff;
                border-radius: 8px;
                border: none;
                outline: none;
                overflow: hidden;
                margin-bottom: 16px;
                align-self: center;


                font-family: Montserrat;
                font-weight: 700;
                color: #224161;

                :hover {
                    background-color: ${darken('0.03', '#d4e6ff')};
                }

            }

            .cadastre-se {
                cursor: pointer;
                height: 64px;
                width: 40%;
                float: left;
                margin-left: 48px;
                background-color: #4f877d;
                border-radius: 8px;
                border: none;
                outline: none;
                overflow: hidden;
                align-self: center;


                font-family: Montserrat;
                font-weight: 700;
                color: #fff;

                :hover {
                    background-color: ${darken('0.03', '#4f877d')};
                }
            }
        }
    }

    .right {
        background-color: #eaf3ff;
        position: absolute;
        float: right;
        width: 50%;
        height: 100%;
        right: 0px;
        top: 0px;

        .div-anim {
            width: 100%;
            right: 0px;
            padding-top: 180px
        }

    }

`
