import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./modules/auth/LoginSection";
import SignUp from "./modules/auth/SignupScreen";
import Otp from "./modules/auth/Otp";
import ForgotEmail from "./modules/auth/forgotEmail";
import ResetPassword from "./modules/auth/forgotpassword";
// import { Homes } from "./user/features/home/Homes";
import Spinner from "./user/components/spinner/spinner";
import ArticleDetails from "./user/features/home/ArticlesDetails";

// User
const AppLayout = lazy(() => import("./user/components/Layout/AppLayout"));
const PostHistory = lazy(() => import("./user/features/home/postHistory"));
const Directory = lazy(() => import("./user/features/directory/Directory"));
const TopTabs = lazy(() => import("./user/features/LearningHub/TopTabPanel"));
const Mentoring = lazy(() => import("./user/features/mentoring/Mentoring"));
const Community = lazy(() => import("./user/features/community/Community"));
const SettingsTab = lazy(() =>
  import("./user/features/setting/SettingsTabpanel")
);
const Logout = lazy(() => import("./user/Logout"));
const NewsDetails = lazy(() => import("./user/features/home/NewsDetails"));
const PostDetails = lazy(() => import("./user/features/home/PostDetails"));

// Organization
const AppLayouts = lazy(() =>
  import("./organization/components/Layout/AppLayout")
);
const OrganizationHome = lazy(() =>
  import("./organization/features/home/Homes")
);
const OrganizationProfileDetails = lazy(() =>
  import("./organization/features/home/ProfileDetails")
);
const OrganizationPostHistory = lazy(() =>
  import("./organization/features/home/postHistory")
);
const OrganizationDirectory = lazy(() =>
  import("./organization/features/directory/Directory")
);
const OrganizationTopTabs = lazy(() =>
  import("./organization/features/LearningHub/TopTabPanel")
);
const OrganizationMentoring = lazy(() =>
  import("./organization/features/mentoring/Mentoring")
);
const OrganizationCommunity = lazy(() =>
  import("./organization/features/community/Community")
);
const OrganizationSettingsTab = lazy(() =>
  import("./organization/features/setting/SettingsTabpanel")
);

// Admin
const AdminLayout = lazy(() => import("./admin/components/Layout/AppLayout"));
import { AdminHome } from "./admin/features/home/Homes";
import { UsersHome } from "./admin/features/Users/users";
import { UserDetailsMain } from "./admin/features/Users/userDetails/UserDetailsMain";
import { OrganDetailsAdminMain } from "./admin/features/Users/organizationDetails/OrganDetailsMain";
import { AdminContent } from "./admin/features/Contents/TopTabPanel";
import { AdminMentor } from "./admin/features/mentoring/Mentoring";
import { AdminCommunity } from "./admin/features/community/AdminCommunity";
import { AdminBenfitsTabPanels } from "./admin/features/BeneFits/AdminBenfitsTabPanels";

import { AdminSettingsTab } from "./admin/features/setting/SettingsTabpanel";


// Routes (guards)
const ProtectedRoute = lazy(() =>
  import("./components/Layout/ProtectedRoutes")
);
const ProtectedAdminRoute = lazy(() =>
  import("./components/Layout/ProtectedAdminRoute")
);
const ProtectedOrganizationRoute = lazy(() =>
  import("./components/Layout/ProtectedOrganizationRoute")
);

const Homess = lazy(() => import("./user/features/home/Homes"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Homess />} />
            <Route path="dashboard" element={<Homess />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
            <Route path="/post/:id" element={<PostDetails />} />
            {/* <Route path="/profile/:id" element={<ProfileDetails />} />
            <Route path="/profile/:id" element={<ProfileDetails />} /> */}
            <Route path="/points-history" element={<PostHistory />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/learning-hub" element={<TopTabs />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<SettingsTab />} />

            {/* Admin */}
          </Route>

          {/* Organization */}
          <Route
            path="/organization"
            element={
              <ProtectedOrganizationRoute>
                <AppLayouts />
              </ProtectedOrganizationRoute>
            }
          >
            <Route
              path="/organization/dashboard"
              index
              element={<OrganizationHome />}
            />
            <Route
              path="/organization/profile/:id"
              element={<OrganizationProfileDetails />}
            />
            <Route
              path="/organization/post-history"
              element={<OrganizationPostHistory />}
            />
            <Route
              path="/organization/directory"
              element={<OrganizationDirectory />}
            />
            <Route
              path="/organization/learning-hub"
              element={<OrganizationTopTabs />}
            />
            <Route
              path="/organization/mentoring"
              element={<OrganizationMentoring />}
            />
            <Route
              path="/organization/community"
              element={<OrganizationCommunity />}
            />
            <Route
              path="/organization/settings"
              element={<OrganizationSettingsTab />}
            />
          </Route>

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="/admin/dashboard" index element={<AdminHome />} />
            <Route path="/admin/users" element={<UsersHome />} />
            <Route path="/admin/user-details" element={<UserDetailsMain />} />
            <Route
              path="/admin/organization-details"
              element={<OrganDetailsAdminMain />}
            />
            <Route path="/admin/contents" element={<AdminContent />} />
            <Route path="/admin/mentor-list" element={<AdminMentor />} />
            <Route path="/admin/community" element={<AdminCommunity />} />
            <Route path="/admin/benefits" element={<AdminBenfitsTabPanels />} />
            <Route path="/admin/settings" element={<AdminSettingsTab />} />

            {/* Admin */}
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          
          
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<ForgotEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
