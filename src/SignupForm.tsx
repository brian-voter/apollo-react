import { gql, useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';

const ADD_USER = gql`
mutation addUser($username: ID!, $first_name: String!, $last_name: String!) {
  createUser(username: $username, first_name: $first_name, last_name: $last_name){
    username
  }
}
`;

interface SignupFormDataInterface {
  username: string,
  firstName: string,
  lastName: string;
}

const initialFormState: SignupFormDataInterface = {
  username: "",
  firstName: "",
  lastName: ""
};

export function SignupForm() {

  const [addUserMutation, { data, loading, error }] = useMutation(ADD_USER);
  const [formData, setFormData] = useState(initialFormState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addUserMutation({
      variables: {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }
    });
    setFormData(initialFormState);
  }

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  }

  console.log("data", data);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error: {error.message}</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleFormChange} type="text" name="username" placeholder='Username'></input>
        <input onChange={handleFormChange} type="text" name="firstName" placeholder='First Name'></input>
        <input onChange={handleFormChange} type="text" name="lastName" placeholder='Last Name'></input>
        <button type="submit">Add New User</button>
      </form>
      <div>
        {data &&
          <div>
            New user: {data.createUser.username}
          </div>
        }
      </div>
    </div>
  );

}