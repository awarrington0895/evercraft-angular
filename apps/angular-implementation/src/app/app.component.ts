import { Component } from '@angular/core';
import * as Character from '@evercraft/ts-functional/character';

@Component({
  selector: 'evercraft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-implementation';
}

const char: Character.Type = Character.Default;

console.log(char);
