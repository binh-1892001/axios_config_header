import { Cookies } from "react-cookie";
import axios from "axios";

function App() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formLogin = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const resp = await axios.post("http://localhost:8080/api.myservice.com/v1/auth/sign-in", formLogin);
    console.log(resp);
    new Cookies().set("accessToken", resp.data.accessToken, { maxAge: 24 * 60 * 60 * 1000 });
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    const formAddCategory = {
      categoryName: e.target.categoryName.value,
      description: e.target.description.value,
    };

    await axios.post("http://localhost:8080/api.myservice.com/v1/admin/categories", formAddCategory, {
      headers: {
        Authorization: `Bearer ${new Cookies().get("accessToken")}`,
      },
    });
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" id="" placeholder="password" />
        <button type="submit">Sign In</button>
      </form>
      <form action="" onSubmit={handleAddCategory}>
        <input type="text" name="categoryName" placeholder="categoryName" />
        <textarea name="description" placeholder="description"></textarea>
        <button>ADD</button>
      </form>
    </>
  );
}

export default App;
