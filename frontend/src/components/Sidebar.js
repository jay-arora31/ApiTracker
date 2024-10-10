import React from 'react';
import { LayoutDashboard, Package, Users, DollarSign, Megaphone, HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/benzene-ring.png" alt="benzene-ring"/>API Dashboard</div>

      <ul className="nav-items">
        <li className="active ">
          <LayoutDashboard size={20} />
          <span >Dashboard</span>
        </li>
        <li>
          <Package size={20} />
          <span>Product</span>
          <ChevronRight size={16} className="arrow" />
        </li>
        <li>
          <Users size={20} />
          <span>Customers</span>
          <ChevronRight size={16} className="arrow" />
        </li>
        <li>
          <DollarSign size={20} />
          <span>Income</span>
          <ChevronRight size={16} className="arrow" />
        </li>
        <li>
          <Megaphone size={20} />
          <span>Promote</span>
          <ChevronRight size={16} className="arrow" />
        </li>
        <li>
          <HelpCircle size={20} />
          <span>Help</span>
          <ChevronRight size={16} className="arrow" />
        </li>
      </ul>

      <aside className="pro-upgrade">
        <h3>Upgrade to PRO to get access to all features!</h3>
        <button>Get Pro Now!</button>
      </aside>

      <div className="user-profile">
        <img src="./profile.jpg" alt="User profile" className="profile-pic" />
        <div>
          <span>Evano</span>
          <span className="role">Project Manager</span>
        </div>
        <ChevronDown size={16} />
      </div>
    </nav>
  );
};

export default Sidebar;