import { gql, useLazyQuery } from '@apollo/client';
import { ChangeEvent, FormEvent, useState } from 'react';

const GET_MESSAGES = gql `
query getMessages($username: ID!) {
    user(username: $username) {
      messages {
        id
        body
      }
    }
  }
  `

interface GetMessagesDataInterface {
    user: {
    messages: {
      id: string
      body: string
       }[]
  }
}

function GetMessages() {
    const initialFormState = {username: ""}
    const [formData, setFormData] = useState(initialFormState);
    const [getMessages, { data, loading, error }] = useLazyQuery(GET_MESSAGES );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    function handleSubmit(e: FormEvent ) {
        e.preventDefault();
        getMessages({variables: { username: formData.username }})
        setFormData(initialFormState)
    }

    const typedData: GetMessagesDataInterface = data;

    function handleChange(e: ChangeEvent<HTMLInputElement> ) {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
}

return (
    <div>
   <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username</label>
<input type="text" name="username" id="username" onChange={handleChange}></input>
<button type="submit">Get Messages</button>
</form>
{(data && data.user=== null) && <p>There's no messages to show</p>}
{(data && data.user !== null) && <div>{typedData.user.messages.map(m => <li key={m.id}>{m.body}</li>)}</div>}
    </div>
)

}
export default GetMessages