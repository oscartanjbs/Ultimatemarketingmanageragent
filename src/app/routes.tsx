import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import ProductCapture from "./pages/ProductCapture";
import AgentProcessing from "./pages/AgentProcessing";
import CampaignStrategy from "./pages/CampaignStrategy";
import PublishingFlow from "./pages/PublishingFlow";
import Pricing from "./pages/Pricing";
import CookiesPolicy from "./pages/CookiesPolicy";
import ComingSoon from "./pages/ComingSoon";
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
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/cookies-policy",
    element: <CookiesPolicy />,
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
    path: "/publishing-flow",
    element: <PublishingFlow />,
  },
  // Footer Product Links
  {
    path: "/how-it-works",
    element: <ComingSoon title="How It Works" description="Learn how Agentcy's AI agents work together to transform your marketing strategy." />,
  },
  {
    path: "/features",
    element: <ComingSoon title="Features" description="Explore the powerful features that make Agentcy the ultimate AI marketing platform." />,
  },
  {
    path: "/integrations",
    element: <ComingSoon title="Integrations" description="Connect Agentcy with your favorite marketing tools and platforms." />,
  },
  // Footer Company Links
  {
    path: "/about",
    element: <ComingSoon title="About Us" description="Discover the team and vision behind Agentcy's AI-powered marketing revolution." />,
  },
  {
    path: "/careers",
    element: <ComingSoon title="Careers" description="Join our team and help shape the future of AI-driven marketing." />,
  },
  {
    path: "/blog",
    element: <ComingSoon title="Blog" description="Stay updated with the latest insights, tips, and news from the Agentcy team." />,
  },
  {
    path: "/press",
    element: <ComingSoon title="Press" description="Media resources, press releases, and news about Agentcy." />,
  },
  // Footer Support Links
  {
    path: "/faq",
    element: <ComingSoon title="FAQ" description="Find answers to frequently asked questions about Agentcy and our AI agents." />,
  },
  {
    path: "/contact",
    element: <ComingSoon title="Contact Us" description="Get in touch with our team. We're here to help you succeed." />,
  },
  {
    path: "/privacy-policy",
    element: <ComingSoon title="Privacy Policy" description="Learn how we protect and handle your data at Agentcy." />,
  },
  {
    path: "/terms",
    element: <ComingSoon title="Terms of Service" description="Read our terms and conditions for using the Agentcy platform." />,
  },
  {
    path: "/imprint",
    element: <ComingSoon title="Imprint" description="Legal information and company details." />,
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