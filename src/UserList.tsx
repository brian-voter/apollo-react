import { useQuery, gql, useMutation } from '@apollo/client';

const GET_USERS = gql`
query getUsers {
  users {
    username
    first_name
    last_name
  }
}
`;

interface GetUsersDataInterface {
  users: UserInterface[];
}

interface UserInterface {
  username: string,
  first_name: string,
  last_name: string,
}

export function UserList() {

  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("data: ", data);

  const typedData: GetUsersDataInterface = data;

  return (
    <div>
      <ul>
        {typedData.users.map(u =>
          <li key={u.username}>
            username: {u.username} {u.first_name} {u.last_name}
          </li>)}
      </ul>
    </div>
  );

}