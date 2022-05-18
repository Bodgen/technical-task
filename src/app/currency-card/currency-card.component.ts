import {Component, Input} from '@angular/core';
import {RateDataService} from "../services/rate-data.service";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent {
  @Input() from: any;
  @Input() to: any;
  rate: any;
  loading = false

  constructor(private rateService: RateDataService) {

  }

  ngOnInit() {
    this.loading=true
    this.rateService.getRate(this.to,this.from).subscribe((response) => {
      this.rate = response.rates.UAH.toFixed(2)
      this.loading=false
    })
  }
}
