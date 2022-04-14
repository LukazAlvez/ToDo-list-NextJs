import { useState } from "react";
import style from "../styles/Main.module.css";
import Box from "./components/Box";
import NavBar from "./components/NavBar";
import db from "../util/firebase";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "firebase/database";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  const date = new Date().toString();

  const [input, setInput] = useState("");
  const [posts, setPost] = useState([]);
  // update
  const [screenUp, setScreenUp] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const [datePost, setDatePost] = useState("");
  // fim update
  useEffect(() => {
    getPost();
  }, []);

  // pega os dados do firebase
  function getPost() {
    onValue(ref(db), (snapshot) => {
      setPost([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((post) => {
          setPost((oldArray) => [post, ...oldArray]);
        });
      }
    });
  }
  // fim

  // pega o que foi digitado
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  // fim

  // update
  const handlerUpdate = (post) => {
    setScreenUp(true);
    setUpdateInput(post.input);
    setDatePost(post.date);
  };
  const inputUpdate = (e) => {
    setUpdateInput(e.target.value);
  };
  const salveUpdate = () => {
    setScreenUp(false);
    update(ref(db, `/${datePost}`), {
      input: updateInput,
    });
  };
  // fim

  // deleta dados
  const handlerDelete = (post) => {
    remove(ref(db, `/${post.date}`));
  };
  // fim

  // adiciona dados no firebase
  const writeDataBase = () => {
    const id = uid();

    if (input !== "") {
      set(ref(db, `/${date}`), {
        input,
        date,
        id,
      });
      setInput("");
    } else {
      alert("Digite algo");
    }
  };
  // fim
  return (
    <div>
      {screenUp === true ? (
        <div className={style.bgUpdate}>
          <div className={style.screenUpdate}>
            <textarea
              onChange={inputUpdate}
              value={updateInput}
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
            <button onClick={salveUpdate}>Salvar</button>
            <button
              onClick={() => {
                setScreenUp(false);
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <NavBar logo="To-Do List next.js" />
      <div className={style.container}>
        <div>
          <Box>
            <div className={style.inputBox}>
              {/* text area */}
              <textarea
                onChange={handleChange}
                value={input}
                name=""
                id=""
                cols="30"
                rows="3"
              ></textarea>
              {/* button add post */}
              <button onClick={writeDataBase}>Publicar</button>
            </div>
          </Box>

          <div>
            {/* posts */}
            {posts.map((post, id) => (
              <Box key={id}>
                <div className={style.post}>
                  <h2>{post.input}</h2>
                  <div>
                    {/* button delete */}
                    <button onClick={() => handlerDelete(post)}>
                      <FaRegTrashAlt />
                    </button>
                    {/* button update */}
                    <button onClick={() => handlerUpdate(post)}>
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <span>{post.date}</span>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
