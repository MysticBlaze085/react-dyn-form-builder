// @ts-nocheck
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { filter, setPreferences } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

import { CogIcon } from '@heroicons/react/24/solid';
import { FormBuilder } from 'react-reactive-form';
import FormGeneratorWrapper from '../../FormGeneratorWrapper';
import React from 'react';
import { tableFilterInputControls } from './TableFieldControls';

const TableSettingsDialog = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const selectedItems = useSelector((state) => state['tableDataSource']['preferences']['visibleColumns']);
    const initHeaders = useSelector((state) => state['tableDataSource']['initialHeaders']);
    const filterColumn = useSelector((state) => state['tableDataSource']['filterDataSource']['column']);

    let form = FormBuilder.group({
        value: [],
        column: [filterColumn],
    });

    const handleOpen = () => setOpen(!open);

    const handleCheckboxChange = async (itemId, isChecked) => {
        let newItems;
        if (isChecked) {
            newItems = [...selectedItems, itemId]; // Assuming selectedItems is the current state
        } else {
            newItems = selectedItems.filter((item) => item !== itemId);
        }
        const action = setPreferences(newItems);
        dispatch(action);
    };

    const setForm = (formValue) => {
        form = formValue;
        form.get('column').setValue(filterColumn);
        handleSub();
    };

    const handleSub = () => {
        form.valueChanges.subscribe((value) => {
            const action = filter(value);
            dispatch(action);
        });
    };

    const handleEventTriggers = () => {
        const eventCatcher = (event) => {
            // Check the type of event and act accordingly
            if (event.type === 'click') {
                form.value = { ...form.value, clicked: true };
            } else if (event.type === 'keydown' && event.key === 'Enter') {
                form.value = { ...form.value, keyPressed: 'Enter' };
            }
        };
        // Add the eventCatcher for both click and keydown events
        document.addEventListener('click', eventCatcher);
        document.addEventListener('keydown', eventCatcher);
        return () => {
            // Remove the eventCatcher for both events when the component unmounts or the effect cleanup runs
            document.removeEventListener('click', eventCatcher);
            document.removeEventListener('keydown', eventCatcher);
        };
    }

    React.useEffect(() => {
        const mapHeadersToItems = async () => {
            const action = setPreferences(initHeaders);
            dispatch(action);
        };

        mapHeadersToItems();
        handleEventTriggers();
    }, []);

    return (
        <>
            <CogIcon onClick={handleOpen} strokeWidth={2} className="h-4 w-4" />
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >

                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray" className='flex flex-row'>
                            Column preferences
                            <span className='flex-grow'></span>
                            <IconButton
                                color="blue-gray"
                                size="sm"
                                variant="text"
                                onClick={handleOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </IconButton>
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Customize the columns visibility.
                        </Typography>
                        {
                            initHeaders.map((item) => (
                                item ? <Checkbox key={item} label={item} defaultChecked={selectedItems.includes(item)} onChange={(e) => handleCheckboxChange(item, e.target.checked)} /> : null
                            ))
                        }
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Select the column to filter a search value
                        </Typography>
                        <FormGeneratorWrapper onMount={setForm} fieldConfig={tableFilterInputControls(selectedItems)} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="filled" color='blue' onClick={handleOpen} fullWidth>
                            Close Preferences
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default TableSettingsDialog;
