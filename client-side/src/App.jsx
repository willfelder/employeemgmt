import TableOfUsers from "./components/TableOfUsers";
import UserTasksContextProvider from "./context/UserTasksContext";

const App = () => {

  return (
    <>
    <UserTasksContextProvider>
      <TableOfUsers />
    </UserTasksContextProvider>
    </>
  )
}

export default App;
