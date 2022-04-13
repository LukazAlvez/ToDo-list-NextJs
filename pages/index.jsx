import { useState } from "react"
import style from "../styles/Main.module.css"
import Box from "./components/Box"
import NavBar from "./components/NavBar"
import { db } from "./firebase"
import { uid } from "uid"
import { onValue, ref, set } from "firebase/database"
import { useEffect } from "react"

export default function Home(){

  const [input, setInput] = useState("")
  const [posts, setPost] = useState([])

  useEffect(()=>{
    getPost()
  },[])

  function getPost(){
    onValue(ref(db),(snapshot)=>{
      setPost([])
      const data = snapshot.val()
      if(data !== null){
        Object.values(data).map((post)=>{
        setPost((oldArray)=> [post, ...oldArray])
      })
      }
      
    })
  }
 
  const handleChange = (e) =>{
    setInput(e.target.value)
  }

  const writeDataBase = () =>{
    const id = uid()
    const dt = new Date();
   
  
    if(input !== ""){
      set(ref(db, `/${dt}`),{
        input,
        id
      })
      setInput("")
    }else{
      alert("Digite algo")
    }
  }
  return (
    <div>
      <NavBar
        logo = "To-Do List next.js"
      />
      <div className={style.container}>
        <div>
          <Box>
            <div className={style.inputBox}>
      
                <textarea onChange={handleChange} name="" id="" cols="30" rows="3"></textarea>
                <button onClick={writeDataBase}>Publicar</button>
 
            </div>
          </Box>
          <div>
              {posts.map((post, id) =>
                <Box key={id}>
                  <div><h2>{post.input}</h2></div>
                </Box>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
