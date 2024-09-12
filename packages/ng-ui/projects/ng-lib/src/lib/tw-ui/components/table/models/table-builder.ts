import { RowData, TableProps } from '../../../../tw-form-ui/models';

export class TableBuilder {
  private props: TableProps = {};

  setIsWrapped(isWrapped: boolean): TableBuilder {
    this.props.isWrapped = isWrapped;
    return this;
  }

  setData(data: RowData[]): TableBuilder {
    this.props.data = data;
    return this;
  }

  setColumns(columns: string[]): TableBuilder {
    this.props.columns = columns;
    return this;
  }

  setIsDraggable(isDraggable: boolean): TableBuilder {
    this.props.isDraggable = isDraggable;
    return this;
  }

  setIsSelectable(isSelectable: boolean): TableBuilder {
    this.props.isSelectable = isSelectable;
    return this;
  }

  setIsSortable(isSortable: boolean): TableBuilder {
    this.props.isSortable = isSortable;
    return this;
  }

  setIsSearchable(isSearchable: boolean): TableBuilder {
    this.props.isSearchable = isSearchable;
    return this;
  }

  setIsActionButton(isActionButton: boolean): TableBuilder {
    this.props.isActionButton = isActionButton;
    return this;
  }

  setIsMultiSelectField(isMultiSelectField: boolean): TableBuilder {
    this.props.isMultiSelectField = isMultiSelectField;
    return this;
  }

  setGroupBy(groupBy: string): TableBuilder {
    this.props.groupBy = groupBy;
    return this;
  }

  setActionColName(actionColName: string): TableBuilder {
    this.props.actionColName = actionColName;
    return this;
  }

  setActionButtons(
    actionButtons: {
      icon?: string;
      label: string;
      color: 'primary' | 'secondary' | 'success' | 'warn' | 'danger';
      onClick: (rowData: any) => void;
    }[]
  ): TableBuilder {
    this.props.actionButtons = actionButtons;
    return this;
  }

  setTableHeader(tableHeader: {
    title: string;
    subtitle: string;
    isSearchable: boolean;
    isPreference?: boolean;
    buttons?: any[];
  }): TableBuilder {
    this.props.tableHeader = tableHeader;
    return this;
  }

  build(): TableProps {
    return this.props;
  }
}
