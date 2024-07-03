import ButtonDefault from "../Button";
import FieldRenderer from "../../FieldRenderer";
import { Validators } from 'react-reactive-form';

export const tableFilterInputConfig = {
    controls: {
        column: {
            render: FieldRenderer('Select'),
            meta: {
                label: 'Column',
                items: [
                    { value: 'name', label: 'Name' },
                    { value: 'job', label: 'Job' },
                    { value: 'date', label: 'Date' },
                ],
            },
        },
        value: {
            render: FieldRenderer('Text'),
            meta: {
                label: 'Search',
                required: false
            },
            // options: {
            //     validators: Validators.required,
            // },
        },
        // $field_0: {
        //     isStatic: false,
        //     render: ({ status, value, meta: { handleSubmit, handleEditMode, handleCancelMode } }) => {
        //         return (
        //             <div>
        //                 <ButtonDefault
        //                     style={{ marginRight: '5px'}}
        //                     color="blue"
        //                     variant="contained"
        //                     onClick={handleSubmit}
        //                 >
        //                     Search
        //                 </ButtonDefault>
        //             </div>
        //         );
        //     },
        // },
    },
};