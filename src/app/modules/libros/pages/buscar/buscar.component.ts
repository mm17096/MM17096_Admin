import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LibrosService } from '../../service/libros.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {
  cardText = new FormControl('');

  @Output()
  buscar = new EventEmitter<string | null>();

  constructor(private blibrosService: LibrosService) {}

  ngOnInit(): void {
    this.inputReactivo();
  }

  inputReactivo() {
    this.cardText.valueChanges.pipe(debounceTime(1500)).subscribe((res) => {
      console.log('buscando', res);
      this.buscar.emit(res);
    });
    this.buscar.emit();
  }
}
