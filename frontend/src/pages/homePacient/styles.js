import styled from 'styled-components';

export const Modal = styled.div`
    background: #eaf3ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0px;
    overflow: auto;
    padding: 20px;

    label {
      padding: 20px;
      font-family: Montserrat;
      font-weight: 500;
      font-size: 18px;
      color: #314f72
    }

    .horario-disponivel {
      font-family: Montserrat;
      font-size: 20px;
      cursor: pointer;
      color: #5d90d0;
      font-weight: 700;
      background-color: transparent;
      outline: none;
      border: none;
      align-self: center
    }

    .div-horarios {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap:wrap;
    }

    .horario-indisponivel {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 400;
      color: #b2b7ba;
      cursor: default;
      background-color: transparent;
      outline: none;
      border: none;
    }

    h3 {
      color: #314f72;
      padding-top: 40px;
      font-family: Montserrat;
      font-weight: 700;
      font-size: 20px;
    }

    .button-close {
      position: absolute;
      top: 10px;
      right: 10px;
      outline: none;
      border: none;
      background-color: transparent;
      cursor: pointer;
      color: #314f72;
    }

    .button-modal {
      position: absolute;
      bottom: 20px;
      right: 20px;
      cursor: pointer;
      border-radius: 8px;
      outline: none;
      border: none;
      font-size: 18px;
      color: #fff;
      font-family: Montserrat;
      font-weight: 600;
      background-color: #5d90d0;
      width: 130px;
      height: 55px;

      :hover {
        opacity: 0.8;
      }
    }
`

export const Container = styled.div`
    background-color: #bfdaf8;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow:hidden;
    flex-wrap:wrap;
    overflow: auto;
  .left{
    width:20%;
    height: 100%;
    align-self: flex-start;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #eaf3ff;
    .perfil {
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: row;
        align-content: center;
        background-color: transparent;
        border-bottom: 1px solid lightgray;
        padding-left: 30px;
        padding-right: 50px;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 1;
        .perfil-img {
          display:flex;
          box-sizing: border-box;
          width: 40%;
          height: 80%;
          border-radius: 50%;
          background-color: #bfdaf8;
        }
        text {
          box-sizing: border-box;
          font-family: Montserrat;
          font-size: 32px;
          font-weight: 300;
          color: #314f72
        }

          @media (max-width: 600px),(max-height: 600px)
          {
            text {
              box-sizing: border-box;
              font-family: Montserrat;
              font-size: 15px;
              font-weight: 300;
              color: #314f72
             }
             .perfil-img {
               width:20%;
               height:40%;
             }
          }

      }
      .botao-sair {
        cursor: pointer;
        font-family: Montserrat;
        font-size: 20px;
        color: #fff;
        background-color: #5d90d0;
        width: 90%;
        height: 52px;
        outline: none;
        border: none;
        border-radius: 40px;
        margin-top: 30px;
        margin-bottom: 30px;
        :hover {
          opacity: 0.9;
        }
      }
      .version {
        color: #314f72;
        position: absolute;
        font-family: Montserrat;
        bottom: 10px;
        left: 10px;
      }

  }
  .right{
    width:80%;
    display:flex;
    flex-direction:column;
    height: 100%;
    background-color: #bfdaf8;
    align-self: flex-end;
    justify-content: space-between;

    .up {
      display: flex;
      flex-direction: column;
      height: 50%;
      width: 100%;
      background-color: #bfdaf8;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid #eaf3ff;
        h1 {
          font-family: Montserrat;
          color: #314f72;
          font-size: 28px;
          padding: 20px;
          text-align: center;
        }
      .div-table {
        width: 80%;
        height: 90%;
        table {
          border-collapse: collapse;
          width: 100%;

          cursor: default;
          }
          tr {
            display: flex;
            border: none;
            outline: none;
          }
          th {
              font-family: Montserrat;
              width: 100%;
              font-size: 18px;
              font-weight: 500;
              height: 35px;
              align-items: center;
              background-color: #5d90d0;
              color: #fff;
              width: 100%;
              overflow: auto;
              display: flex;
              justify-content: space-evenly;
              border-top-left-radius: 0px;
              border-top-right-radius: 16px;
              :first-child {
                border-top-right-radius: 0px;
                border-top-left-radius: 16px;
              }
          }
        }
        .div-table-sla {
          width: 100%;
          height: 45%;
          overflow: auto;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          ::-webkit-scrollbar-track {
              background-color: #F4F4F4;
          }
          ::-webkit-scrollbar {
              width: 6px;
              background: #F4F4F4;
          }
          ::-webkit-scrollbar-thumb {
              background: #dad7d7;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            height: 35px;
            border: 1px solid lightgray;
            width: 100%;
          }
          tr {
            display: flex;
            border: none;
            outline: none;
            align-items:center;
            cursor: pointer;
          }
          tr:nth-child(even) {
              background-color: #fff
            }
          td {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              text-align: center;
              font-family: Montserrat;
              font-size: 18px;
              font-weight: 500;
              height: 35px;
              color: #808080;


          }
          tr:nth-child(even) {
              background-color: #f8f6ff
            }
          tr:nth-child(odd) {
              background:#fff;
          }
          tr:hover {
            background-color: #f3f3f3
          }
        }
    }
    .down{
      display: flex;
      flex-direction: column;
      height: 50%;
      width: 100%;
      background-color: #bfdaf8;
      align-items: center;
      h1 {
          font-family: Montserrat;
          color: #314f72;
          font-size: 28px;
          padding: 20px;
          text-align: center;
        }

      .table-down{
        width: 80%;
        min-height:290px;
        height: 60%;
        display:flex;
        flex-direction:column;
        align-items:center;
        cursor: default;

        .table-header{
          border-collapse: collapse;
          width: 100%;
          tr {
            display: flex;
            border: none;
            outline: none;
          }
          th {
              font-family: Montserrat;
              width: 100%;
              font-size: 18px;
              font-weight: 500;
              height: 35px;
              align-items: center;
              background-color: #5d90d0;
              color: #fff;
              width: 100%;
              overflow: auto;
              display: flex;
              justify-content: space-evenly;
              border-top-left-radius: 0px;
              border-top-right-radius: 16px;
              :first-child {
                border-top-right-radius: 0px;
                border-top-left-radius: 16px;
              }
              :nth-child(2){
                border-top-right-radius: 0px;
              }
          }
        }
        .scroolbar-table-down {
          width: 100%;
          height: 55%;
          overflow: auto;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          ::-webkit-scrollbar-track {
              background-color: #F4F4F4;
          }
          ::-webkit-scrollbar {
              width: 6px;
              background: #F4F4F4;
          }
          ::-webkit-scrollbar-thumb {
              background: #dad7d7;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            height: 35px;
            border: 1px solid lightgray;
            width: 100%;
          }
          tr {
            display: flex;
            border: none;
            outline: none;
            align-items:center;
            cursor: pointer;
          }
          tr:nth-child(even) {
              background-color: #fff
            }
          td {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              text-align: center;
              font-family: Montserrat;
              font-size: 18px;
              font-weight: 500;
              height: 35px;
              color: #808080;
          }
          tr:nth-child(even) {
              background-color: #f8f6ff
            }
          tr:nth-child(odd) {
              background:#fff
          }
          tr:hover {
            background-color: #e2e2e2
          }
        }
      }


    }

  }






`
