import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/screens/login';
import Home from './components/screens/home';
import Register from './components/screens/register';
import FoodList from './components/screens/foodList';
import FoodDesc from './components/screens/foodDescription';
import Admin from './components/screens/admin';
import FoodOrder from './components/screens/foodorder';
import Recipe from './components/screens/recipe';
import Feedback from './components/screens/feedback';
import Report from './components/screens/report';
import MealPlan from './components/screens/mealplan';
import UserProfile from './components/screens/profile';
import DailyMealOverview from './components/screens/customhome';
import AdminLogin from './components/screens/adminlogin';
import AdminHomePage from './components/admin/home/adminhome';

// Admin pages
import Users from './components/admin/userlist/Userlist';
import ManageRecipe from './components/admin/managerecipe/managerecipe';
import MealPlans from './components/admin/mealplans/mealplans';
import Food1 from './components/admin/foodorder/foodorder';
import Feedbacks from './components/admin/feedback/feedback';
import Reports from './components/admin/reports/reports';
import NewRecipes from './components/admin/newrecipe/newrecipes';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  // Function to get the appropriate home page based on userType
  const getHomePage = () => {
    if (isAuthenticated) {
      return userType === 'Admin' ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes for users who are not logged in */}
          <Route path="/login" element={isAuthenticated ? getHomePage() : <Login />} />
          <Route path="/register" element={isAuthenticated ? getHomePage() : <Register />} />

          {/* Routes for regular users */}
          <Route path="/" element={isAuthenticated && userType === 'User' ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/foodList" element={isAuthenticated && userType === 'User' ? <FoodList /> : <Navigate to="/login" replace />} />
          <Route path="/foodDescription/:id" element={isAuthenticated && userType === 'User' ? <FoodDesc /> : <Navigate to="/login" replace />} />
          <Route path="/foodorder" element={isAuthenticated && userType === 'User' ? <FoodOrder /> : <Navigate to="/login" replace />} />
          <Route path="/recipe" element={isAuthenticated && userType === 'User' ? <Recipe /> : <Navigate to="/login" replace />} />
          <Route path="/feedback" element={isAuthenticated && userType === 'User' ? <Feedback /> : <Navigate to="/login" replace />} />
          <Route path="/report" element={isAuthenticated && userType === 'User' ? <Report /> : <Navigate to="/login" replace />} />
          <Route path="/mealplan" element={isAuthenticated && userType === 'User' ? <MealPlan /> : <Navigate to="/login" replace />} />
          <Route path="/userprofile" element={isAuthenticated && userType === 'User' ? <UserProfile /> : <Navigate to="/login" replace />} />
          <Route path="/daily" element={isAuthenticated && userType === 'User' ? <DailyMealOverview /> : <Navigate to="/login" replace />} />

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={isAuthenticated && userType === 'Admin' ? <Admin /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/adminhome" element={isAuthenticated && userType === 'Admin' ? <AdminHomePage /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/users" element={isAuthenticated && userType === 'Admin' ? <Users /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/managerecipe" element={isAuthenticated && userType === 'Admin' ? <ManageRecipe /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/mealplans" element={isAuthenticated && userType === 'Admin' ? <MealPlans /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/foodorder" element={isAuthenticated && userType === 'Admin' ? <Food1 /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/feedback" element={isAuthenticated && userType === 'Admin' ? <Feedbacks /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/reports" element={isAuthenticated && userType === 'Admin' ? <Reports /> : <Navigate to="/adminlogin" replace />} />
          <Route path="/admin/newrecipes" element={isAuthenticated && userType === 'Admin' ? <NewRecipes /> : <Navigate to="/adminlogin" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
