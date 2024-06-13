import { ITextInputModel } from './text-input.model';

export interface FileUploadModel extends ITextInputModel {
  buttonText?: string;
}

export type FileModel<TResponse = string> = TResponse extends undefined
  ? {
      id: string;
      name: string;
      description?: string;
      data: TResponse;
    }
  : {
      id: string | null;
      file?: File;
      data?: string;
      name: string;
      description?: string;
    };
