import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route 
            path="/users/customers" 
            element={
              <PlaceholderPage 
                title="Customer Management" 
                description="Manage customer profiles, view order history, and handle account management."
              />
            } 
          />
          <Route 
            path="/users/delivery" 
            element={
              <PlaceholderPage 
                title="Delivery Staff Management" 
                description="Manage delivery personnel profiles, assignments, and performance metrics."
              />
            } 
          />
          <Route 
            path="/users/admin" 
            element={
              <PlaceholderPage 
                title="Admin User Management" 
                description="Manage admin roles, permissions, and system access controls."
              />
            } 
          />
          <Route 
            path="/logistics" 
            element={
              <PlaceholderPage 
                title="Logistics & Dispatch" 
                description="Manage order assignments, delivery tracking, and route optimization."
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <PlaceholderPage 
                title="Product Management" 
                description="Manage inventory, add new products, and update pricing information."
              />
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <PlaceholderPage 
                title="Notifications Management" 
                description="Configure and send SMS, email, and push notifications to users and staff."
              />
            } 
          />
          <Route 
            path="/content" 
            element={
              <PlaceholderPage 
                title="Content Management" 
                description="Manage website content, pages, and promotional materials."
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PlaceholderPage 
                title="Settings & Configuration" 
                description="Configure platform settings, payment gateways, and API integrations."
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
