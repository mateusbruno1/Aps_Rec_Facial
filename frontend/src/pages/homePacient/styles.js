import styled from 'styled-components';

export const Container = styled.div`


    background-color: #d4e6ff;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow:hidden;
    flex-wrap:wrap;
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
        right: 10px;
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
      .div-table {
        width: 80%;
        height:130%;
        table {
          border-collapse: collapse;
          width: 100%;
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
              background-color: #6c7ae0;
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
            align-items:center
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
        }
    }
    .down{
      display: flex;
      flex-direction: column;
      height: 50%;
      width: 100%;
      background-color: #bfdaf8;
      align-items: center;


      .table-down{
        width:80%;
        height:auto;
        display:flex;
        flex-direction:column;
        align-items:center;

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
              background-color: #6c7ae0;
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
            align-items:center
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
        }
      }


    }

  }






`