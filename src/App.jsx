import { lazy, Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './modules/auth/LoginSection';
 import SignUp from './modules/auth/SignupScreen';
import Otp from './modules/auth/Otp';
import ForgotEmail from './modules/auth/forgotEmail';
import ResetPassword from './modules/auth/forgotpassword';
import { Homes } from './user/features/home/Homes';
import AppLayout from './user/components/Layout/AppLayout';
import Spinner from './user/components/spinner/spinner';
import ProfileDetails from './user/features/home/ProfileDetails';
import PostHistory from './user/features/home/postHistory';
import Directory from './user/features/directory/Directory';
 import { TopTabs } from './user/features/LearningHub/TopTabPanel';
import { Mentoring } from './user/features/mentoring/Mentoring';
import { Community } from './user/features/community/Community';
import { SettingsTab } from './user/features/setting/SettingsTabpanel';
import AppLayouts from './organization/components/Layout/AppLayout';
import { OrganizationHome } from './organization/features/home/Homes';
import OrganizationProfileDetails from './organization/features/home/ProfileDetails';
import OrganizationPostHistory from './organization/features/home/postHistory';
import OrganizationDirectory from './organization/features/directory/Directory';
import { OrganizationTopTabs } from './organization/features/LearningHub/TopTabPanel';
import { OrganizationMentoring } from './organization/features/mentoring/Mentoring';
import { OrganizationCommunity } from './organization/features/community/Community';
import { OrganizationSettingsTab } from './organization/features/setting/SettingsTabpanel';
import AdminLayout from './admin/components/Layout/AppLayout';
import { AdminHome } from './admin/features/home/Homes';
import ProtectedRoute from './components/Layout/ProtectedRoutes';
import { UsersHome } from './admin/features/Users/users';
import { UserDetailsMain } from './admin/features/Users/userDetails/UserDetailsMain';
import { OrganDetailsAdminMain } from './admin/features/Users/organizationDetails/OrganDetailsMain';
import { AdminContent } from './admin/features/Contents/TopTabPanel';
import { AdminMentor } from './admin/features/mentoring/Mentoring';
import { AdminCommunity } from './admin/features/community/AdminCommunity';
import { AdminBenfitsTabPanels } from './admin/features/BeneFits/AdminBenfitsTabPanels';
import { AdminSettingsTab } from './admin/features/setting/SettingsTabpanel';
// import AdminProfileDetails from './admin/features/home/ProfileDetails';
// import AdminPostHistory from './admin/features/home/postHistory';
 
function App() {
 const Home = lazy(() => import("./user/features/home/Homes"));
 
  return (
    <BrowserRouter>
        <Suspense fallback={<Spinner />}>
         
          <Routes>
            <Route
            path='/'
              element={
                 <ProtectedRoute>
                  <AppLayout />
                 </ProtectedRoute>
              } 
            >
              <Route path="/dashboard" index element={<Homes />} />
              <Route path="/" index element={<Homes />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="/post-history" element={<PostHistory />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/learning-hub" element={<TopTabs />} />
              <Route path="/mentoring" element={<Mentoring />} />
              <Route path="/community" element={<Community />} />
              <Route path="/settings" element={<SettingsTab />} />

            {/* Admin */}
            </Route>

            {/* Organization */}
            <Route
            path='/organization'
              element={
                // <ProtectedRoute>
                  <AppLayouts />
                // </ProtectedRoute>
              } 
            >
              <Route path="/organization/dashboard" index element={<OrganizationHome />} />
              <Route path="/organization/profile/:id" element={<OrganizationProfileDetails />} />
              <Route path="/organization/post-history" element={<OrganizationPostHistory />} />
              <Route path="/organization/directory" element={<OrganizationDirectory />} />
              <Route path="/organization/learning-hub" element={<OrganizationTopTabs />} />
              <Route path="/organization/mentoring" element={<OrganizationMentoring />} />
              <Route path="/organization/community" element={<OrganizationCommunity />} />
              <Route path="/organization/settings" element={<OrganizationSettingsTab />} />

             </Route>

            {/* Admin */}
            <Route
            path='/admin'
              element={
                // <ProtectedRoute>
                  <AdminLayout />
                // </ProtectedRoute>
              } 
            >
              <Route path="/admin/dashboard" index element={<AdminHome />} />
              <Route path="/admin/users" element={<UsersHome />} />
              <Route path="/admin/user-details" element={<UserDetailsMain />} />
              <Route path="/admin/organization-details" element={<OrganDetailsAdminMain />} />
              <Route path="/admin/contents" element={<AdminContent />} />
              <Route path="/admin/mentor-list" element={<AdminMentor />} />
              <Route path="/admin/community" element={<AdminCommunity />} />
               <Route path="/admin/benefits" element={<AdminBenfitsTabPanels />} />
              <Route path="/admin/settings" element={<AdminSettingsTab />} />

            {/* Admin */}
            </Route>

            {/* Public routes */}
             <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forgot-password" element={<ForgotEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
