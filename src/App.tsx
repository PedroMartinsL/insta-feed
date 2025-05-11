import { useState } from "react";
import "./App.css";
import userData from "./assets/users.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

function InstagramActions({
  liked,
  saved,
  onToggleLike,
  onToggleSave,
}: {
  liked: boolean;
  saved: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div onClick={onToggleLike} className="cursor-pointer">
        {liked ? (
          <AiFillHeart color="red" size={35} />
        ) : (
          <AiOutlineHeart size={35} />
        )}
      </div>

      <FaRegComment size={30} />
      <FiSend size={35} />

      <div className="flex-1" />

      <div onClick={onToggleSave} className="cursor-pointer">
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
    <header className="flex justify-between items-center pb-[20px]">
      <div className="flex items-center gap-x-4">
        {props.photo && (
          <img src={props.photo} alt="userPerfil" className="cursor-pointer w-[60px] h-[60px] rounded-full" />
        )}
        <h1 className="font-bold">{props.name_id}</h1>
      </div>
      <BsThreeDotsVertical size={30} className="cursor-pointer" />
    </header>
  );
}

function Post(props: PostData) {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  return (
    <section className="border border-gray-400/50 p-5 pb-15 px-7.5 py-5 shadow-lg w-[35%]">
      <Header name_id={props.name_id} photo={props.photo} />
      <div className="flex flex-col justify-center pb-[20px]">
        {props.imgPost && <img src={`${props.imgPost}`} alt="post" className="pb-[20px] object-cover max-h-[30rem]"/>}
        <InstagramActions
          liked={like}
          saved={save}
          onToggleLike={() => setLike(!like)}
          onToggleSave={() => setSave(!save)}
        />
      </div>
      <span className="text-gray-500">{props.likes} Likes</span>
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
    <div className="flex flex-col items-center p-[20px] min-h-screen gap-[5px]">
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
