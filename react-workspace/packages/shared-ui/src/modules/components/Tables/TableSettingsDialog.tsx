import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from '@material-tailwind/react';

import { CheckboxGroup } from '../../types';
import { CogIcon } from '@heroicons/react/24/solid';
import FormGeneratorWrapper from '../../FormGeneratorWrapper';
import { FormGroup } from 'react-reactive-form';
import React from 'react';
import { preferenceInputControls } from './TableFieldControls';
import { useSelector } from 'react-redux';

const TableSettingsDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const headers = useSelector((state) => state['tableDataSource']['headers']);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You submitted \n ${JSON.stringify(genForm.value, null, 2)}`);
        handleOpen();
    };


    let genForm: FormGroup;

    const setForm = (form) => {
        genForm = form;
        genForm.meta = {
            handleSubmit,
        }
        handleSub();
    };

    const handleSub = React.useCallback(() => {
        const subscribeToFormChanges = async () => {
            // Assuming valueChanges returns a Promise or is thenable
            if (!genForm) return;
            genForm.valueChanges.subscribe(async (value) => {
                console.log('value', value);
                // Perform any async operation here
            });
        };

        subscribeToFormChanges();
    }, []);

    // const unSubscribe = React.useCallback(() => {
    //     genForm.valueChanges.unsubscribe();
    // }, [genForm]);

    React.useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.key === 'Enter') {
                // Assuming setting genForm.value is synchronous, but if you have async operations, they can be handled here.
                genForm.value = { ...genForm.value, keyPressed: 'Enter' };
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    React.useEffect(() => {
        const mapHeadersToItems = async () => {
            // This assumes headers fetching or processing could be asynchronous
            // For demonstration, headers are used directly
            const mappedItems = headers.map((header, index) => ({ id: `${index + 1}`, value: header }));
            console.log('mappedItems', mappedItems);
            setItems(mappedItems);
        };

        mapHeadersToItems();
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
                        <Typography variant="h4" color="blue-gray">
                            Column preferences
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Customize the columns visibility.
                        </Typography>
                        <FormGeneratorWrapper onMount={setForm} fieldConfig={preferenceInputControls(items)} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleSubmit} fullWidth>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default TableSettingsDialog;
