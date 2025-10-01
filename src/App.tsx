import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignUp from "./pages/AUTH/SignUp"
import SignIn from "./pages/AUTH/SignIn"
import Navbar from "./components/Navbar/Navbar"
import PrivatePage from "./pages/PrivatePage"
import CreateListing from "./pages/CreateListing"
import UpdateListing from './pages/updateListing'
import ListingPage from "./pages/ListingPage"
import Search from "./pages/Search"
import { ToastContainer } from "react-toastify"
function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivatePage />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing-update/:id" element={<UpdateListing />} />

          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
