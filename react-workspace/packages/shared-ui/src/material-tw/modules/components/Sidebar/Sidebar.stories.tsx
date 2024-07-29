//@ts-nocheck

import type { Meta, StoryObj } from '@storybook/react';

import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import InboxIcon from '@heroicons/react/24/solid/InboxIcon';
import PowerIcon from '@heroicons/react/24/solid/PowerIcon';
import PresentationChartBarIcon from '@heroicons/react/24/solid/PresentationChartBarIcon';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import Sidebar from './Sidebar';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';

const meta = {
    title: 'Material-TW/Components/Sidebar',
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
    args: {},
} as Meta<typeof Sidebar>;

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