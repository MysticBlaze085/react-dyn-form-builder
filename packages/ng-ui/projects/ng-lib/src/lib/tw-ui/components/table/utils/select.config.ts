import { FieldBuilder } from '../../../../tw-form-ui/models';

export const field = (params: { id: string; value: any; props: { checked: false } }) =>
    FieldBuilder.createField('checkbox', params.id, params.value, '', '', {
        required: true,
    });
