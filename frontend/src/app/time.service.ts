import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  uri = 'http://localhost:5000/api/times';

  constructor(private http: HttpClient) {}

  getTimes() {
    return this.http.get(`${this.uri}`);
  }

  getTimeById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  addTime(title, author, description, from, to) {
    const time = {
      title,
      author,
      description,
      from,
      to,
    };

    return this.http.post(`${this.uri}/add`, time);
  }

  updateTime(id, title, author, description, from, to) {
    const time = {
      title,
      author,
      description,
      from,
      to,
    };

    return this.http.post(`${this.uri}/update/${id}`, time);
  }

  deleteTime(id) {
    return this.http.delete(`${this.uri}/${id}`);
  }
}
