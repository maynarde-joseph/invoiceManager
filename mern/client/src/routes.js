import { BrowserRouter, Route, Routes } from "react-router-dom";
import Website from "./pages/website";
import FAQs from "./pages/FAQs";
import Home from "./components/home";
import Query from './components/query'
import Create from "./components/create";
import FormCreate from "./components/formcreate";
import Edit from "./components/edit";
import View from "./components/view";
// import HomePage from "./components/homePage";
// import { NothingFoundBackground } from "../pages/notFound";

export default function AllRoutes() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route exact path='/home' element={<Home />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/formcreate' element={<FormCreate />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
          <Route path='/view' element={<View />}></Route>
          <Route path='/query' element={<Query />}></Route>
        </Routes>
      </BrowserRouter>
  );
}
