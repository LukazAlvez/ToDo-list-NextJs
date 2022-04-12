import style from "../../styles/Main.module.css"

export default function NavBar(props){
    return(
        <div style={{borderBottom: "1px solid var(--cor-font)"}}>
        <div className={style.navBar}>
          <h2>{props.logo ?? "Logo"}</h2>
          <div>
            <ol>
              <li ><a href="#">Home</a></li>
              <li ><a href="#">Sobre</a></li>
              <li ><a href="#">Sair</a></li>
            </ol>
          </div>
        </div>
      </div>
    )
}