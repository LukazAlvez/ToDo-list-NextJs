import { useState } from "react"
import style from "../styles/Main.module.css"
import Box from "./components/Box"
import NavBar from "./components/NavBar"
import { db } from "./firebase"
import { uid } from "uid"
import { onValue, ref, remove, set, update } from "firebase/database"
import { useEffect } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"

export default function Home(){

  const date = new Date().toString();

  const [input, setInput] = useState("")
  const [posts, setPost] = useState([])

  useEffect(()=>{
    getPost()
  },[])


  // pega os dados do firebase
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
  // fim
 
  // pega o que foi digitado
  const handleChange = (e) =>{
    setInput(e.target.value)
  }
  // fim

  // update

  const handlerUpdate = (post) =>{
    update(ref(db, `/${post.date}`),{
      "input": "updated",
    })
  }

  // fim

  // deleta dados

  const handlerDelete = (post) =>{
    remove(ref(db, `/${post.date}` ))
  }

  // fim

  // adiciona dados no firebase
  const writeDataBase = () =>{
    const id = uid()
    
   
  
    if(input !== ""){
      set(ref(db, `/${date}`),{
        input,
        date,
        id
      })
      setInput("")
      
    }else{
      alert("Digite algo")
    }
    
  }
  // fim
  return (
    <div>
      <NavBar
        logo = "To-Do List next.js"
      />
      <div className={style.container}>
        <div>

          <Box>
            <div className={style.inputBox}>
      
                <textarea onChange={handleChange} value={input} name="" id="" cols="30" rows="3"></textarea>
                <button onClick={writeDataBase}>Publicar</button>
 
            </div>
          </Box>

          <div>
              {posts.map((post, id) =>
                <Box key={id}>

                  <div className={style.post}>

                    <h2>{post.input}</h2>
                    <div>
                      <button onClick={() => handlerDelete(post)}><FaRegTrashAlt/></button>
                      <button onClick={() => handlerUpdate(post)}><FaEdit/></button>
                    </div>
                    

                  </div>

                  <span>{post.date}</span>

                </Box>
              )}
          </div>

        </div>
      </div>
    </div>
  )
}
