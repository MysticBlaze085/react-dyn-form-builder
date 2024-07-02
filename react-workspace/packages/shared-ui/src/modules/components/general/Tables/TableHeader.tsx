// @ts-nocheck
import { CardHeader, Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";

import ButtonDefault from "../Button";
import React from 'react';

// Define the types for the props
interface TabItem {
    label: string;
    value: string;
}

interface ButtonItem {
    label: string;
    onClick: () => void;
    color?: string;
    icon?: React.ReactElement; // Assuming icons are passed as React elements
}

interface TableHeaderProps {
    title: string;
    subtitle: string;
    buttons: ButtonItem[];
    tabs: TabItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ title, subtitle, buttons, tabs }) => {
    return (
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-2 flex items-center justify-between gap-8">
                <div>
                    {
                        title ? (
                            <Typography variant="h5" color="blue-gray">
                                {title}
                            </Typography>
                        ) : null
                    }
                    {
                        subtitle ? (<Typography color="gray" className="mt-1 font-normal">
                            {subtitle}
                        </Typography>) : null
                    }

                </div>
                {
                    buttons && buttons.length ? (
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            {buttons.map(({ label, onClick, color, icon }, index) => (
                                <ButtonDefault key={index} size="sm" onClick={onClick} color={color} className="flex items-center gap-3">
                                    {icon} {label}
                                </ButtonDefault>
                            ))}
                        </div>
                    ) : null
                }
            </div>
            {
                tabs && tabs.length ? (
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={tabs.length > 0 ? tabs[0].value : ''} className="w-full md:w-max">
                            <TabsHeader>
                                {tabs.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                ) : null
            }
        </CardHeader>
    );
};

export default TableHeader;