import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [
    CommonModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() loaderSrc: string = 'assets/loader.svg';
  @Input() size: string = '50px';
}
