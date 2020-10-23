import styled from 'styled-components';

export const Container = styled.div`
    background-color: #d4e6ff;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 60px;
        font-family: Montserrat;
        font-weight: 600;
    }

    .form {
        display: flex;
        flex-direction: column;
        /* position: absolute; */
        margin-bottom: 80px;
        left: 24%;
        right: 50%;
        align-self: center;
        width: 50%;
        background-color: #eaf3ff;
        border-radius: 8px;
        padding: 20px;

            input {
                width: 95%;
                align-self: center;
                padding: 20px;
                border: none;
                margin-bottom: 16px;
                font-family: Montserrat;
                border-radius: 8px;
                outline: none;
                font-size: 16px;
                font-weight: 600;

                ::placeholder {
                    font-family: Montserrat;
                    font-weight: 700;
                    color: lightgray
                }
                
            }

        .div-select {
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            width: 100%;
            border: none;
            margin-bottom: 16px;
            flex-direction: row;

            label {
                width: 40%;
                font-family: Montserrat;
                font-weight: 700;
                right: 0;
            }

            select {
                width: 40%;
                font-family: Montserrat;
                font-weight: 700;
                color: #224161;
                border-radius: 8px;
                outline: none;
                border: none;
                padding: 20px;
            }
        }

        .div-botao {
            width: 100%;

            button {
                float:right;
                border: none;
                outline: none;
                background-color: #224161;
                color: #eaf3ff;
                font-family: Montserrat;
                font-size: 22px;
                padding: 15px;
                border-radius: 8px;
            }
        }
    }
`