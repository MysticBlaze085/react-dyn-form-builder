import { Meta, StoryObj } from '@storybook/angular';

import { SidebarComponent } from '../sidebar.component';

const meta: Meta<SidebarComponent> = {
    component: SidebarComponent,
    title: '(TW) Angular UI / Components / Sidebar',
    decorators: [
        // Add any decorators you need (e.g., withModules)
    ],
    parameters: {
        // Add any global parameters here
    },
    argTypes: {
        // Add argTypes as needed
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SidebarComponent>;

export const WithActiveLink: Story = (args: any) => ({
    component: SidebarComponent,
    props: {
        ...args,
        title: 'Sidebar',
        navigation: [
            { link: 'home', icon: 'home', text: 'Home' },
            { link: 'about', icon: 'info', text: 'About' },
            { link: 'contact', icon: 'mail', text: 'Contact' },
        ],
    },
});
WithActiveLink.parameters = {
    angularRouter: { active: '/location/1' },
};

export const Primary: Story = (args: any) => ({
    component: SidebarComponent,
    props: {
        ...args,
        title: 'Sidebar',
        navigation: [
            { link: 'home', icon: 'home', text: 'Home' },
            { link: 'about', icon: 'info', text: 'About' },
            { link: 'contact', icon: 'mail', text: 'Contact' },
        ],
    },
});
Primary.args = {
    title: 'Sidebar',
    navigation: [
        { link: 'home', icon: 'home', text: 'Home' },
        { link: 'about', icon: 'info', text: 'About' },
        { link: 'contact', icon: 'mail', text: 'Contact' },
    ],
};
