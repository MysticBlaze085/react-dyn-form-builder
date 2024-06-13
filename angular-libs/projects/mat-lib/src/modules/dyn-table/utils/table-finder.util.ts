import { QueryList, ViewContainerRef } from '@angular/core';

import { ArrayUtils } from './array.util';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface FindResult {
  targetIndex: number;
  targetPage: number;
}

type rowPredicate<T> = (testVal: T) => boolean;

export type rowStringFunction<T> = (testVal: T) => string | null | undefined;

export class TableFinder<T> {
  private selectionModel: SelectionModel<T>;
  private dataSource: MatTableDataSource<T>;
  private stringFunction: rowStringFunction<T>;

  constructor(inputModel: SelectionModel<T>, inputDataSource: MatTableDataSource<T>, inputStringFunction: rowStringFunction<T>) {
    this.selectionModel = inputModel;
    this.dataSource = inputDataSource;
    this.stringFunction = inputStringFunction;
  }

  public find(findText: string, searchForward: boolean): number {
    const matchesFindText: rowPredicate<T> = (testVal: T) => {
      const inputLower = findText.toLowerCase();
      const rowText = this.stringFunction(testVal);
      return rowText?.toLowerCase().includes(inputLower) ?? false;
    };

    const isSelected: rowPredicate<T> = (testVal: T) => {
      return this.selectionModel.isSelected(testVal);
    };

    const startIndex = ArrayUtils.findNextIndex(this.dataSource.data, isSelected, -1);

    return searchForward
      ? ArrayUtils.findNextIndex(this.dataSource.data, matchesFindText, startIndex)
      : ArrayUtils.findPrevIndex(this.dataSource.data, matchesFindText, startIndex);
  }
}

type pageAction = () => void;

export interface SeekResult {
  nowAction: pageAction;
  postAction?: pageAction;
}

export class TableSeeker<T> {
  private selectionModel: SelectionModel<T>;
  private dataSource: MatTableDataSource<T>;
  private paginator: MatPaginator;
  private rows: QueryList<ViewContainerRef>;

  constructor(
    selectionModel: SelectionModel<T>,
    inputDataSource: MatTableDataSource<T>,
    paginator: MatPaginator,
    rows: QueryList<ViewContainerRef>
  ) {
    this.selectionModel = selectionModel;
    this.dataSource = inputDataSource;
    this.paginator = paginator;
    this.rows = rows;
  }

  public seek(targetIndex: number): SeekResult {
    this.selectionModel.toggle(this.dataSource.data[targetIndex]);

    const targetPage = Math.floor(targetIndex / this.paginator.pageSize);

    const scrollTargetIndex = targetIndex % this.paginator.pageSize;

    const scrollToRow: pageAction = () => {
      const row = this.rows.get(scrollTargetIndex);
      row?.element.nativeElement.scrollIntoView(false, { behavior: 'instant' });
    };

    const flipToPage: pageAction = () => {
      this.paginator.pageIndex = targetPage;
      this.paginator.page.next({
        pageIndex: targetPage,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length,
      });
    };

    if (this.paginator.pageIndex !== targetPage) {
      // different page
      return {
        nowAction: flipToPage,
        postAction: scrollToRow,
      };
    } else {
      // same page
      return {
        nowAction: scrollToRow,
        postAction: undefined,
      };
    }
  }
}
