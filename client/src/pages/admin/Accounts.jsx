import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import React from "react"

export function Accounts() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const getAccounts = async () => {
    const response = await axios.get("/api/login/users");
    return response.data;
  };

  const deleteAccount = async (id) => {
    try {
      await axios.delete(`/api/login/delete/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading, refetch } = useQuery({ queryKey: ["users"], queryFn: getAccounts });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = async () => {
    if (form.username != "" && form.password != "") {
      try {
        await axios.post("api/login/create", { form });
        setForm({
          username: "",
          password: "",
        })
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h2>Admin accouns</h2>
      <h3>Create an account</h3>
      <form action="" onSubmit={(event) => event.preventDefault()}>
        <div><label htmlFor="username">Username</label><input type="text" name="username" value={form.username} onChange={handleChange} /></div>
        <div><label htmlFor="password">Password</label><input type="password" name="password" value={form.password} onChange={handleChange} /></div>
        <input type="submit" value="Create" onClick={handleCreate} />
      </form>
      <h3>Existing accounts</h3>
      {isLoading ?
        <p>Loading ...</p>
        :
        <>
          {data.length > 0 ?
            data.map((user) => (
              <div key={user._id}>
                <p>Username: {user.username}</p>
                <p>Password: {user.password}</p>
                <button onClick={() => deleteAccount(user._id)}>delete</button>
              </div>
            ))
            :
            <p>There isn&apos;t any existing events currently</p>
          }
        </>
      }
    </div>
  )
}
