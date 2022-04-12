import style from "../../styles/Box.module.css"


export default function Box (props){
    return(
        <div className={style.box}>
            {props.children}
        </div>
    )
}