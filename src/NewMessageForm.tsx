import { gql, useMutation } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';

// graphql query
const ADD_MESSAGE = gql `
mutation addMessage($username:ID!, $body:String!) {
    createMessage(body: $body, username: $username){
      user {
        username
      }
    }
  }
`

interface NewMessageFormDataInterface {
    body: string,
    username: string
}


const initialFormState: NewMessageFormDataInterface = {
    body: "",
    username: "",
  };

function NewMessageForm() {
    const [addMessageMutation, { data, loading, error }] = useMutation(ADD_MESSAGE);
    const [formData, setFormData] = useState(initialFormState);

    function handleSubmit(e: FormEvent ) {
        e.preventDefault();
        addMessageMutation(
            {
                variables: {
                  username: formData.username,
                  body: formData.body }
              }
        )
setFormData(initialFormState)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement> ) {
        const { name, value } = e.target;
        setFormData(oldData => ({ ...oldData, [name]: value }));
    }

    if (loading) {
        return <div>loading...</div>
      }

      if (error) {
        return <div>error: {error.message}</div>
      }

console.log("data= ", data)
return (
    <div>
<form onSubmit={handleSubmit}>
    <label htmlFor="username">Username</label>
<input type="text" name="username" id="username" onChange={handleChange}></input>
<label htmlFor="body">Message Body</label>
<input type="text" name="body" id="body" onChange={handleChange}></input>
<button type="submit">Create Message</button>
</form>
<div>
        {data &&
          <div>
            New Message: {data.createMessage.user.username}
          </div>
        }
      </div>

      </div>

)


}

export default NewMessageForm