import { AuthService, ServiceId } from '../services';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'serviceAccess',
  standalone: true,
})
export class ServiceAccessPipe implements PipeTransform {
  authService = inject(AuthService);
  transform(value: ServiceId): boolean {
    return this.authService.serviceAccess().some((service) => service.serviceId === value);
  }
}
