import { HttpClient } from '@angular/common/http';

export abstract class BaseService<T> {
  protected abstract url: string;
  protected MAIN_URL = 'http://localhost:3000';

  constructor(protected http: HttpClient) {
    this.http = http;
  }

  create(dto: Partial<T>) {
    return this.http.post<T>(`${this.MAIN_URL}/${this.url}`, dto);
  }

  update(id: string, dto: Partial<T>) {
    return this.http.put<T>(`${this.MAIN_URL}/${this.url}/${id}`, dto);
  }

  getAll() {
    return this.http.get<T[]>(`${this.MAIN_URL}/${this.url}`);
  }

  getById(id: string) {
    return this.http.get<T>(`${this.MAIN_URL}/${this.url}/${id}`);
  }

  delete(id: string) {
    return this.http.delete<T>(`${this.MAIN_URL}/${this.url}/${id}`);
  }
}
