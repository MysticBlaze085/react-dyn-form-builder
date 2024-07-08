// @ts-nocheck

import ButtonDefault from "../Button";
import FormGeneratorWrapper from "../../FormGeneratorWrapper";
import { FormGroup } from "react-reactive-form";
import React from 'react';
import TableSettingsDialog from "./TableSettingsDialog";
import { filter } from "../../../store";
import { tableFilterInputConfig } from "./TableFieldControls";
import { useDispatch } from 'react-redux';

const CardHeader = React.lazy(() => import('@material-tailwind/react/components/Card/CardHeader'));
const Tab = React.lazy(() => import('@material-tailwind/react/components/Tabs/Tab'));
const Tabs = React.lazy(() => import('@material-tailwind/react/components/Tabs'));
const TabsHeader = React.lazy(() => import('@material-tailwind/react/components/Tabs/TabsHeader'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));

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
    const dispatch = useDispatch();
    let genForm: FormGroup;

    const setForm = (form) => {
        genForm = form;
        handleSub();
    };

    const handleSub = () => {
        genForm.valueChanges.subscribe((value) => {
            const action = filter(value);
            dispatch(action);
        });
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') genForm.value = { ...genForm.value, keyPressed: 'Enter' };
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <CardHeader floated={false} shadow={false} className="rounded-none overflow-visible">
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
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {
                        buttons && buttons.length > 0 && buttons.map(({ label, onClick, color, icon }, index) => (
                            <ButtonDefault key={index} size="sm" onClick={onClick} color={color} className="flex items-center gap-3">
                                {icon} {label}
                            </ButtonDefault>
                        ))
                    }
                    <div className="flex items-center gap-3 cursor-pointer">
                        <TableSettingsDialog />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {
                    tabs && tabs.length ? (
                        <Tabs value={tabs.length > 0 ? tabs[0].value : ''} className="w-full md:w-max">
                            <TabsHeader>
                                {tabs.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                    ) : null
                }
            </div>
            <div className="flex flex-row gap-2 w-full flex-wrap z-[20000]">
                <FormGeneratorWrapper className="flex flex-row flex-nowrap" onMount={setForm} fieldConfig={tableFilterInputConfig} />
            </div>

        </CardHeader>
    );
};

export default TableHeader;

