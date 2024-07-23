//@ts-nocheck
import BrandSection, { BrandSectionProps } from "./SidebarBrand";
import React, { Suspense, useState } from "react";
import SidebarAlert, { AlertContentProps } from "./SidebarAlert";

import { useNavigate } from "react-router-dom";

// Lazy load components from material-tailwind and heroicons
const IconButton = React.lazy(() => import("@material-tailwind/react/components/IconButton"));
const Typography = React.lazy(() => import("@material-tailwind/react/components/Typography"));
const List = React.lazy(() => import("@material-tailwind/react/components/List"));
const ListItem = React.lazy(() => import("@material-tailwind/react/components/List/ListItem"));
const ListItemPrefix = React.lazy(() =>
    import("@material-tailwind/react/components/List/ListItemPrefix")
);
const ListItemSuffix = React.lazy(() =>
    import("@material-tailwind/react/components/List/ListItemSuffix")
);
const Chip = React.lazy(() => import("@material-tailwind/react/components/Chip"));
const Accordion = React.lazy(() => import("@material-tailwind/react/components/Accordion"));
const AccordionHeader = React.lazy(() =>
    import("@material-tailwind/react/components/Accordion/AccordionHeader")
);
const AccordionBody = React.lazy(() =>
    import("@material-tailwind/react/components/Accordion/AccordionBody")
);
const Alert = React.lazy(() => import("@material-tailwind/react/components/Alert"));
const Input = React.lazy(() => import("@material-tailwind/react/components/Input"));
const Drawer = React.lazy(() => import("@material-tailwind/react/components/Drawer"));
const Card = React.lazy(() => import("@material-tailwind/react/components/Card"));

const ChevronRightIcon = React.lazy(() =>
    import("@heroicons/react/24/outline/ChevronRightIcon")
);
const ChevronDownIcon = React.lazy(() =>
    import("@heroicons/react/24/outline/ChevronDownIcon")
);
const MagnifyingGlassIcon = React.lazy(() =>
    import("@heroicons/react/24/outline/MagnifyingGlassIcon")
);
const Bars3Icon = React.lazy(() => import("@heroicons/react/24/outline/Bars3Icon"));
const XMarkIcon = React.lazy(() => import("@heroicons/react/24/outline/XMarkIcon"));


interface SidebarProps {
    brandSection: BrandSectionProps;
    sections: {
        title: string;
        icon: any;
        items: {
            title: string;
            route: string;
        }[]
    }[];
    hrSections?: {
        title: string;
        icon: any;
        suffix?: {
            value: string;
            color?: string;
        };
        route: string;
    }[];
    alert?: AlertContentProps
}

const Sidebar: React.FC<SidebarProps> = ({ sections, hrSections, alert }) => {
    const [open, setOpen] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const handleNavigation = (route) => {
        navigate(route);
        closeDrawer();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Filter sections and items based on searchQuery
    const filteredSections = sections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase())
        || section.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <IconButton variant="text" size="lg" onClick={openDrawer}>
                    {isDrawerOpen ? (
                        <XMarkIcon className="h-8 w-8 stroke-2" />
                    ) : (
                        <Bars3Icon className="h-8 w-8 stroke-2" />
                    )}
                </IconButton>
                <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                    <Card
                        color="transparent"
                        shadow={false}
                        className="h-[calc(100vh-2rem)] w-full p-4"
                    >
                         <BrandSection
                            logoSrc="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                            altText="brand"
                            sidebarTitle="Sidebar"
                        />
                        <div className="p-2">
                            <Input
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                label="Search"
                                onChange={handleSearchChange}
                                value={searchQuery}
                            />
                        </div>
                        <List>
                            {filteredSections.map((section, index) => (
                                <Accordion
                                    key={`section-${index}`}
                                    open={open === index + 1}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""
                                                }`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === index + 1}>
                                        <AccordionHeader
                                            onClick={() => handleOpen(index + 1)}
                                            className="border-b-0 p-3"
                                        >
                                            <ListItemPrefix>
                                                {React.createElement(section.icon, { className: "h-5 w-5" })}
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {section.title}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {section.items.map((item, itemIndex) => (
                                                <ListItem
                                                    key={`item-${index}-${itemIndex}`}
                                                    onClick={() => handleNavigation(item.route)}
                                                    className={searchQuery && item.title.toLowerCase().includes(searchQuery.toLowerCase()) ? "bg-blue-100" : ""}
                                                >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    {item.title}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            ))}
                            {
                                hrSections && hrSections.length > 0 && (
                                    <>
                                        <hr className="my-2 border-blue-gray-50" />
                                        {hrSections.map((item, index) => (
                                            <ListItem key={index} onClick={() => handleNavigation(item.route)}>
                                                <ListItemPrefix>
                                                    {React.createElement(item.icon, { className: "h-5 w-5" })}
                                                </ListItemPrefix>
                                                {item.title}
                                                {item.suffix && (
                                                    <ListItemSuffix>
                                                        <Chip
                                                            value={item.suffix.value}
                                                            size="sm"
                                                            variant="ghost"
                                                            color="blue-gray"
                                                            className="rounded-full"
                                                        />
                                                    </ListItemSuffix>
                                                )}
                                            </ListItem>
                                        ))}
                                    </>
                                )
                            }
                           
                        </List>
                        {
                            alert && (
                                <SidebarAlert {...alert} />
                            )
                        }
                    </Card>
                </Drawer>
            </Suspense>
        </>
    );
}

export default Sidebar;
