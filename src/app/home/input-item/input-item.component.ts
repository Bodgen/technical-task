import {Component, OnInit} from '@angular/core';
import {RateDataService} from "../../services/rate-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.css']
})
export class InputItemComponent implements OnInit {
  loading = false;
  symbols = ['USD', 'UAH', 'EUR'];
  rate = 1;
  firstControls = 'firstValue'
  secondControls = 'secondValue'
  form = this.fb.group({
    firstValue: [{value: 1, disabled: false}, [Validators.max(9999)]],
    secondValue: [this.rate, [Validators.maxLength(5)]],
    firstCurrency: [this.symbols],
    secondCurrency: [this.symbols],
    selectedOption: this.symbols[0],
    secondSelectedOption: this.symbols[0]
  });

  constructor(private rateService: RateDataService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.rateService.getRate('UAH').subscribe(response => {
      this.symbols = Object.keys(response.rates)
    })
    this.setRate()
    this.form.controls[this.firstControls].valueChanges.subscribe(value => {
      let integerFlag = Number.isInteger(+value * this.rate)
      this.form.controls[this.secondControls].setValue
      (integerFlag ? +value * this.rate
        : (+value * this.rate).toFixed(2), {
        emitEvent: false,
        onlySelf: true
      })
    })
    this.form.controls[this.secondControls].valueChanges.subscribe(value => {
      let integerFlag = Number.isInteger(+value / this.rate)
      this.form.controls[this.firstControls].setValue(integerFlag ? +value / this.rate
        : (+value / this.rate).toFixed(2), {
        emitEvent: false,
        onlySelf: true
      })
    })
    this.form.controls['firstCurrency'].valueChanges.subscribe(val => {
      this.form.controls['selectedOption'].setValue(val)
      this.setRate()
    })
    this.form.controls['secondCurrency'].valueChanges.subscribe(val => {
      this.form.controls['secondSelectedOption'].setValue(val)
      this.setRate()

    })
  }

  setRate() {
    this.loading = true
    this.rateService.getRate(this.form.controls['selectedOption'].value, this.form.controls['secondSelectedOption'].value)
      .subscribe(value => {
          this.rate = value.rates[Object.keys(value.rates)[0]]
          this.form.controls[this.secondControls].setValue(this.form.controls[this.firstControls].value * this.rate)
          this.loading = false
        }
      )
  }
}
