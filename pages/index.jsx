import { useState } from "react"
import style from "../styles/Main.module.css"
import Box from "./components/Box"
import NavBar from "./components/NavBar"

export default function Home(){

  const [input, setInput] = useState("")
  const [posts, setPost] = useState([])

  const handleChange = (e) =>{
    setInput(e.target.value)

  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(input !== ""){
      setPost([
      input,
      ...posts
      ])
    }else{
      alert("Digite algo!")
    }
    
  }

  const handleDelete = (post) =>{
    const updatePost = posts.filter(postItem => posts.indexOf(postItem) != posts.indexOf(post))
    setPost(updatePost)
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
              <form onSubmit={handleSubmit} >
                <textarea onChange={handleChange} name="" id="" cols="30" rows="3"></textarea>
                <input className={style.btn} type="submit"value="Publicar"/>
              </form>
            </div>
          </Box>
            <div>
              {
                posts.length >= 1 ? posts.map((post, idx) => {
                  return (
                    <Box>
                      <div style={{padding: "10px"}} key={idx}>{post}<button onClick={(e) =>{
                        e.preventDefault()
                        handleDelete(post)
                      }}>Deletar</button></div>
                    </Box>
                  ) 
                }) : ""
              }
            </div>
        </div>
      </div>
    </div>
  )
}
