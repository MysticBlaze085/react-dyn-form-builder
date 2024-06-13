// /* eslint-disable @typescript-eslint/no-empty-function */

// import { MockCertFile, MockHttpClient, MockToastMessageService } from 'src/testing/jasmine.mock';
// import { of, throwError } from 'rxjs';

// import { HttpClient } from '@angular/common/http';
// import { MockStore } from '@ngrx/store/testing';
// import { TlsFileUploadService } from './tls-file-upload.service';
// import { ToastMessageService } from '@core/services';

// fdescribe('TlsFileUploadService', () => {
//   let service: TlsFileUploadService;
//   const http: HttpClient = new MockHttpClient() as any;
//   const toast: ToastMessageService = new MockToastMessageService() as any;
//   let store: MockStore;

//   beforeEach(() => {
//     store = { select: () => of() } as any;
//     service = new TlsFileUploadService(http, toast, store);
//   });

//   describe('upload', () => {
//     it('should call upload happy path', () => {
//       spyOn(http, 'post').and.returnValue(of(MockCertFile));
//       service.upload(MockCertFile).subscribe({
//         next: (results) => {
//           expect(results).toEqual(results);
//         },
//       });
//       service.fileList$.subscribe({
//         next: (result) => expect(result).toEqual([MockCertFile]),
//         complete: () => {},
//       });
//       expect(http.post).toHaveBeenCalled();

//       spyOn(http, 'delete').and.callThrough();
//       service.deleteFile('1234').subscribe({
//         next: (result) => expect(result).toBeUndefined(),
//         complete: () => {},
//       });
//       service.fileList$.subscribe({
//         next: (result) => expect(result.length).toBe(1),
//         complete: () => {},
//       });
//       expect(http.delete).toHaveBeenCalled();
//     });
//     it('should call upload unhappy path', () => {
//       spyOn(http, 'post').and.callFake(() => throwError(() => 'Error'));
//       spyOn(toast, 'openToastErrorHandler');
//       service.upload(MockCertFile).subscribe({
//         error: (err) => {
//           expect(toast.openToastErrorHandler).toHaveBeenCalled();
//           expect(err).toEqual('Error');
//         },
//       });
//       expect(http.post).toHaveBeenCalled();
//     });
//   });

//   describe('getFiles', () => {
//     it('should call getFiles happy path', () => {
//       spyOn(http, 'get').and.returnValue(of([MockCertFile]));
//       service.getFiles().subscribe({
//         next: (result) => expect(result).toEqual([MockCertFile]),
//         complete: () => {},
//       });
//       service.fileList$.subscribe({
//         next: (result) => expect(result).toEqual([MockCertFile]),
//         complete: () => {},
//       });
//       expect(http.get).toHaveBeenCalled();
//     });
//     it('should call getFiles unhappy path', () => {
//       spyOn(http, 'get').and.callFake(() => throwError(() => 'Error'));
//       spyOn(toast, 'openToastErrorHandler');
//       service.getFiles().subscribe({
//         error: (err) => {
//           expect(toast.openToastErrorHandler).toHaveBeenCalled();
//           expect(err).toEqual('Error');
//         },
//         complete: () => {},
//       });
//     });
//   });

//   describe('getSelectedFile', () => {
//     it('should get selected file', () => {
//       expect(service.getSelectedFile('')).toBeUndefined();
//     });
//   });

//   describe('updateFile', () => {
//     it('should call updateFile happy path', () => {
//       spyOn(http, 'put').and.returnValue(of(MockCertFile));
//       service.updateFile('123', MockCertFile).subscribe({
//         next: (result) => expect(result).toEqual(MockCertFile),
//         complete: () => {},
//       });
//       expect(http.put).toHaveBeenCalled();
//     });
//   });
// });
