import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import ProductCapture from "./pages/ProductCapture";
import AgentProcessing from "./pages/AgentProcessing";
import CampaignStrategy from "./pages/CampaignStrategy";
import DashboardOverview from "./pages/DashboardOverview";
import YouTubeManager from "./pages/YouTubeManager";
import SocialMediaHub from "./pages/SocialMediaHub";
import InstagramStudio from "./pages/InstagramStudio";
import PosterDesign from "./pages/PosterDesign";
import EmailMarketing from "./pages/EmailMarketing";
import CampaignCalendar from "./pages/CampaignCalendar";
import AnalyticsReports from "./pages/AnalyticsReports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product-capture",
    element: <ProductCapture />,
  },
  {
    path: "/agent-processing",
    element: <AgentProcessing />,
  },
  {
    path: "/campaign-strategy",
    element: <CampaignStrategy />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "youtube", element: <YouTubeManager /> },
      { path: "social-media", element: <SocialMediaHub /> },
      { path: "instagram", element: <InstagramStudio /> },
      { path: "poster-design", element: <PosterDesign /> },
      { path: "email", element: <EmailMarketing /> },
      { path: "calendar", element: <CampaignCalendar /> },
      { path: "analytics", element: <AnalyticsReports /> },
    ],
  },
]);