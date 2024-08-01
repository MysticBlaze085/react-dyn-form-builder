import { type Meta, type StoryObj } from '@storybook/angular';

import { TableComponent } from './table.component';
// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'WIP / TableComponent',
  decorators: [
    // moduleMetadata({
    //   imports: [RouterModule.forRoot([])],
    // }),
  ],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<TableComponent>;

export const Primary: Story = {
  args: {
    height: 'h-auto',
    title: 'Default Title',
    caption: 'Default Caption',
    buttonText: 'Default Button Text',
    buttonLink: [],
    headers: ['column1', 'column2', 'column3', 'column4', 'column5'],
    data: [
      {
        column1: 'row1 column1',
        column2: 'row1 column2',
        column3: 'row1 column3',
        column4: ['row1 column4', 'row1 column4', 'row1 column4'],
        column5: 'row1 column5',
      },
      {
        column1: 'row2 column1',
        column2: 'row2 column2',
        column3: 'row2 column3',
        column4: ['row2 column4', 'row2 column4', 'row2 column4'],
        column5: 'row2 column5',
      },
      {
        column1: 'row3 column1',
        column2: 'row3 column2',
        column3: 'row3 column3',
        column4: 'row3 column4',
        column5: 'row3 column5',
      },
      {
        column1: 'row4 column1',
        column2: 'row4 column2',
        column3: 'row4 column3',
        column4: 'row4 column4',
        column5: 'row4 column5',
      },
      {
        column1: 'row5 column1',
        column2: 'row5 column2',
        column3: 'row5 column3',
        column4: 'row5 column4',
        column5: 'row5 column5',
      },
      {
        column1: 'row6 column1',
        column2: 'row6 column2',
        column3: 'row6 column3',
        column4: 'row6 column4',
        column5: 'row6 column5',
      },
    ],
  },
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/stepper works!/gi)).toBeTruthy();
//   },
// };
