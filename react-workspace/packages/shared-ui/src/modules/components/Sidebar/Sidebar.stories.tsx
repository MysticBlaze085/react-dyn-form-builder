//@ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Sidebar from './Sidebar';
import PresentationChartBarIcon from '@heroicons/react/24/solid/PresentationChartBarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import InboxIcon from '@heroicons/react/24/solid/InboxIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import PowerIcon from '@heroicons/react/24/solid/PowerIcon';
import { BrowserRouter as Router } from 'react-router-dom';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Router>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', height: '100vh', overflow: 'hidden' }}>
          <Story />
        </div>
      </Router>
    ),
  ],
  args: {
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    brandSection: {
      logoSrc: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      altText: 'Logo',
      sidebarTitle: 'Sidebar',
    },
    sections: [
      {
        title: 'Dashboard',
        icon: PresentationChartBarIcon,
        items: [
          { title: 'Analytics', route: '/dashboard/analytics' },
          { title: 'Reporting', route: '/dashboard/reporting' },
          { title: 'Projects', route: '/dashboard/projects' },
        ],
      },
      {
        title: 'E-Commerce',
        icon: ShoppingBagIcon,
        items: [
          { title: 'Orders', route: '/e-commerce/orders' },
          { title: 'Products', route: '/e-commerce/products' },
        ],
      },
    ]
  },
};

export const withHrSection: Story = {
  args: {
    brandSection: {
      logoSrc: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      altText: 'Logo',
      sidebarTitle: 'Sidebar',
    },
    sections: [
      {
        title: 'Dashboard',
        icon: PresentationChartBarIcon,
        items: [
          { title: 'Analytics', route: '/dashboard/analytics' },
          { title: 'Reporting', route: '/dashboard/reporting' },
          { title: 'Projects', route: '/dashboard/projects' },
        ],
      },
      {
        title: 'E-Commerce',
        icon: ShoppingBagIcon,
        items: [
          { title: 'Orders', route: '/e-commerce/orders' },
          { title: 'Products', route: '/e-commerce/products' },
        ],
      },
    ],
    hrSections: [
      {
        title: 'Inbox',
        icon: InboxIcon,
        route: '/inbox',
        suffix: { value: '14' },
      },
      {
        title: 'Profile',
        icon: UserCircleIcon,
        route: '/profile',
      },
      {
        title: 'Settings',
        icon: Cog6ToothIcon,
        route: '/settings',
      },
      {
        title: 'Log Out',
        icon: PowerIcon,
        route: '/logout',
      },
    ]
  },
};

export const withAlert: Story = {
  args: {
    brandSection: {
      logoSrc: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      altText: 'Logo',
      sidebarTitle: 'Sidebar',
    },
    sections: [
      {
        title: 'Dashboard',
        icon: PresentationChartBarIcon,
        items: [
          { title: 'Analytics', route: '/dashboard/analytics' },
          { title: 'Reporting', route: '/dashboard/reporting' },
          { title: 'Projects', route: '/dashboard/projects' },
        ],
      },
      {
        title: 'E-Commerce',
        icon: ShoppingBagIcon,
        items: [
          { title: 'Orders', route: '/e-commerce/orders' },
          { title: 'Products', route: '/e-commerce/products' },
        ],
      },
    ],
    hrSections: [
      {
        title: 'Inbox',
        icon: InboxIcon,
        route: '/inbox',
        suffix: { value: '14' },
      },
      {
        title: 'Profile',
        icon: UserCircleIcon,
        route: '/profile',
      },
      {
        title: 'Settings',
        icon: Cog6ToothIcon,
        route: '/settings',
      },
      {
        title: 'Log Out',
        icon: PowerIcon,
        route: '/logout',
      },
    ],
    alert: {
      title: 'New feature alert!',
      description: 'We have added a new feature to our platform. Check it out now!',
      dismissText: 'Dismiss',
      upgradeText: 'Upgrade',
    },
  },
};