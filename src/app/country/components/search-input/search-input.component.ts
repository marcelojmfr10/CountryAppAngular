import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  debounceTime = input(1000);
  initialValue = input<string>();

  value = output<string>();

  // linkedSignal inicializar una señal con algún proceso, y luego ya se trabaja como una señal
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // cada que cambia la señal, dispara el efecto
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
