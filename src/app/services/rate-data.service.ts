import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RateDataService {
  baseUrl: string = 'https://api.apilayer.com/exchangerates_data/'
  options: object = {
    headers: {
      'apiKey': 'xBZcm7XgD3r12iszU7wLy3GXPNX3F49Y'
    }
  }

  constructor(private http: HttpClient) {
  }

  getRate(to: string, from?: string): Observable<any> {
    if (!from)
      return this.http.get(`${this.baseUrl}latest?base=${to}`, this.options)
    return this.http.get(`${this.baseUrl}latest?symbols=${from}&base=${to}`, this.options)
  }
}
