import { useState } from "react";
import "./App.css";
import userData from "./assets/users.json";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BsBookmark, BsBookmarkFill, BsThreeDotsVertical } from 'react-icons/bs';

function InstagramActions({
  liked,
  saved,
  onToggleLike,
  onToggleSave
}: {
  liked: boolean;
  saved: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div onClick={onToggleLike} style={{ cursor: 'pointer' }}>
        {liked ? <AiFillHeart color="red" size={35} /> : <AiOutlineHeart size={35} />}
      </div>

      <FaRegComment size={30} />
      <FiSend size={35} />

      <div style={{ flex: 1 }} />

      <div onClick={onToggleSave} style={{ cursor: 'pointer' }}>
        {saved ? <BsBookmarkFill size={35} /> : <BsBookmark size={35} />}
      </div>
    </div>
  );
}

type UserData = {
  name_id: string;
  photo: string;
};

type PostData = UserData & {
  imgPost: string;
  textPost: string;
  likes: string;
};

function Header(props: UserData) {
  return (
    <header>
      <div className="person">
      {props.photo && <img src={props.photo} alt="userPerfil" className="perfil"/>}
      <h1>{props.name_id}</h1>
      </div>
      <BsThreeDotsVertical size={30} style={{ cursor: 'pointer' }} />
    </header>
  );
}

function Post(props: PostData) {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  return (
    <section className="main-post">
      <Header name_id={props.name_id} photo={props.photo}/>
      <div className="response-interaction">
        {props.imgPost && <img src={`${props.imgPost}`} alt="post" />}
        <InstagramActions liked={like} saved={save} onToggleLike={() => setLike(!like)}
          onToggleSave={() => setSave(!save)}/>
      </div>
      <span>
        {props.likes} Likes
      </span>
      <p>
        {props.textPost ? (
          props.textPost
        ) : (
          <>
            Post without text <a href="#">#vivaMeta</a>
          </>
        )}
      </p>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      {userData.map((user, index) => (
        <Post
          key={index}
          imgPost={user.imgPost}
          textPost={user.textPost}
          name_id={user.name}
          photo={user.photo ?? "/posts/404.jpg"}
          likes={user.spanLikes}
        />
      ))}
    </div>
  );
}

export default App;
