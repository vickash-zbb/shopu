import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { CustomerManagement } from "./pages/CustomerManagement";
import { DeliveryStaffManagement } from "./pages/DeliveryStaffManagement";
import { AdminUserManagement } from "./pages/AdminUserManagement";
import { LogisticsManagement } from "./pages/LogisticsManagement";
import { ProductManagement } from "./pages/ProductManagement";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users/customers" element={<CustomerManagement />} />
          <Route path="/users/delivery" element={<DeliveryStaffManagement />} />
          <Route path="/users/admin" element={<AdminUserManagement />} />
          <Route path="/logistics" element={<LogisticsManagement />} />
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
